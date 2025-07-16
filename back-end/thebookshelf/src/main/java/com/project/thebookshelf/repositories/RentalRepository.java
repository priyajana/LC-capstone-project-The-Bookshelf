package com.project.thebookshelf.repositories;

import com.project.thebookshelf.models.Rental;
import com.project.thebookshelf.models.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RentalRepository extends JpaRepository<Rental, Long> {
}

