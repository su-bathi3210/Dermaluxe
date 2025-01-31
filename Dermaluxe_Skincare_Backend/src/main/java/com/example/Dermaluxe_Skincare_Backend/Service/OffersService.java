package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Offers;
import com.example.Dermaluxe_Skincare_Backend.Repository.OffersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OffersService {
    @Autowired
    private OffersRepository offerRepository;

    public List<Offers> getAllOffers() {
        return offerRepository.findAll();
    }

    public Optional<Offers> getOfferById(String id) {
        return offerRepository.findById(id);
    }

    public Offers addOffer(Offers offer) {
        return offerRepository.save(offer);
    }

    public Offers updateOffer(String id, Offers updatedOffer) {
        if (offerRepository.existsById(id)) {
            updatedOffer.setId(id);
            return offerRepository.save(updatedOffer);
        }
        return null;
    }

    public boolean deleteOffer(String id) {
        if (offerRepository.existsById(id)) {
            offerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
