package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import com.example.Dermaluxe_Skincare_Backend.Repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    // Get all articles
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    // Get article by ID
    public Optional<Article> getArticleById(String id) {
        return articleRepository.findById(id);
    }

    // Create a new article
    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    // Update an existing article
    public Article updateArticle(String id, Article articleDetails) {
        if (articleRepository.existsById(id)) {
            articleDetails.setId(id);
            return articleRepository.save(articleDetails);
        }
        return null; // You can throw an exception if you prefer
    }

    // Delete an article
    public void deleteArticle(String id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
        }
    }
}
