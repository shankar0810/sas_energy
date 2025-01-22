package com.sas.Security.Controller;

import com.sas.Security.dto.AuthRequest;
import com.sas.Security.model.Userinfo;
import com.sas.Security.service.JwtService;
import com.sas.Security.service.Userservices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    private Userservices service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String register(@RequestBody Userinfo user){
        return service.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            // Extract the role from the authenticated user's details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority(); // Get the first role
            String token = jwtService.generateToken(userDetails.getUsername(), role); // Generate token with role

            // Build and return the response with token and role details
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("username", userDetails.getUsername());

            return ResponseEntity.ok(response);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }


    @GetMapping("/getallusers")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Userinfo> getallusers(){
        return service.getallusers();
    }
}
