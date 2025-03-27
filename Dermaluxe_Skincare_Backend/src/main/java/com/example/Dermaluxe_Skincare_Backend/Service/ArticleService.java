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
    public Article getArticleById(String id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
    }

    // Create new article
    public Article addArticle(Article article) {
        return articleRepository.save(article);
    }

    // Update existing article
    public Article updateArticle(String id, Article articleDetails) {
        Article existingArticle = getArticleById(id);

        existingArticle.setCategory(articleDetails.getCategory());
        existingArticle.setTopic(articleDetails.getTopic());
        existingArticle.setDescription(articleDetails.getDescription());
        existingArticle.setLink(articleDetails.getLink());
        existingArticle.setImageUrl(articleDetails.getImageUrl());

        return articleRepository.save(existingArticle);
    }

    // Delete article
    public void deleteArticle(String id) {
        if (!articleRepository.existsById(id)) {
            throw new RuntimeException("Article with ID " + id + " not found.");
        }
        articleRepository.deleteById(id);
    }
}
