package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Query") // Specifies the MongoDB collection
public class Query {

    @Id
    private String id; // Unique identifier for the query
    private String name; // Name of the person making the query
    private String email; // Email address of the person making the query
    private String subject; // Subject of the query
    private String message; // Message content of the query
    private String status; // Status of the query (e.g., pending, resolved)
    private String respond; // Response to the query

    // Default Constructor
    public Query() {}

    // Parameterized Constructor
    public Query(String name, String email, String subject, String message, String status, String respond) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.respond = respond;
    }
}
