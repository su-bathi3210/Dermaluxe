package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Consultation;
import com.example.Dermaluxe_Skincare_Backend.Service.ConsultationService;
import com.example.Dermaluxe_Skincare_Backend.Service.EmailService;
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

    @Autowired
    private EmailService emailService; // EmailService for sending emails

    @GetMapping
    public List<Consultation> getAllConsultations() {
        return consultationService.getAllConsultations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable String id) {
        Optional<Consultation> consultation = consultationService.getConsultationById(id);
        return consultation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Consultation createConsultation(@RequestBody Consultation consultation) {
        return consultationService.createConsultation(consultation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable String id, @RequestBody Consultation updatedConsultation) {
        Consultation consultation = consultationService.updateConsultation(id, updatedConsultation);
        if (consultation != null) {
            // After successfully updating, check the status
            String status = consultation.getConsultationStatus();
            if ("Scheduled".equalsIgnoreCase(status)) {
                // Construct the email body for scheduled consultation
                String emailBody = String.format(
                        "Dear %s,\n\n" +
                                "Thank you for scheduling a consultation with Dermaluxe Skincare.\n\n" +
                                "Consultation Date: %s\n\n" +
                                "Time: %s\n\n" +
                                "Consultant: %s\n\n" +
                                "If you need to reschedule or have any questions, please contact us.\n\n" +
                                "Dermaluxe Skincare\n" +
                                "Telephone No: (123) 456-7890",
                        consultation.getClientName(),  // Retrieves the client's name
                        consultation.getConsultationDate(), // Consultation date
                        consultation.getConsultationTime(), // Consultation time
                        consultation.getConsultantName()  // Consultant's name
                );

                // Send the email for scheduled consultation
                emailService.sendEmail(
                        consultation.getEmail(),
                        "Consultation Scheduled",
                        emailBody
                );
            } else if ("Canceled".equalsIgnoreCase(status)) {
                // Construct the email body for canceled consultation
                String emailBody = String.format(
                        "Dear %s,\n\n" +
                                "We regret to inform you that your consultation with Dermaluxe Skincare on %s " +
                                "has been canceled.\n\n" +
                                "If you would like to reschedule or have any questions, please don't hesitate to reach out.\n\n" +
                                "Dermaluxe Skincare\n" +
                                "Telephone No: (123) 456-7890",
                        consultation.getClientName(),  // Retrieves the client's name
                        consultation.getConsultationDate()  // Consultation date
                );

                // Send the email for canceled consultation
                emailService.sendEmail(
                        consultation.getEmail(),
                        "Consultation Canceled",
                        emailBody
                );
            }

            return ResponseEntity.ok(consultation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable String id) {
        boolean isDeleted = consultationService.deleteConsultation(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
