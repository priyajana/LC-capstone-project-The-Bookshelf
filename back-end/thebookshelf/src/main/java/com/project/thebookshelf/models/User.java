package com.project.thebookshelf.models;

/**
 *
 * REFERENCES:
 * https://stackoverflow.com/questions/42612148/jackson-failed-to-deserialization-onetomany-objects
 * **/
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private  List<Rental> rentals = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private  List<Review> reviews = new ArrayList<>();

    public User() {
        // Default constructor
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters and setters
    public List<Rental> getRentals() {
        return rentals;
    }
    public List<Review> getReviews() {
        return reviews;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}