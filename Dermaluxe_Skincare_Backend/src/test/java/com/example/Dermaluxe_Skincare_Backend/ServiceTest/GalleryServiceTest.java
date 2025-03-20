package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.Gallery;
import com.example.Dermaluxe_Skincare_Backend.Repository.GalleryRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.GalleryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GalleryServiceTest {

    @Mock
    private GalleryRepository galleryRepository;

    @InjectMocks
    private GalleryService galleryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllGalleries() {
        List<Gallery> galleries = Arrays.asList(
                new Gallery("1", "Gallery1", null, "Product1", "Description1", "Concern1", "Recommendation1"),
                new Gallery("2", "Gallery2", null, "Product2", "Description2", "Concern2", "Recommendation2")
        );
        when(galleryRepository.findAll()).thenReturn(galleries);

        List<Gallery> result = galleryService.getAllGalleries();

        assertEquals(2, result.size());
        assertEquals("Gallery1", result.get(0).getName());
        verify(galleryRepository, times(1)).findAll();
    }

    @Test
    void testGetGalleryById_Success() {
        Gallery gallery = new Gallery("1", "Gallery1", null, "Product1", "Description1", "Concern1", "Recommendation1");
        when(galleryRepository.findById("1")).thenReturn(Optional.of(gallery));

        Optional<Gallery> result = galleryService.getGalleryById("1");

        assertTrue(result.isPresent());
        assertEquals("Gallery1", result.get().getName());
        verify(galleryRepository, times(1)).findById("1");
    }

    @Test
    void testGetGalleryById_NotFound() {
        when(galleryRepository.findById("404")).thenReturn(Optional.empty());

        Optional<Gallery> result = galleryService.getGalleryById("404");

        assertFalse(result.isPresent());
        verify(galleryRepository, times(1)).findById("404");
    }

    @Test
    void testCreateGallery() {
        Gallery gallery = new Gallery("1", "Gallery1", null, "Product1", "Description1", "Concern1", "Recommendation1");
        when(galleryRepository.save(any(Gallery.class))).thenReturn(gallery);

        Gallery result = galleryService.createGallery(gallery);

        assertNotNull(result);
        assertEquals("Gallery1", result.getName());
        verify(galleryRepository, times(1)).save(gallery);
    }

    @Test
    void testUpdateGallery_Success() {
        String id = "1";
        Gallery existingGallery = new Gallery(id, "OldGallery", null, "OldProduct", "OldDesc", "OldConcern", "OldRecommendation");
        Gallery updatedGallery = new Gallery(id, "NewGallery", null, "NewProduct", "NewDesc", "NewConcern", "NewRecommendation");

        when(galleryRepository.existsById(id)).thenReturn(true);
        when(galleryRepository.save(any(Gallery.class))).thenReturn(updatedGallery);

        Gallery result = galleryService.updateGallery(id, updatedGallery);

        assertNotNull(result);
        assertEquals("NewGallery", result.getName());
        verify(galleryRepository, times(1)).save(updatedGallery);
    }

    @Test
    void testUpdateGallery_NotFound() {
        String id = "404";
        Gallery updatedGallery = new Gallery(id, "NewGallery", null, "NewProduct", "NewDesc", "NewConcern", "NewRecommendation");

        when(galleryRepository.existsById(id)).thenReturn(false);

        Gallery result = galleryService.updateGallery(id, updatedGallery);

        assertNull(result);
        verify(galleryRepository, never()).save(any());
    }

    @Test
    void testDeleteGallery_Success() {
        String id = "1";
        when(galleryRepository.existsById(id)).thenReturn(true);
        doNothing().when(galleryRepository).deleteById(id);

        galleryService.deleteGallery(id);

        verify(galleryRepository, times(1)).deleteById(id);
    }

    @Test
    void testDeleteGallery_NotFound() {
        String id = "404";
        when(galleryRepository.existsById(id)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            galleryService.deleteGallery(id);
        });

        assertEquals("Gallery with ID 404 not found.", exception.getMessage());
        verify(galleryRepository, never()).deleteById(anyString());
    }
}
