package com.sas.Security.service;

import com.sas.Security.dto.PasswordResetRequest;
import com.sas.Security.exception.*;
import com.sas.Security.model.Userinfo;
import com.sas.Security.repository.Userinforepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class Userservices {
    private static final Logger logger = LoggerFactory.getLogger(Userservices.class);

    @Autowired
    private Userinforepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.password.reset.token.expiry:30}")
    private int passwordResetTokenExpiry; // in minutes

    @Value("${app.max.failed.attempts:5}")
    private int maxFailedAttempts;

    @Value("${app.account.lock.time:1800000}") // 30 minutes in milliseconds
    private long lockTime;

    @Value("${app.email.verification.expiry:1440}") // 24 hours in minutes
    private int emailVerificationExpiry;

    @Value("${app.base.url:http://localhost:3000}")
    private String baseUrl;

    @Transactional
    public String addUser(Userinfo userInfo) throws UserAlreadyExistsException, PasswordValidationException, EmailSendingException {
        // Check if user already exists
        if (repo.findByEmail(userInfo.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + userInfo.getEmail() + " already exists");
        }

        // Validate password complexity
        validatePassword(userInfo.getPassword());

        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        userInfo.setFailedAttempts(0);
        userInfo.setAccountNonLocked(true);
        userInfo.setEnabled(false); // User needs to verify email first
        userInfo.setCreatedAt(new Date());

        if (userInfo.getRoles().contains("ROLE_ADMIN")) {
            List<Userinfo> admins = repo.findByRoles("ROLE_ADMIN");
            if (admins.isEmpty()) {
                userInfo.setStatus("APPROVED");
            } else {
                userInfo.setStatus("PENDING");
                notifyFirstAdmin(userInfo);
            }
        } else {
            userInfo.setStatus("APPROVED");
        }

        repo.save(userInfo);

        // Send verification email
        sendVerificationEmail(userInfo);

        return "User added to system. Please verify your email.";
    }

    @Transactional
    public void generateResetToken(String email) throws UserNotFoundException, EmailSendingException, AccountLockedException, AccountNotVerifiedException, TooManyRequestsException {
        Userinfo user = repo.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        if (!user.isEnabled()) {
            throw new AccountNotVerifiedException("Account is not verified");
        }

        if (!user.isAccountNonLocked()) {
            throw new AccountLockedException("Account is locked");
        }

        // Check if there's a recent reset request
        if (user.getResetTokenExpiry() != null &&
                user.getResetTokenExpiry().after(new Date(System.currentTimeMillis() - TimeUnit.MINUTES.toMillis(5)))) {
            throw new TooManyRequestsException("Password reset already requested. Please check your email or try again later.");
        }

        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(passwordEncoder.encode(resetToken));
        user.setResetTokenExpiry(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(passwordResetTokenExpiry)));
        repo.save(user);

        sendResetEmail(user.getEmail(), resetToken);
    }

    @Transactional
    public void resetPassword(PasswordResetRequest request) throws InvalidTokenException, PasswordValidationException {
        Optional<Userinfo> userOptional = repo.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        Userinfo user = userOptional.get();

        if (user.getResetToken() == null || !passwordEncoder.matches(request.getToken(), user.getResetToken())) {
            throw new InvalidTokenException("Invalid password reset token");
        }

        if (user.getResetTokenExpiry().before(new Date())) {
            throw new InvalidTokenException("Password reset token has expired");
        }

        validatePassword(request.getNewPassword());

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        user.setFailedAttempts(0);
        repo.save(user);
    }

    @Transactional
    public boolean verifyUserEmail(String token, String email) throws InvalidTokenException {
        Userinfo user = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.isEnabled()) {
            return true; // already verified
        }

        if (user.getVerificationToken() == null || !passwordEncoder.matches(token, user.getVerificationToken())) {
            throw new InvalidTokenException("Invalid verification token");
        }

        if (user.getVerificationTokenExpiry().before(new Date())) {
            throw new InvalidTokenException("Verification token has expired");
        }

        user.setEnabled(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        repo.save(user);

        return true;
    }

    public void increaseFailedAttempts(Userinfo user) {
        int newFailAttempts = user.getFailedAttempts() + 1;
        repo.updateFailedAttempts(newFailAttempts, user.getEmail());

        if (newFailAttempts >= maxFailedAttempts && user.isAccountNonLocked()) {
            lockUser(user);
            throw new LockedException("Account has been locked due to " + maxFailedAttempts + " failed attempts");
        }
    }

    public void resetFailedAttempts(String email) {
        repo.updateFailedAttempts(0, email);
    }

    @Transactional
    public void lockUser(Userinfo user) {
        user.setAccountNonLocked(false);
        user.setLockTime(new Date());
        repo.save(user);

        // Notify user about account lock
        sendAccountLockedEmail(user.getEmail());
    }

    public boolean unlockWhenTimeExpired(Userinfo user) {
        if (user.getLockTime() == null) return true;

        long lockTimeInMillis = user.getLockTime().getTime();
        long currentTimeInMillis = System.currentTimeMillis();

        if (lockTimeInMillis + lockTime < currentTimeInMillis) {
            user.setAccountNonLocked(true);
            user.setLockTime(null);
            user.setFailedAttempts(0);
            repo.save(user);
            return true;
        }
        return false;
    }

    @Async
    protected void sendResetEmail(String email, String resetToken) throws EmailSendingException {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password Reset Request");
            message.setText(String.format(
                    "You have requested to reset your password.\n\n" +
                            "Please click the link below to reset your password:\n" +
                            "%s/reset-password?token=%s&email=%s\n\n" +
                            "This link will expire in %d minutes.\n\n" +
                            "If you didn't request this, please ignore this email.",
                    baseUrl, resetToken, email, passwordResetTokenExpiry
            ));
            mailSender.send(message);
        } catch (Exception e) {
            logger.error("Failed to send reset email to {}", email, e);
            throw new EmailSendingException("Failed to send reset email");
        }
    }

    @Async
    protected void sendVerificationEmail(Userinfo user) throws EmailSendingException {
        try {
            String verificationToken = UUID.randomUUID().toString();
            user.setVerificationToken(passwordEncoder.encode(verificationToken));
            user.setVerificationTokenExpiry(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(emailVerificationExpiry)));
            repo.save(user);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Email Verification");
            message.setText(String.format(
                    "Please verify your email by clicking the link below:\n\n" +
                            "%s/verify-email?token=%s&email=%s\n\n" +
                            "This link will expire in %d minutes.",
                    baseUrl, verificationToken, user.getEmail(), emailVerificationExpiry
            ));
            mailSender.send(message);
        } catch (Exception e) {
            logger.error("Failed to send verification email to {}", user.getEmail(), e);
            throw new EmailSendingException("Failed to send verification email");
        }
    }

    @Async
    protected void sendAccountLockedEmail(String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Account Locked");
            message.setText(String.format(
                    "Your account has been locked due to multiple failed login attempts.\n\n" +
                            "It will be automatically unlocked after %d minutes.",
                    TimeUnit.MILLISECONDS.toMinutes(lockTime)
            ));
            mailSender.send(message);
        } catch (Exception e) {
            logger.error("Failed to send account locked email to {}", email, e);
        }
    }

    @Async
    public void sendAdminApprovalResultEmail(String email, boolean approved) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject(approved ? "Admin Registration Approved" : "Admin Registration Declined");
            message.setText(approved ?
                    "Your admin registration has been approved. You can now log in with admin privileges." :
                    "Your admin registration has been declined. Please contact support for more information.");
            mailSender.send(message);
        } catch (Exception e) {
            logger.error("Failed to send admin approval result email to {}", email, e);
        }
    }

    private void validatePassword(String password) throws PasswordValidationException {
        if (password == null || password.length() < 8) {
            throw new PasswordValidationException("Password must be at least 8 characters long");
        }

        if (!password.matches(".*[A-Z].*")) {
            throw new PasswordValidationException("Password must contain at least one uppercase letter");
        }

        if (!password.matches(".*[a-z].*")) {
            throw new PasswordValidationException("Password must contain at least one lowercase letter");
        }

        if (!password.matches(".*\\d.*")) {
            throw new PasswordValidationException("Password must contain at least one digit");
        }

        if (!password.matches(".*[@#$%^&+=].*")) {
            throw new PasswordValidationException("Password must contain at least one special character (@#$%^&+=)");
        }
    }

    // Other existing methods...
    public List<Userinfo> getallusers() {
        return repo.findAll();
    }

    public Userinfo getUserById(int userId) {
        return repo.findById(userId).orElse(null);
    }

    public void updateUser(Userinfo user) {
        repo.save(user);
    }

    public Userinfo getUserByUsername(String email) {
        return repo.findByEmail(email).orElse(null);
    }

    private void notifyFirstAdmin(Userinfo pendingAdmin) {
        List<Userinfo> admins = repo.findByRoles("ROLE_ADMIN");
        if (!admins.isEmpty()) {
            Userinfo firstAdmin = admins.get(0);
            sendAdminApprovalRequestEmail(firstAdmin.getEmail(), pendingAdmin);
        }
    }

    @Async
    private void sendAdminApprovalRequestEmail(String adminEmail, Userinfo pendingAdmin) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(adminEmail);
            message.setSubject("Admin Approval Request");
            message.setText(String.format(
                    "A new admin registration requires your approval:\n\n" +
                            "Name: %s\n" +
                            "Email: %s\n\n" +
                            "Please log in to the admin dashboard to review this request.",
                    pendingAdmin.getName(), pendingAdmin.getEmail()
            ));
            mailSender.send(message);
        } catch (Exception e) {
            logger.error("Failed to send admin approval request email to {}", adminEmail, e);
        }
    }

    @Transactional
    public boolean deleteUser(int userId) {
        try {
            Optional<Userinfo> userOptional = repo.findById(userId);
            if (userOptional.isPresent()) {
                Userinfo user = userOptional.get();

                // Log the deletion for security audit
                logger.info("Deleting user: ID={}, Email={}, Name={}",
                        user.getId(), user.getEmail(), user.getName());

                repo.deleteById(userId);

                // Send notification email to the deleted user (optional)
                sendAccountDeletionNotification(user.getEmail(), user.getName());

                return true;
            }
            return false;
        } catch (Exception e) {
            logger.error("Error deleting user with ID: {}", userId, e);
            return false;
        }
    }

    @Async
    private void sendAccountDeletionNotification(String email, String name) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Account Deletion Notification");
            message.setText(String.format(
                    "Dear %s,\n\n" +
                            "Your account has been deleted by an administrator.\n\n" +
                            "If you believe this was done in error, please contact support.\n\n" +
                            "Best regards,\n" +
                            "Support Team",
                    name
            ));
            mailSender.send(message);

            logger.info("Account deletion notification sent to: {}", email);
        } catch (Exception e) {
            logger.error("Failed to send account deletion notification to {}", email, e);
        }
    }
}