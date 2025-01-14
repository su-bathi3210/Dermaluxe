package com.example.Dermaluxe_Skincare_Backend.Repository;

import com.example.Dermaluxe_Skincare_Backend.Model.Consultation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultationRepository extends MongoRepository<Consultation, String> {
    // You can define custom query methods here if needed
}
