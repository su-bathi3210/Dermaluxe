package com.example.Dermaluxe_Skincare_Backend.Repository;

import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArticleRepository extends MongoRepository<Article, String> {
    // You can add custom query methods if necessary.
}
