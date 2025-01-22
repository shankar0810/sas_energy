package com.sas.Security.repository;


import com.sas.Security.model.Userinfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Userinforepository extends JpaRepository<Userinfo, Integer> {
    Optional<Userinfo> findByName(String username);
}
