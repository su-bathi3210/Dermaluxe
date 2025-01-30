package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Review;
import com.example.Dermaluxe_Skincare_Backend.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Get all reviews
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Get a review by ID
    public Optional<Review> getReviewById(String id) {
        return reviewRepository.findById(id);
    }

    // Add a new review
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    // Update an existing review
    public Optional<Review> updateReview(String id, Review updatedReview) {
        return reviewRepository.findById(id)
                .map(review -> {
                    review.setName(updatedReview.getName());
                    review.setEmail(updatedReview.getEmail());
                    review.setSubject(updatedReview.getSubject());
                    review.setMessage(updatedReview.getMessage());
                    review.setStatus(updatedReview.getStatus());
                    review.setRespond(updatedReview.getRespond());
                    review.setImageUrl(updatedReview.getImageUrl());
                    return reviewRepository.save(review);
                });
    }

    // Delete a review by ID
    public boolean deleteReview(String id) {
        return reviewRepository.findById(id)
                .map(review -> {
                    reviewRepository.delete(review);
                    return true;
                })
                .orElse(false);
    }
}
