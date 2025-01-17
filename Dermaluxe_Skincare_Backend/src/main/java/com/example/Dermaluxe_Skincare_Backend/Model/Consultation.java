package com.example.Dermaluxe_Skincare_Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "Consultation")
public class Consultation {

    @Id
    private String id; // Unique identifier for the consultation
    private String clientName; // Name of the client
    private String contactNo; // Contact number of the client
    private String email; // Email address of the client
    private String consultationDate; // Date of the consultation
    private String consultationTime; // Time of the consultation
    private String skinType; // Client's skin type (e.g., oily, dry, combination)
    private String concerns; // Skin concerns (e.g., acne, aging, sensitivity)
    private String consultantName; // Name of the assigned consultant
    private String consultationStatus; // Status of the consultation (e.g., scheduled, completed, canceled)
    private String responseMessage; // Custom response or feedback message for the client
}
