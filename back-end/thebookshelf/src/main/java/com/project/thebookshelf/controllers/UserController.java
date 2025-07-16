package com.project.thebookshelf.controllers;

import com.project.thebookshelf.models.User;
import com.project.thebookshelf.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/users")


public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET a single user using their id
    // Corresponds to http://localhost:8080/users/details/3 (for example)
    @GetMapping(value="/details/{userId}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserById(@PathVariable(value="userId") Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK); // 200
        } else {
            String response = "User with ID of " + userId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }


    // POST a new user
    // Endpoint http://localhost:8080/users/add
    @PostMapping(value="/add")
    public ResponseEntity<?> createUser(@RequestBody User userData) {
        System.out.println("Received: " + userData.getUsername());
        User user = new User(userData.getUsername(), userData.getEmail(), userData.getPassword());
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED); // 201
    }


}
