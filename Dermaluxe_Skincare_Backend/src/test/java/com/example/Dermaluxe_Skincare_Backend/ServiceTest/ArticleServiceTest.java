package com.example.Dermaluxe_Skincare_Backend.ServiceTest;


import com.example.Dermaluxe_Skincare_Backend.Model.Article;
import com.example.Dermaluxe_Skincare_Backend.Service.ArticleService;
import com.example.Dermaluxe_Skincare_Backend.Repository.ArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

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
    void testGetAllArticles() {
        List<Article> articles = Arrays.asList(
                new Article("1", "Health", "Diabetes Tips", "Useful tips", "http://link.com", "img1"),
                new Article("2", "Nutrition", "Healthy Eating", "Food advice", "http://link2.com", "img2")
        );
        when(articleRepository.findAll()).thenReturn(articles);

        List<Article> result = articleService.getAllArticles();

        assertEquals(2, result.size());
        assertEquals("Health", result.get(0).getCategory());
        verify(articleRepository, times(1)).findAll();
    }

    @Test
    void testAddArticle() throws IOException {
        String category = "Fitness";
        String topic = "Exercise";
        String description = "Stay active";
        String link = "http://exercise.com";
        String base64Image = Base64.getEncoder().encodeToString("fake image".getBytes());

        MultipartFile imageFile = mock(MultipartFile.class);
        when(imageFile.isEmpty()).thenReturn(false);
        when(imageFile.getBytes()).thenReturn("fake image".getBytes());

        Article savedArticle = new Article("123", category, topic, description, link, base64Image);
        when(articleRepository.save(any(Article.class))).thenReturn(savedArticle);

        Article result = articleService.addArticle(category, topic, description, link, imageFile);

        assertNotNull(result);
        assertEquals("Fitness", result.getCategory());
        assertEquals(base64Image, result.getImageUrl());
        verify(articleRepository, times(1)).save(any(Article.class));
    }

    @Test
    void testUpdateArticle_Success() throws IOException {
        String id = "123";
        Article existingArticle = new Article(id, "Health", "Old Topic", "Old Desc", "oldLink", "oldImage");
        when(articleRepository.findById(id)).thenReturn(Optional.of(existingArticle));

        MultipartFile newImageFile = mock(MultipartFile.class);
        when(newImageFile.isEmpty()).thenReturn(false);
        when(newImageFile.getBytes()).thenReturn("new image".getBytes());
        String base64NewImage = Base64.getEncoder().encodeToString("new image".getBytes());

        when(articleRepository.save(any(Article.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Article updated = articleService.updateArticle(id, "NewCat", "NewTopic", "NewDesc", "newLink", newImageFile);

        assertEquals("NewCat", updated.getCategory());
        assertEquals("NewTopic", updated.getTopic());
        assertEquals("NewDesc", updated.getDescription());
        assertEquals("newLink", updated.getLink());
        assertEquals(base64NewImage, updated.getImageUrl());
        verify(articleRepository, times(1)).save(existingArticle);
    }

    @Test
    void testUpdateArticle_NotFound() {
        String id = "404";
        when(articleRepository.findById(id)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            articleService.updateArticle(id, "Cat", "Topic", "Desc", "Link", null);
        });

        assertEquals("Article with ID 404 not found.", exception.getMessage());
        verify(articleRepository, never()).save(any());
    }

    @Test
    void testDeleteArticle_Success() {
        String id = "123";
        when(articleRepository.existsById(id)).thenReturn(true);
        doNothing().when(articleRepository).deleteById(id);

        articleService.deleteArticle(id);

        verify(articleRepository, times(1)).deleteById(id);
    }

    @Test
    void testDeleteArticle_NotFound() {
        String id = "404";
        when(articleRepository.existsById(id)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            articleService.deleteArticle(id);
        });

        assertEquals("Article with ID 404 not found.", exception.getMessage());
        verify(articleRepository, never()).deleteById(anyString());
    }
}
