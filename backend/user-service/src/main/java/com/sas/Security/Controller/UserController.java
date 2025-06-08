package com.sas.Security.Controller;

import com.sas.Security.dto.*;
import com.sas.Security.exception.*;
import com.sas.Security.model.Userinfo;
import com.sas.Security.service.JwtService;
import com.sas.Security.service.Userservices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.sas.Security.config.UserInfoUserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private static final String ERROR_MESSAGE = "An error occurred. Please try again later.";

    @Autowired
    private Userservices userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody UserRegistrationDto registrationDto) {
        try {
            Userinfo user = new Userinfo();
            user.setName(registrationDto.getName());
            user.setEmail(registrationDto.getEmail());
            user.setPassword(registrationDto.getPassword());
            user.setRoles(registrationDto.getRole() != null ? registrationDto.getRole() : "ROLE_USER");

            String result = userService.addUser(user);
            return ResponseEntity.ok(new ApiResponse(true, result));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (PasswordValidationException | EmailSendingException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Get UserDetails from authentication
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Get the actual user from database using the username (email)
            Userinfo user = userService.getUserByUsername(userDetails.getUsername());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            if (!user.isEnabled()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ApiResponse(false, "Account not verified. Please check your email."));
            }

            // Check admin approval status
            if (user.getRoles().contains("ROLE_ADMIN")) {
                if ("PENDING".equals(user.getStatus())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new ApiResponse(false, "Admin account is pending approval. Please wait for admin approval."));
                }
                if ("DECLINED".equals(user.getStatus())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new ApiResponse(false, "Admin account has been declined. Please contact support."));
                }
                // Only allow login if status is "APPROVED"
                if (!"APPROVED".equals(user.getStatus())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new ApiResponse(false, "Admin account status is invalid. Please contact support."));
                }
            }

            String accessToken = jwtService.generateToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            userService.resetFailedAttempts(user.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("role", user.getRoles());
            response.put("email", user.getEmail());
            response.put("name", user.getName());

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            try {
                userService.increaseFailedAttempts(userService.getUserByUsername(authRequest.getEmail()));
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Invalid credentials"));
            } catch (LockedException le) {
                return ResponseEntity.status(HttpStatus.LOCKED)
                        .body(new ApiResponse(false, "Account locked due to multiple failed attempts"));
            } catch (Exception ex) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Invalid credentials"));
            }
        } catch (LockedException e) {
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(new ApiResponse(false, "Account is locked"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse> refreshToken(@RequestBody TokenRefreshRequest request) {
        try {
            String requestRefreshToken = request.getRefreshToken();

            if (jwtService.isTokenValid(requestRefreshToken)) {
                String username = jwtService.extractUsername(requestRefreshToken);
                Userinfo user = userService.getUserByUsername(username);

                if (user == null) {
                    throw new UsernameNotFoundException("User not found");
                }

                // Convert Userinfo to UserDetails using the wrapper class
                UserDetails userDetails = new UserInfoUserDetails(user);

                String newAccessToken = jwtService.generateToken(userDetails);
                String newRefreshToken = jwtService.generateRefreshToken(userDetails);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("accessToken", newAccessToken);
                tokens.put("refreshToken", newRefreshToken);

                return ResponseEntity.ok(new ApiResponse(true, "Tokens refreshed", tokens));
            }
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid refresh token"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestParam String email) {
        try {
            userService.generateResetToken(email);
            return ResponseEntity.ok(new ApiResponse(true, "Password reset link sent to your email"));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (AccountNotVerifiedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (AccountLockedException e) {
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (TooManyRequestsException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (EmailSendingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to send reset email"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        if (!request.passwordsMatch()) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Passwords do not match"));
        }
        try {
            userService.resetPassword(request);
            return ResponseEntity.ok(new ApiResponse(true, "Password reset successfully"));
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (PasswordValidationException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmail(@RequestParam String token, @RequestParam String email) {
        try {
            boolean verified = userService.verifyUserEmail(token, email);
            if (verified) {
                return ResponseEntity.ok(new ApiResponse(true, "Email verified successfully"));
            }
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid verification token"));
        } catch (InvalidTokenException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<Userinfo> users = userService.getallusers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable int userId) {
        try {
            // Get the current authenticated user's details
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName();
            Userinfo currentUser = userService.getUserByUsername(currentUserEmail);

            // Find the user to be deleted
            Userinfo userToDelete = userService.getUserById(userId);
            if (userToDelete == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            // Prevent admin from deleting themselves
            if (currentUser.getId() == userId) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(false, "You cannot delete your own account"));
            }

            // Optional: Prevent deletion of other admins (uncomment if needed)
            // if (userToDelete.getRoles().contains("ROLE_ADMIN")) {
            //     return ResponseEntity.status(HttpStatus.FORBIDDEN)
            //             .body(new ApiResponse(false, "Cannot delete admin accounts"));
            // }

            // Delete the user
            boolean deleted = userService.deleteUser(userId);
            if (deleted) {
                return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
            } else {
                return ResponseEntity.internalServerError()
                        .body(new ApiResponse(false, "Failed to delete user"));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }

    @PostMapping("/approve-admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> approveAdmin(
            @RequestParam String email,
            @RequestParam boolean approve
    ) {
        try {
            Userinfo user = userService.getUserByUsername(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            if (user.getRoles().contains("ROLE_ADMIN") && user.getStatus().equals("PENDING")) {
                user.setStatus(approve ? "APPROVED" : "DECLINED");
                userService.updateUser(user);

                // Send notification email
                userService.sendAdminApprovalResultEmail(user.getEmail(), approve);

                return ResponseEntity.ok(new ApiResponse(true,
                        approve ? "Admin approved successfully" : "Admin registration declined"));
            }
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid request or user not found"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, ERROR_MESSAGE));
        }
    }
}