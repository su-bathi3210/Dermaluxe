package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String password;
    private String userId; // Unique user identifier for linking

    // Constructors
    public User() {
    }

    public User(String name, String username, String password, String userId) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.userId = userId;
    }
}