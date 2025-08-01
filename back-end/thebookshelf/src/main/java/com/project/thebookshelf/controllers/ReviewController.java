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
import java.util.Optional;

/*
 * ReviewController.java
 * This controller handles requests related to book reviews.
 * It allows users to create, read and update reviews.
 */


@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ReviewRepository reviewRepository;

    // GET all reviews by book ID and user ID
    // Corresponds to http://localhost:8080/reviews/FSDFSDW2132/1 (for example)
    @GetMapping(value="/{bookId}/{userId}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getReviewsById(@PathVariable(value="userId") Long userId,@PathVariable(value="bookId") String bookId) {
        Review userReview = reviewRepository.findByUserIdAndBookId(userId, bookId);
        if (userReview !=null) {
            return new ResponseEntity<>(userReview, HttpStatus.OK); // 200
        } else {
            String response = "There are no reviews for user with ID of " + userId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }



    // CREATE a new review
    // Endpoint http://localhost:8080/review/add
    @PostMapping(value="/add")
    public ResponseEntity<?> createNewReview(@RequestBody Review reviewData) {
        User user = userRepository.findById(reviewData.getUser().getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        Review newReview = new Review(reviewData.getBookName(), reviewData.getContent(),reviewData.getRating(),reviewData.getBookId(), reviewData.getUser());
        reviewRepository.save(newReview);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED); // 201
    }

    // Update an existing review
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        Optional<Review> optionalReview = reviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setContent(updatedReview.getContent());
            review.setRating(updatedReview.getRating());// Only updating the content
            reviewRepository.save(review);
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }

    // DELETE an existing review
    // Corresponds to http://localhost:8080/reviews/delete/6 (for example)
    @DeleteMapping(value="/delete/{reviewId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteReview(@PathVariable(value="reviewId") Long reviewId) {
        Review currentReview = reviewRepository.findById(reviewId).orElse(null);
        if (currentReview != null) {
            reviewRepository.deleteById(reviewId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        } else {
            String response = "Review with ID of " + reviewId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }
}
