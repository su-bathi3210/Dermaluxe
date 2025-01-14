package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Gallery")
public class Gallery {

    @Id
    private String id;
    private String productName;
    private String description;
    private String skinConcern; // e.g., acne, wrinkles, dryness, etc.
    private String beforeImageUrl; // URL to the before image
    private String afterImageUrl; // URL to the after image
    private String recommendations; // Additional treatment or product recommendations

}
