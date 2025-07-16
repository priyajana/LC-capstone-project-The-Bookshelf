package com.project.thebookshelf.controllers;

import com.project.thebookshelf.models.Review;
import com.project.thebookshelf.models.User;
import com.project.thebookshelf.repositories.ReviewRepository;
import com.project.thebookshelf.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ReviewRepository reviewRepository;
    // POST a new review
    // Endpoint http://localhost:8080/review/add
    @PostMapping(value="/add")
    public ResponseEntity<?> createNewReview(@RequestBody Review reviewData) {
        User user = userRepository.findById(reviewData.getUser().getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        Review newReview = new Review(reviewData.getBookName(), reviewData.getContent(),reviewData.getUser());
        reviewRepository.save(newReview);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED); // 201
    }
}
