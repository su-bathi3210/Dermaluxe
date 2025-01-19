package com.example.Dermaluxe_Skincare_Backend.Repository;

import com.example.Dermaluxe_Skincare_Backend.Model.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends MongoRepository<Query, String> {
    // You can define custom query methods here if needed
}
