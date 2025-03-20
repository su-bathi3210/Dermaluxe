package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Article")
public class Article {

    @Id
    private String id;
    private String category;
    private String topic;
    private String description;
    private String link;
    private String imageUrl;

    // Constructor
    public Article(String id, String category, String topic, String description, String link, String imageUrl) {
        this.id = id;
        this.category = category;
        this.topic = topic;
        this.description = description;
        this.link = link;
        this.imageUrl = imageUrl;
    }

    public Article() {
    }
}
