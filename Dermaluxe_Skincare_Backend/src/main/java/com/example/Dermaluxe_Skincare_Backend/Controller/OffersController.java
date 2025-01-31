package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Offers;
import com.example.Dermaluxe_Skincare_Backend.Service.OffersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Offers")
public class OffersController {
    @Autowired
    private OffersService offerService;

    @GetMapping
    public List<Offers> getAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/{id}")
    public Optional<Offers> getOfferById(@PathVariable String id) {
        return offerService.getOfferById(id);
    }

    @PostMapping
    public Offers addOffer(@RequestBody Offers offer) {
        return offerService.addOffer(offer);
    }

    @PutMapping("/{id}")
    public Offers updateOffer(@PathVariable String id, @RequestBody Offers offer) {
        return offerService.updateOffer(id, offer);
    }

    @DeleteMapping("/{id}")
    public boolean deleteOffer(@PathVariable String id) {
        return offerService.deleteOffer(id);
    }
}
