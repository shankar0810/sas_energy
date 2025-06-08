package com.sas.Security.repository;

import com.sas.Security.model.Userinfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface Userinforepository extends JpaRepository<Userinfo, Integer> {
    Optional<Userinfo> findByName(String username);

    @Query("SELECT u FROM Userinfo u WHERE u.roles LIKE %:role%")
    List<Userinfo> findByRoles(@Param("role") String role);

    Optional<Userinfo> findByEmail(String email);
    Optional<Userinfo> findByResetToken(String resetToken);

    @Modifying
    @Transactional
    @Query("UPDATE Userinfo u SET u.failedAttempts = :failedAttempts WHERE u.email = :email")
    void updateFailedAttempts(@Param("failedAttempts") int failedAttempts, @Param("email") String email);
}