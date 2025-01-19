package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.Query;
import com.example.Dermaluxe_Skincare_Backend.Service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Query")
@CrossOrigin(origins = "*") // Allow cross-origin requests, adjust as needed
public class QueryController {

    @Autowired
    private QueryService queryService;

    // Add a new query
    @PostMapping
    public ResponseEntity<Query> addQuery(@RequestBody Query query) {
        Query newQuery = queryService.addQuery(query);
        return ResponseEntity.ok(newQuery);
    }

    // Get all queries
    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        List<Query> queries = queryService.getAllQueries();
        return ResponseEntity.ok(queries);
    }

    // Get a specific query by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Query>> getQueryById(@PathVariable String id) {
        Optional<Query> query = queryService.getQueryById(id);
        return query.isPresent() ? ResponseEntity.ok(query) : ResponseEntity.notFound().build();
    }

    // Update a query
    @PutMapping("/{id}")
    public ResponseEntity<Query> updateQuery(@PathVariable String id, @RequestBody Query updatedQuery) {
        Query query = queryService.updateQuery(id, updatedQuery);
        return query != null ? ResponseEntity.ok(query) : ResponseEntity.notFound().build();
    }

    // Delete a query
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuery(@PathVariable String id) {
        queryService.deleteQuery(id);
        return ResponseEntity.noContent().build();
    }
}
