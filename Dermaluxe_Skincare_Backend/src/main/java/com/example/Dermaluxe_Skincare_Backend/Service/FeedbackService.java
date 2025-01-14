package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Feedback;
import com.example.Dermaluxe_Skincare_Backend.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> allFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> singleFeedback(String feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }

    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback updateFeedback(String feedbackId, Feedback feedback) {
        Optional<Feedback> existingFeedback = feedbackRepository.findById(feedbackId);
        if (existingFeedback.isPresent()) {
            Feedback updatedFeedback = existingFeedback.get();
            updatedFeedback.setStaffResponse(feedback.getStaffResponse());
            return feedbackRepository.save(updatedFeedback);
        } else {
            return null;
        }
    }

    public void deleteFeedback(String feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}
