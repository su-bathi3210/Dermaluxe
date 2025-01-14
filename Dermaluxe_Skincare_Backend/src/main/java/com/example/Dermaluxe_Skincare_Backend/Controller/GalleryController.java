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
@RequestMapping("/Gallery")
public class GalleryController {

    private final GalleryService galleryService;

    @Autowired
    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    // Get all gallery entries
    @GetMapping
    public List<Gallery> getAllGalleries() {
        return galleryService.getAllGalleries();
    }

    // Get a gallery entry by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String id) {
        Optional<Gallery> gallery = galleryService.getGalleryById(id);
        return gallery.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new gallery entry
    @PostMapping
    public ResponseEntity<Gallery> createGallery(@RequestBody Gallery gallery) {
        Gallery createdGallery = galleryService.createGallery(gallery);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGallery);
    }

    // Update an existing gallery entry
    @PutMapping("/{id}")
    public ResponseEntity<Gallery> updateGallery(@PathVariable String id, @RequestBody Gallery gallery) {
        try {
            Gallery updatedGallery = galleryService.updateGallery(id, gallery);
            return ResponseEntity.ok(updatedGallery);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete a gallery entry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}
