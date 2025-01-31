package com.example.Dermaluxe_Skincare_Backend.Repository;

import com.example.Dermaluxe_Skincare_Backend.Model.Offers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffersRepository extends MongoRepository<Offers, String> {

}
