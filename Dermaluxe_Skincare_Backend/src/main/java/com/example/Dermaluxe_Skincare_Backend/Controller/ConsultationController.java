package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Consultation;
import com.example.Dermaluxe_Skincare_Backend.Service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Consultation")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    // Get all consultations
    @GetMapping
    public ResponseEntity<List<Consultation>> getAllConsultations() {
        List<Consultation> consultations = consultationService.getAllConsultations();
        return ResponseEntity.ok(consultations);
    }

    // Get a specific consultation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable String id) {
        Optional<Consultation> consultation = consultationService.getConsultationById(id);
        return consultation.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new consultation
    @PostMapping
    public ResponseEntity<Consultation> createConsultation(@RequestBody Consultation consultation) {
        consultation.setResponseMessage("Your consultation has been successfully scheduled.");
        Consultation createdConsultation = consultationService.createConsultation(consultation);
        return ResponseEntity.ok(createdConsultation);
    }

    // Update an existing consultation
    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable String id, @RequestBody Consultation updatedConsultation) {
        try {
            updatedConsultation.setResponseMessage("Your consultation details have been updated successfully.");
            Consultation consultation = consultationService.updateConsultation(id, updatedConsultation);
            return ResponseEntity.ok(consultation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a consultation by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable String id) {
        try {
            consultationService.deleteConsultation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
