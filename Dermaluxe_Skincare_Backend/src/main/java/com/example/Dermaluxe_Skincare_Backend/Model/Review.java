package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Review")
public class Review {

    @Id
    private String id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private String status;
    private String respond;
    private String imageUrl;

    // Default Constructor
    public Review() {}

    // Parameterized Constructor
    public Review(String name, String email, String subject, String message, String status, String respond, String imageUrl) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.respond = respond;
        this.imageUrl = imageUrl;
    }
}
