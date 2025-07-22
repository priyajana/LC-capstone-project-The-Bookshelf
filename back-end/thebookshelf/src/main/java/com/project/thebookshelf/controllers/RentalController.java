package com.project.thebookshelf.controllers;


import com.project.thebookshelf.models.Rental;
import com.project.thebookshelf.models.Review;
import com.project.thebookshelf.models.User;
import com.project.thebookshelf.repositories.RentalRepository;
import com.project.thebookshelf.repositories.ReviewRepository;
import com.project.thebookshelf.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/rentals")


public class RentalController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RentalRepository rentalRepository;

    // GET all rentals for specific user
    // Corresponds to http://localhost:8080/rentals/1 (for example)
    @GetMapping(value="/user/{userId}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRentalsById(@PathVariable(value="userId") Long userId) {
        List<Rental> userRentals = rentalRepository.findByUserId(userId);
        if (!userRentals.isEmpty()) {
            return new ResponseEntity<>(userRentals, HttpStatus.OK); // 200
        } else {
            String response = "There are no books rented for user with ID of " + userId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }



    // POST a new review
    // Endpoint http://localhost:8080/rentals/add
    @PostMapping(value="/add")
    public ResponseEntity<?> addRentals(@RequestBody Rental rentalData) {
        User user = userRepository.findById(rentalData.getUser().getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        Rental newRental = new Rental(rentalData.getBookName(),rentalData.getUser());
        rentalRepository.save(newRental);
        return  ResponseEntity.ok(Collections.singletonMap("response", "Rental added successfully"));
    }
}
