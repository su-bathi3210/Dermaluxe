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

    // Get all gallery entries
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    // Get a gallery entry by ID
    public Optional<Gallery> getGalleryById(String id) {
        return galleryRepository.findById(id);
    }

    // Save a new gallery entry
    public Gallery createGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    // Update an existing gallery entry
    public Gallery updateGallery(String id, Gallery gallery) {
        if (galleryRepository.existsById(id)) {
            gallery.setId(id);
            return galleryRepository.save(gallery);
        } else {
            throw new RuntimeException("Gallery with ID " + id + " does not exist.");
        }
    }

    // Delete a gallery entry by ID
    public void deleteGallery(String id) {
        galleryRepository.deleteById(id);
    }
}
