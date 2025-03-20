package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Gallery;
import com.example.Dermaluxe_Skincare_Backend.Service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    @Autowired
    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    // Get all galleries
    @GetMapping
    public List<Gallery> getAllGalleries() {
        return galleryService.getAllGalleries();
    }

    // Get a gallery by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String id) {
        Optional<Gallery> gallery = galleryService.getGalleryById(id);
        if (gallery.isPresent()) {
            return new ResponseEntity<>(gallery.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new gallery
    @PostMapping
    public ResponseEntity<Gallery> createGallery(@RequestBody Gallery gallery) {
        Gallery createdGallery = galleryService.createGallery(gallery);
        return new ResponseEntity<>(createdGallery, HttpStatus.CREATED);
    }

    // Update an existing gallery
    @PutMapping("/{id}")
    public ResponseEntity<Gallery> updateGallery(@PathVariable String id, @RequestBody Gallery galleryDetails) {
        Gallery updatedGallery = galleryService.updateGallery(id, galleryDetails);
        if (updatedGallery != null) {
            return new ResponseEntity<>(updatedGallery, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a gallery
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        galleryService.deleteGallery(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
