package com.project.thebookshelf.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {


//    // POST a new review
//    // Endpoint http://localhost:8080/review/add
//    @PostMapping(value="/add")
//    public ResponseEntity<?> createNewArtwork(@RequestBody ArtworkDTO artworkData) {
//        Artist artist = artistRepository.findById(artworkData.getArtistId()).orElse(null);
//        List<Category> categories = new ArrayList<>();
//        for (int categoryId : artworkData.getCategoryIds()) {
//            Category category = categoryRepository.findById(categoryId).orElse(null);
//            if (category != null) {
//                categories.add(category);
//            }
//        }
//        Artwork newArtwork = new Artwork(artworkData.getTitle(), artist, categories, artworkData.getDetails());
//        artworkRepository.save(newArtwork);
//        return new ResponseEntity<>(newArtwork, HttpStatus.CREATED); // 201
//    }
}
