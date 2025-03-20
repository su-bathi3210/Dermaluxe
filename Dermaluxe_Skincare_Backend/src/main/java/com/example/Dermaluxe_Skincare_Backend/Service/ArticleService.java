package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import com.example.Dermaluxe_Skincare_Backend.Repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    // Get all articles
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    // Add a new article
    public Article addArticle(String category, String topic, String description, String link, MultipartFile image) throws IOException {
        Article article = new Article(null, category, topic, description, link, convertImageToBase64(image));
        return articleRepository.save(article);
    }

    // Update an article
    public Article updateArticle(String id, String category, String topic, String description, String link, MultipartFile image) throws IOException {
        Optional<Article> existingArticleOpt = articleRepository.findById(id);
        if (existingArticleOpt.isPresent()) {
            Article existingArticle = existingArticleOpt.get();
            existingArticle.setCategory(category);
            existingArticle.setTopic(topic);
            existingArticle.setDescription(description);
            existingArticle.setLink(link);
            if (image != null && !image.isEmpty()) {
                existingArticle.setImageUrl(convertImageToBase64(image));
            }
            return articleRepository.save(existingArticle);
        }
        throw new RuntimeException("Article with ID " + id + " not found.");
    }

    // Delete an article
    public void deleteArticle(String id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
        } else {
            throw new RuntimeException("Article with ID " + id + " not found.");
        }
    }

    // Helper method to convert image to Base64
    private String convertImageToBase64(MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            return Base64.getEncoder().encodeToString(image.getBytes());
        }
        return null;
    }
}
