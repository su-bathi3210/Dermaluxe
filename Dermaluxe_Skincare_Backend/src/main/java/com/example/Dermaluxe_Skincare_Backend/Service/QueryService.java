package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Query;
import com.example.Dermaluxe_Skincare_Backend.Repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    // Add a new query
    public Query addQuery(Query query) {
        return queryRepository.save(query);
    }

    // Get all queries
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // Get a specific query by ID
    public Optional<Query> getQueryById(String id) {
        return queryRepository.findById(id);
    }

    // Update a query
    public Query updateQuery(String id, Query updatedQuery) {
        Optional<Query> existingQuery = queryRepository.findById(id);
        if (existingQuery.isPresent()) {
            Query query = existingQuery.get();
            query.setName(updatedQuery.getName());
            query.setEmail(updatedQuery.getEmail());
            query.setSubject(updatedQuery.getSubject());
            query.setMessage(updatedQuery.getMessage());
            query.setStatus(updatedQuery.getStatus());
            query.setRespond(updatedQuery.getRespond());
            return queryRepository.save(query);
        }
        return null; // Handle not found appropriately in your application
    }

    // Delete a query by ID
    public void deleteQuery(String id) {
        queryRepository.deleteById(id);
    }
}
