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
        if (consultationRepository.existsById(id)) {
            updatedConsultation.setId(id);
            return consultationRepository.save(updatedConsultation);
        } else {
            throw new RuntimeException("Consultation not found with id: " + id);
        }
    }

    public void deleteConsultation(String id) {
        if (consultationRepository.existsById(id)) {
            consultationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Consultation not found with id: " + id);
        }
    }
}
