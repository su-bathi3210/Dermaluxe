package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import com.example.Dermaluxe_Skincare_Backend.Repository.ArticleRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.ArticleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @InjectMocks
    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateArticle() {
        Article article = new Article("1", "Skincare", "How to Take Care of Your Skin", "Detailed description", "http://link.com", "http://imageurl.com");
        when(articleRepository.save(any(Article.class))).thenReturn(article);

        Article createdArticle = articleService.createArticle(article);

        assertNotNull(createdArticle);
        assertEquals("1", createdArticle.getId());
        verify(articleRepository, times(1)).save(article);
    }

    @Test
    void testGetArticleById_Success() {
        Article article = new Article("1", "Skincare", "How to Take Care of Your Skin", "Detailed description", "http://link.com", "http://imageurl.com");
        when(articleRepository.findById("1")).thenReturn(Optional.of(article));

        Optional<Article> result = articleService.getArticleById("1");

        assertTrue(result.isPresent());
        assertEquals("Skincare", result.get().getCategory());
        verify(articleRepository, times(1)).findById("1");
    }

    @Test
    void testDeleteArticle_NotFound() {
        when(articleRepository.existsById("404")).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            articleService.deleteArticle("404");
        });

        assertEquals("Article with ID 404 not found.", exception.getMessage());
        verify(articleRepository, never()).deleteById(anyString());
    }
}
