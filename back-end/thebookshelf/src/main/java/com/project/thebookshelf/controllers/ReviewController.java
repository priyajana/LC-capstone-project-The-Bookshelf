package com.project.thebookshelf.controllers;

import com.project.thebookshelf.models.Review;
import com.project.thebookshelf.models.User;
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
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ReviewRepository reviewRepository;

    // GET a reviews for specific user
    // Corresponds to http://localhost:8080/reviews/1 (for example)
    @GetMapping(value="/{userId}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getReviewsById(@PathVariable(value="userId") Long userId) {
        List<Review> userReviews = reviewRepository.findByUserId(userId);
        if (!userReviews.isEmpty()) {
            return new ResponseEntity<>(userReviews, HttpStatus.OK); // 200
        } else {
            String response = "There are no reviews for user with ID of " + userId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }



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
