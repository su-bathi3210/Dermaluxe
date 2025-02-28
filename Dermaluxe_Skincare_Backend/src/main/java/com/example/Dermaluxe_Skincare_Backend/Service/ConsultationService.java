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

    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    public Optional<Consultation> getConsultationById(String id) {
        return consultationRepository.findById(id);
    }

    public Consultation createConsultation(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public Consultation updateConsultation(String id, Consultation updatedConsultation) {
        Optional<Consultation> optionalConsultation = consultationRepository.findById(id);
        if (optionalConsultation.isPresent()) {
            Consultation existingConsultation = optionalConsultation.get();
            // Update fields of existing consultation with new values
            existingConsultation.setClientName(updatedConsultation.getClientName());
            existingConsultation.setContactNo(updatedConsultation.getContactNo());
            existingConsultation.setEmail(updatedConsultation.getEmail());
            existingConsultation.setConsultationDate(updatedConsultation.getConsultationDate());
            existingConsultation.setConsultationTime(updatedConsultation.getConsultationTime());
            existingConsultation.setSkinType(updatedConsultation.getSkinType());
            existingConsultation.setConcerns(updatedConsultation.getConcerns());
            existingConsultation.setConsultantName(updatedConsultation.getConsultantName());
            existingConsultation.setConsultationStatus(updatedConsultation.getConsultationStatus());
            existingConsultation.setResponseMessage(updatedConsultation.getResponseMessage());

            // Save the updated consultation
            return consultationRepository.save(existingConsultation);
        } else {
            return null; // Or throw an exception
        }
    }

    public boolean deleteConsultation(String id) {
        if (consultationRepository.existsById(id)) {
            consultationRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
