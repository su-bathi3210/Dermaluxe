package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "Offers")
public class Offers {
    @Id
    private String id;
    private String productName;
    private String description;
    private String image;
    private double currentPrice;
    private double offerPrice;

    // Constructors
    public Offers() {}

    public Offers(String productName, String description, String image, double currentPrice, double offerPrice) {
        this.productName = productName;
        this.description = description;
        this.image = image;
        this.currentPrice = currentPrice;
        this.offerPrice = offerPrice;
    }
}
