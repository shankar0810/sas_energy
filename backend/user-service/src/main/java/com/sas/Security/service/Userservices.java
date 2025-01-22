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
        repo.save(userInfo);
        return "user added to system ";
    }

    public List<Userinfo> getallusers() {
        return repo.findAll();
    }
}
