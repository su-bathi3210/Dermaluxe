package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.Review;
import com.example.Dermaluxe_Skincare_Backend.Repository.ReviewRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.ReviewService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewService reviewService;

    @Test
    public void testGetAllReviews() {
        Review review1 = new Review("John Doe", "john@example.com", "Great product!", "Loved it!", "Approved", "Thank you!", "image1.jpg");
        Review review2 = new Review("Jane Smith", "jane@example.com", "Not satisfied", "Could be better.", "Pending", "", "image2.jpg");

        when(reviewRepository.findAll()).thenReturn(Arrays.asList(review1, review2));

        List<Review> reviews = reviewService.getAllReviews();

        assertEquals(2, reviews.size());
        verify(reviewRepository, times(1)).findAll();
    }

    @Test
    public void testGetReviewById() {
        Review review = new Review("John Doe", "john@example.com", "Great product!", "Loved it!", "Approved", "Thank you!", "image1.jpg");
        review.setId("1");

        when(reviewRepository.findById("1")).thenReturn(Optional.of(review));

        Optional<Review> result = reviewService.getReviewById("1");
        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
    }

    @Test
    public void testCreateReview() {
        Review review = new Review("John Doe", "john@example.com", "Great product!", "Loved it!", "Approved", "Thank you!", "image1.jpg");
        when(reviewRepository.save(review)).thenReturn(review);

        Review result = reviewService.createReview(review);
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
    }

    @Test
    public void testUpdateReview() {
        Review existingReview = new Review("John Doe", "john@example.com", "Great product!", "Loved it!", "Approved", "Thank you!", "image1.jpg");
        existingReview.setId("1");
        Review updatedReview = new Review("John Doe", "john@example.com", "Updated Review", "Changed message.", "Approved", "Thank you!", "image1.jpg");

        when(reviewRepository.findById("1")).thenReturn(Optional.of(existingReview));
        when(reviewRepository.save(existingReview)).thenReturn(existingReview);

        Optional<Review> result = reviewService.updateReview("1", updatedReview);

        assertTrue(result.isPresent());
        assertEquals("Updated Review", result.get().getSubject());
        assertEquals("Changed message.", result.get().getMessage());
    }

    @Test
    public void testDeleteReview() {
        Review review = new Review("John Doe", "john@example.com", "Great product!", "Loved it!", "Approved", "Thank you!", "image1.jpg");
        review.setId("1");

        when(reviewRepository.findById("1")).thenReturn(Optional.of(review));
        doNothing().when(reviewRepository).delete(review);

        boolean result = reviewService.deleteReview("1");
        assertTrue(result);
        verify(reviewRepository, times(1)).delete(review);
    }

    @Test
    public void testDeleteReview_NotFound() {
        when(reviewRepository.findById("2")).thenReturn(Optional.empty());

        boolean result = reviewService.deleteReview("2");
        assertFalse(result);
        verify(reviewRepository, never()).delete(any(Review.class));
    }
}
