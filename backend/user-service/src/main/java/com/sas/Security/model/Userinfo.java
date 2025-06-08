package com.sas.Security.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userinfo")
public class Userinfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String roles;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, DECLINED

    // Security fields
    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "reset_token_expiry")
    @Temporal(TemporalType.TIMESTAMP)
    private Date resetTokenExpiry;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "verification_token_expiry")
    @Temporal(TemporalType.TIMESTAMP)
    private Date verificationTokenExpiry;

    @Column(name = "failed_attempts")
    private int failedAttempts = 0;

    @Column(name = "account_non_locked")
    private boolean accountNonLocked = true;

    @Column(name = "lock_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lockTime;

    @Column(name = "enabled")
    private boolean enabled = false; // Becomes true after email verification

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    // Additional fields for user profile
    @Column(name = "last_login")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLogin;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    // Security question fields (optional)
    @Column(name = "security_question")
    private String securityQuestion;

    @Column(name = "security_answer")
    private String securityAnswer;

    // Constructor without ID for creating new users
    public Userinfo(String name, String email, String password, String roles) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.createdAt = new Date();
    }

    // Helper method to check if account is locked
    public boolean isAccountNonExpired() {
        return true; // Can be customized
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return true; // Can be customized
    }

    public boolean isEnabled() {
        return enabled;
    }

    // Builder pattern methods (optional)
    public Userinfo withName(String name) {
        this.name = name;
        return this;
    }

    public Userinfo withEmail(String email) {
        this.email = email;
        return this;
    }

    public Userinfo withPassword(String password) {
        this.password = password;
        return this;
    }
}