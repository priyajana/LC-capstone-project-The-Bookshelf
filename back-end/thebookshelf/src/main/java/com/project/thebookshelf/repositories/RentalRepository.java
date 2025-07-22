package com.project.thebookshelf.repositories;

import com.project.thebookshelf.models.Rental;
import com.project.thebookshelf.models.Review;
import com.project.thebookshelf.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RentalRepository extends JpaRepository<Rental, Long> {

    // Method to find rentals by user ID
    List<Rental> findByUserId(Long userI);

    // Method to find rentals by user ID and book name
    boolean existsByUserIdAndBookName(Long userId, String bookName);
}

