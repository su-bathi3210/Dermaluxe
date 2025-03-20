package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import com.example.Dermaluxe_Skincare_Backend.Service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    // Get all articles
    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    // Get article by ID
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable String id) {
        Optional<Article> article = articleService.getArticleById(id);
        return article.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new article
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article createdArticle = articleService.createArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    // Update an existing article
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable String id, @RequestBody Article articleDetails) {
        Article updatedArticle = articleService.updateArticle(id, articleDetails);
        if (updatedArticle != null) {
            return ResponseEntity.ok(updatedArticle);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete an article
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable String id) {
        if (articleService.getArticleById(id).isPresent()) {
            articleService.deleteArticle(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
