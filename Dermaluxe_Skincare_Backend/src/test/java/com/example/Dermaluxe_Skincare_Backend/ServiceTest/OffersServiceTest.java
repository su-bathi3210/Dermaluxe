package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.Offers;
import com.example.Dermaluxe_Skincare_Backend.Repository.OffersRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.OffersService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OffersServiceTest {

    @InjectMocks
    private OffersService offersService;

    @Mock
    private OffersRepository offersRepository;

    @Test
    public void testGetAllOffers() {
        List<Offers> mockOffers = Arrays.asList(
                new Offers("Product1", "Description1", "image1.jpg", 100.0, 80.0),
                new Offers("Product2", "Description2", "image2.jpg", 200.0, 150.0)
        );
        when(offersRepository.findAll()).thenReturn(mockOffers);

        List<Offers> result = offersService.getAllOffers();
        assertEquals(2, result.size());
        assertEquals("Product1", result.get(0).getProductName());
    }

    @Test
    public void testGetOfferById() {
        Offers offer = new Offers("Product1", "Description1", "image1.jpg", 100.0, 80.0);
        when(offersRepository.findById("1")).thenReturn(Optional.of(offer));

        Optional<Offers> result = offersService.getOfferById("1");
        assertTrue(result.isPresent());
        assertEquals("Product1", result.get().getProductName());
    }

    @Test
    public void testAddOffer() {
        Offers offer = new Offers("Product1", "Description1", "image1.jpg", 100.0, 80.0);
        when(offersRepository.save(offer)).thenReturn(offer);

        Offers result = offersService.addOffer(offer);
        assertNotNull(result);
        assertEquals("Product1", result.getProductName());
    }

    @Test
    public void testUpdateOffer() {
        Offers updatedOffer = new Offers("Updated Product", "Updated Description", "updated_image.jpg", 120.0, 90.0);
        updatedOffer.setId("1");
        when(offersRepository.existsById("1")).thenReturn(true);
        when(offersRepository.save(updatedOffer)).thenReturn(updatedOffer);

        Offers result = offersService.updateOffer("1", updatedOffer);
        assertNotNull(result);
        assertEquals("Updated Product", result.getProductName());
    }

    @Test
    public void testUpdateOfferNotFound() {
        Offers updatedOffer = new Offers("Updated Product", "Updated Description", "updated_image.jpg", 120.0, 90.0);
        when(offersRepository.existsById("1")).thenReturn(false);

        Offers result = offersService.updateOffer("1", updatedOffer);
        assertNull(result);
    }

    @Test
    public void testDeleteOffer() {
        when(offersRepository.existsById("1")).thenReturn(true);
        doNothing().when(offersRepository).deleteById("1");

        boolean result = offersService.deleteOffer("1");
        assertTrue(result);
    }

    @Test
    public void testDeleteOfferNotFound() {
        when(offersRepository.existsById("1")).thenReturn(false);

        boolean result = offersService.deleteOffer("1");
        assertFalse(result);
    }
}
