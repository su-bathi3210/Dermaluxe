package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Review;
import com.example.Dermaluxe_Skincare_Backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Review")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // GET all reviews
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // GET a single review by ID
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable String id) {
        Optional<Review> review = reviewService.getReviewById(id);
        return review.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - Add a new review (with optional image)
    @PostMapping
    public ResponseEntity<Review> createReview(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("subject") String subject,
            @RequestParam("message") String message,
            @RequestParam("status") String status,
            @RequestParam("respond") String respond,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        // Process image upload if present
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            // Logic to save the image and return its URL
            imageUrl = saveImage(image);
        }

        Review review = new Review(name, email, subject, message, status, respond, imageUrl);
        Review createdReview = reviewService.createReview(review);
        return ResponseEntity.ok(createdReview);
    }

    // PUT - Update an existing review (with optional image)
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("subject") String subject,
            @RequestParam("message") String message,
            @RequestParam("status") String status,
            @RequestParam("respond") String respond,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        // Process image upload if present
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            // Logic to save the image and return its URL
            imageUrl = saveImage(image);
        }

        // Create the updated Review object
        Review updatedReview = new Review(name, email, subject, message, status, respond, imageUrl);
        return reviewService.updateReview(id, updatedReview)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE - Remove a review by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id) {
        return reviewService.deleteReview(id)
                ? ResponseEntity.noContent().<Void>build()
                : ResponseEntity.notFound().build();
    }

    // Helper method to save the image and return its URL
    private String saveImage(MultipartFile image) throws IOException {
        // Implement your image saving logic here, e.g., saving it to a local directory or cloud storage
        String imageUrl = "path_to_saved_image";  // Replace with actual logic to save the image and generate its URL
        // For example, if saving to a local folder:
        // Path path = Paths.get("uploads/" + image.getOriginalFilename());
        // Files.write(path, image.getBytes());
        // imageUrl = "/uploads/" + image.getOriginalFilename();
        return imageUrl;
    }
}
