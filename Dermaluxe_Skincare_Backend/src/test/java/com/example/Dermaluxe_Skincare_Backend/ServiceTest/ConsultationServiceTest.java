package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.Dermaluxe_Skincare_Backend.Model.Consultation;
import com.example.Dermaluxe_Skincare_Backend.Repository.ConsultationRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.ConsultationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ConsultationServiceTest {

    @InjectMocks
    private ConsultationService consultationService;

    @Mock
    private ConsultationRepository consultationRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllConsultations() {
        Consultation consultation1 = new Consultation();
        Consultation consultation2 = new Consultation();
        when(consultationRepository.findAll()).thenReturn(Arrays.asList(consultation1, consultation2));

        List<Consultation> result = consultationService.getAllConsultations();
        assertEquals(2, result.size());
    }

    @Test
    public void testGetConsultationById() {
        Consultation consultation = new Consultation();
        consultation.setId("1");
        when(consultationRepository.findById("1")).thenReturn(Optional.of(consultation));

        Optional<Consultation> result = consultationService.getConsultationById("1");
        assertTrue(result.isPresent());
        assertEquals("1", result.get().getId());
    }

    @Test
    public void testCreateConsultation() {
        Consultation consultation = new Consultation();
        when(consultationRepository.save(any(Consultation.class))).thenReturn(consultation);

        Consultation result = consultationService.createConsultation(consultation);
        assertNotNull(result);
    }

    @Test
    public void testUpdateConsultation() {
        Consultation existingConsultation = new Consultation();
        existingConsultation.setId("1");
        Consultation updatedConsultation = new Consultation();
        updatedConsultation.setClientName("Updated Client");
        when(consultationRepository.findById("1")).thenReturn(Optional.of(existingConsultation));
        when(consultationRepository.save(any(Consultation.class))).thenReturn(updatedConsultation);

        Consultation result = consultationService.updateConsultation("1", updatedConsultation);
        assertEquals("Updated Client", result.getClientName());
    }

    @Test
    public void testDeleteConsultation() {
        when(consultationRepository.existsById("1")).thenReturn(true);
        boolean result = consultationService.deleteConsultation("1");
        assertTrue(result);
        verify(consultationRepository, times(1)).deleteById("1");
    }

    @Test
    public void testDeleteConsultation_NotFound() {
        when(consultationRepository.existsById("1")).thenReturn(false);
        boolean result = consultationService.deleteConsultation("1");
        assertFalse(result);
    }
} 