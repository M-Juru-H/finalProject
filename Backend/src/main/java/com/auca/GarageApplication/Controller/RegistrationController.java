package com.auca.GarageApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auca.GarageApplication.Model.MyAppUser;
import com.auca.GarageApplication.Model.MyAppUserRepository;

@RestController
public class RegistrationController {
    
    @Autowired
    private MyAppUserRepository myAppUserRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping(value = "/signup", consumes = "application/json")
    public ResponseEntity<?> createUser(@RequestBody MyAppUser user) {
        try {
            // Check if user already exists
            if (myAppUserRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity
                    .badRequest()
                    .body("Username already exists");
            }
            
            // Encode password and save user
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            MyAppUser savedUser = myAppUserRepository.save(user);
            
            // Remove password from response
            savedUser.setPassword(null);
            return ResponseEntity.ok(savedUser);
            
        } catch (Exception e) {
            return ResponseEntity
                .internalServerError()
                .body("Error creating user: " + e.getMessage());
        }
    }
}
