package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Feedback")
public class Feedback {
    @Id
    private String feedbackId;
    private String name;
    private String customerName;
    private String email;
    private long phoneNumber;
    private String subject;
    private String message;
    private int rating;
    private String staffResponse;
}
