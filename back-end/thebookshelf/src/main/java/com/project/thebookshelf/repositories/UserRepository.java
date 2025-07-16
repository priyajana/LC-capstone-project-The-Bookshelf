package com.project.thebookshelf.repositories;

import com.project.thebookshelf.models.User;
import org.springframework.data.jpa.repository.JpaRepository;


    public interface UserRepository extends JpaRepository<User, Long> {
    }

