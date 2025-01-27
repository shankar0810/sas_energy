package com.sas.Security.service;

import com.sas.Security.model.Userinfo;
import com.sas.Security.repository.Userinforepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class Userservices {
    @Autowired
    private Userinforepository repo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;

    public String addUser(Userinfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));

        if (userInfo.getRoles().contains("ROLE_ADMIN")) {
            // Check if there is already an admin
            List<Userinfo> admins = repo.findByRoles("ROLE_ADMIN");
            if (admins.isEmpty()) {
                // First admin, set status to APPROVED
                userInfo.setStatus("APPROVED");
            } else {
                // Subsequent admins, set status to PENDING
                userInfo.setStatus("PENDING");
                // Notify the first admin (you can implement this part)
                notifyFirstAdmin(userInfo);
            }
        } else {
            // Non-admin users are automatically approved
            userInfo.setStatus("APPROVED");
        }

        repo.save(userInfo);
        return "user added to system ";
    }

    public void generateResetToken(String email) {
        Userinfo user = repo.findByEmail(email).orElse(null);
        if (user != null) {
            // Generate a unique reset token
            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(new Date(System.currentTimeMillis() + 3600000)); // Token valid for 1 hour
            repo.save(user);

            // Send the reset token to the user's email (you can implement this part)
            sendResetEmail(user.getEmail(), resetToken);
        }
    }

    public boolean resetPassword(String token, String newPassword) {
        Userinfo user = repo.findByResetToken(token).orElse(null);
        if (user != null && user.getResetTokenExpiry().after(new Date())) {
            // Token is valid, reset the password
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null); // Clear the reset token
            user.setResetTokenExpiry(null); // Clear the expiry
            repo.save(user);
            return true;
        }
        return false; // Token is invalid or expired
    }

    private void sendResetEmail(String email, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        String resetLink = "http://localhost:3333/api/v1/reset-password?token=" + resetToken;
        message.setText("To reset your password, click the link below:\n" + resetLink);
        mailSender.send(message);
    }

    public List<Userinfo> getallusers() {
        return repo.findAll();
    }

    private void notifyFirstAdmin(Userinfo pendingAdmin) {
        // Fetch the first admin
        List<Userinfo> admins = repo.findByRoles("ROLE_ADMIN");
        if (!admins.isEmpty()) {
            Userinfo firstAdmin = admins.get(0);
            // Notify the first admin (e.g., send an email or log a message)
            System.out.println("New admin registration pending approval: " + pendingAdmin.getName() + " (" + pendingAdmin.getEmail() + ")");
            System.out.println("Notify admin: " + firstAdmin.getName() + " (" + firstAdmin.getEmail() + ")");
        }
    }

    public Userinfo getUserById(int userId) {
        return repo.findById(userId).orElse(null);
    }

    public void updateUser(Userinfo user) {
        repo.save(user);
    }

    public Userinfo getUserByUsername(String username) {
        return repo.findByName(username).orElse(null); // Fetch by username
    }
}