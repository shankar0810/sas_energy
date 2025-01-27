package com.sas.Security.service;

import com.sas.Security.model.Userinfo;
import com.sas.Security.repository.Userinforepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Userservices {
    @Autowired
    private Userinforepository repo;
    @Autowired
    private PasswordEncoder passwordEncoder;

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