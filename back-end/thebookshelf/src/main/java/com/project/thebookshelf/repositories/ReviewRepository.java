package com.project.thebookshelf.repositories;

import com.project.thebookshelf.models.Rental;
import com.project.thebookshelf.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
