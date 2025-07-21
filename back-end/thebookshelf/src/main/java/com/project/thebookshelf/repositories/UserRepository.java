package com.project.thebookshelf.repositories;

import com.project.thebookshelf.models.Rental;
import com.project.thebookshelf.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
     User findByEmail(String email);
    }

