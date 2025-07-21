package com.project.thebookshelf.controllers;

import com.project.thebookshelf.models.User;
import com.project.thebookshelf.repositories.UserRepository;
import com.project.thebookshelf.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;

@RestController
@RequestMapping("/user")


public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    // GET a single user using their email
    // Corresponds to http://localhost:8080/user/details/xxx@ffds.com (for example)
    @GetMapping(value="/details/{email}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserByEmail(@PathVariable(value="email") String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK); // 200
        } else {
            String response = "User with email ID " + email + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }


    // Register a new user
    // Endpoint http://localhost:8080/user/register
    @PostMapping(value="/register")
    public ResponseEntity<?> registerUser(@RequestBody User userData) {
        System.out.println("Received: " + userData.getUsername());
        if (userRepository.findByEmail(userData.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        User user = new User(userData.getUsername(), userData.getEmail(), passwordEncoder.encode(userData.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Login a user
    @PostMapping(value="/login")
    public ResponseEntity<?> loginUser(@RequestBody User userData) {
        try {
           Authentication authentication =
                authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userData.getEmail(), userData.getPassword())
                );
            SecurityContextHolder .getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateToken(authentication.getName());
            return ResponseEntity.ok(Collections.singletonMap("token", jwt));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
