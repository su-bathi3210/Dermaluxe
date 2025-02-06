package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Gallery;
import com.example.Dermaluxe_Skincare_Backend.Repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    // Get all galleries
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    // Get a gallery by ID
    public Optional<Gallery> getGalleryById(String id) {
        return galleryRepository.findById(id);
    }

    // Add a new gallery
    public Gallery addGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    // Update an existing gallery
    public Gallery updateGallery(String id, Gallery gallery) {
        if (galleryRepository.existsById(id)) {
            gallery.setId(id);
            return galleryRepository.save(gallery);
        }
        return null;
    }

    // Delete a gallery by ID
    public void deleteGallery(String id) {
        galleryRepository.deleteById(id);
    }
}
