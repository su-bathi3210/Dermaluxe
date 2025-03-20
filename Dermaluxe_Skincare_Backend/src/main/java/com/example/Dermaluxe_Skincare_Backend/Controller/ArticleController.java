package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import com.example.Dermaluxe_Skincare_Backend.Service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/Article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    // Get all articles
    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    // Add a new article
    @PostMapping
    public Article addArticle(
            @RequestParam String category,
            @RequestParam String topic,
            @RequestParam String description,
            @RequestParam String link,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        return articleService.addArticle(category, topic, description, link, image);
    }

    // Update an article
    @PutMapping("/{id}")
    public Article updateArticle(
            @PathVariable String id,
            @RequestParam String category,
            @RequestParam String topic,
            @RequestParam String description,
            @RequestParam String link,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        return articleService.updateArticle(id, category, topic, description, link, image);
    }

    // Delete an article
    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable String id) {
        articleService.deleteArticle(id);
    }
}
