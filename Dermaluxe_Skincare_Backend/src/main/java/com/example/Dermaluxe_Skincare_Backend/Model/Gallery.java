package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


@Setter
@Getter
@Document(collection = "Gallery")
public class Gallery {
    // Getters and Setters
    @Id
    private String id;
    private String name;
    private List<Item> images; // List to hold 2 images
    private String productName;
    private String description;
    private String skinConcern;
    private String recommendation;

    // Constructor
    public Gallery(String id, String name, List<Item> images, String productName, String description, String skinConcern, String recommendation) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.productName = productName;
        this.description = description;
        this.skinConcern = skinConcern;
        this.recommendation = recommendation;
    }

    public static class Item {
        private String id;
        private String imageData;

        // Constructor
        public Item(String id, String imageData) {
            this.id = id;
            this.imageData = imageData;
        }

        // Getters and Setters
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getImageData() {
            return imageData;
        }

        public void setImageData(String imageData) {
            this.imageData = imageData;
        }
    }
}
