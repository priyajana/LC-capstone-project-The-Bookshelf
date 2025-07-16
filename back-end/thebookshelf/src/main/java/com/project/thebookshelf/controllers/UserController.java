package com.project.thebookshelf.controllers;

import com.project.thebookshelf.models.User;
import com.project.thebookshelf.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")


public class UserController {

    @Autowired
    private UserRepository userRepository;

    // POST a new artist
    // Endpoint http://localhost:8080/users/add
    @PostMapping(value="/add")
    public ResponseEntity<?> createUser(@RequestBody User userData) {
        System.out.println("Received: " + userData.getUsername());
        User user = new User(userData.getUsername(), userData.getEmail(), userData.getPassword());
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED); // 201
    }


}
