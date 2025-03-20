package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.Feedback;
import com.example.Dermaluxe_Skincare_Backend.Repository.FeedbackRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.FeedbackService;
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

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackService feedbackService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAllFeedbacks() {
        List<Feedback> feedbacks = Arrays.asList(
                new Feedback("F1", "John", "Customer1", "john@example.com", "Subject1", "Message1", 5, "Response1"),
                new Feedback("F2", "Alice", "Customer2", "alice@example.com", "Subject2", "Message2", 4, "Response2")
        );

        when(feedbackRepository.findAll()).thenReturn(feedbacks);

        List<Feedback> result = feedbackService.allFeedbacks();

        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getName());
        verify(feedbackRepository, times(1)).findAll();
    }

    @Test
    void testSingleFeedback_Found() {
        Feedback feedback = new Feedback("F1", "John", "Customer1", "john@example.com", "Subject1", "Message1", 5, "Response1");

        when(feedbackRepository.findById("F1")).thenReturn(Optional.of(feedback));

        Optional<Feedback> result = feedbackService.singleFeedback("F1");

        assertTrue(result.isPresent());
        assertEquals("John", result.get().getName());
        verify(feedbackRepository, times(1)).findById("F1");
    }

    @Test
    void testSingleFeedback_NotFound() {
        when(feedbackRepository.findById("F2")).thenReturn(Optional.empty());

        Optional<Feedback> result = feedbackService.singleFeedback("F2");

        assertFalse(result.isPresent());
        verify(feedbackRepository, times(1)).findById("F2");
    }

    @Test
    void testAddFeedback() {
        Feedback feedback = new Feedback("F3", "Mike", "Customer3", "mike@example.com", "Subject3", "Message3", 5, "Response3");

        when(feedbackRepository.save(feedback)).thenReturn(feedback);

        Feedback result = feedbackService.addFeedback(feedback);

        assertNotNull(result);
        assertEquals("Mike", result.getName());
        verify(feedbackRepository, times(1)).save(feedback);
    }

    @Test
    void testUpdateFeedback_Success() {
        Feedback existingFeedback = new Feedback("F4", "Sarah", "Customer4", "sarah@example.com", "Subject4", "Message4", 4, "Old Response");
        Feedback updatedFeedback = new Feedback("F4", "Sarah", "Customer4", "sarah@example.com", "Subject4", "Message4", 4, "New Response");

        when(feedbackRepository.findById("F4")).thenReturn(Optional.of(existingFeedback));
        when(feedbackRepository.save(any(Feedback.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Feedback result = feedbackService.updateFeedback("F4", updatedFeedback);

        assertNotNull(result);
        assertEquals("New Response", result.getResponse());
        verify(feedbackRepository, times(1)).save(existingFeedback);
    }

    @Test
    void testUpdateFeedback_NotFound() {
        Feedback updatedFeedback = new Feedback("F5", "Tom", "Customer5", "tom@example.com", "Subject5", "Message5", 5, "New Response");

        when(feedbackRepository.findById("F5")).thenReturn(Optional.empty());

        Feedback result = feedbackService.updateFeedback("F5", updatedFeedback);

        assertNull(result);
        verify(feedbackRepository, never()).save(any());
    }

    @Test
    void testDeleteFeedback() {
        doNothing().when(feedbackRepository).deleteById("F6");

        feedbackService.deleteFeedback("F6");

        verify(feedbackRepository, times(1)).deleteById("F6");
    }
}
