package com.project.thebookshelf.repositories;

import java.util.List;
import com.project.thebookshelf.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Method to find reviews by user ID
    Review findByUserIdAndBookId(Long userId, String bookId);
}

