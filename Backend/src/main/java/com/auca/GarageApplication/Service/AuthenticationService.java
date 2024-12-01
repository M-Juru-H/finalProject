package com.auca.GarageApplication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.auca.GarageApplication.Model.MyAppUserService;

@Service
public class AuthenticationService {
    
    private final MyAppUserService myAppUserService;
    private final AuthenticationManager authenticationManager;
    
    @Autowired
    public AuthenticationService(MyAppUserService myAppUserService, AuthenticationManager authenticationManager) {
        this.myAppUserService = myAppUserService;
        this.authenticationManager = authenticationManager;
    }
    
    public boolean authenticate(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}