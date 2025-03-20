package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Gallery;
import com.example.Dermaluxe_Skincare_Backend.Repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;

    @Autowired
    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    // Get all galleries
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    // Get a gallery by ID
    public Optional<Gallery> getGalleryById(String id) {
        return galleryRepository.findById(id);
    }

    // Create a new gallery
    public Gallery createGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    // Update an existing gallery
    public Gallery updateGallery(String id, Gallery galleryDetails) {
        if (galleryRepository.existsById(id)) {
            galleryDetails.setId(id);
            return galleryRepository.save(galleryDetails);
        }
        return null; // Or throw an exception if gallery not found
    }

    // Delete a gallery
    public void deleteGallery(String id) {
        if (!galleryRepository.existsById(id)) {
            throw new RuntimeException("Gallery with ID " + id + " not found.");
        }
        galleryRepository.deleteById(id);
    }
}
