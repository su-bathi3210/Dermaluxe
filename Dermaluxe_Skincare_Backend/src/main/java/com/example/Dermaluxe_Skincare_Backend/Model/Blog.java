package com.example.Dermaluxe_Skincare_Backend.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "Blogs")
public class Blog {

    @Id
    private String id;
    private String title;
    private String category;
    private String description;
    private String date;
    private String content;
    private String image;  // New field for image URL
    private String author; // New field for author's name
}


