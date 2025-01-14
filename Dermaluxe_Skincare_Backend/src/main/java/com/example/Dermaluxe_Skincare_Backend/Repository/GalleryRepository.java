package com.example.Dermaluxe_Skincare_Backend.Repository;

import com.example.Dermaluxe_Skincare_Backend.Model.Gallery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends MongoRepository<Gallery, String> {
    // You can add custom queries if needed, for example:
    // List<Gallery> findBySkinConcern(String skinConcern);
}
