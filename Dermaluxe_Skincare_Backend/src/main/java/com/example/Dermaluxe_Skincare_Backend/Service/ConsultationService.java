package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Consultation;
import com.example.Dermaluxe_Skincare_Backend.Repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;

    // Retrieve all consultations
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    // Retrieve a consultation by ID
    public Optional<Consultation> getConsultationById(String id) {
        return consultationRepository.findById(id);
    }

    // Create a new consultation
    public Consultation createConsultation(Consultation consultation) {
        consultation.setResponseMessage("Your consultation has been successfully scheduled.");
        return consultationRepository.save(consultation);
    }

    // Update an existing consultation
    public Consultation updateConsultation(String id, Consultation updatedConsultation) {
        if (consultationRepository.existsById(id)) {
            updatedConsultation.setId(id);
            updatedConsultation.setResponseMessage("Your consultation details have been updated successfully.");
            return consultationRepository.save(updatedConsultation);
        } else {
            throw new RuntimeException("Consultation not found with ID: " + id);
        }
    }

    // Delete a consultation by ID
    public void deleteConsultation(String id) {
        if (consultationRepository.existsById(id)) {
            consultationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Consultation not found with ID: " + id);
        }
    }
}
