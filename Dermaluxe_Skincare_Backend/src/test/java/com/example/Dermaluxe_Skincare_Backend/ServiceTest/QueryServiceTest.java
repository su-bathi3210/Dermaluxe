package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.Query;
import com.example.Dermaluxe_Skincare_Backend.Repository.QueryRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.QueryService;
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
public class QueryServiceTest {

    @InjectMocks
    private QueryService queryService;

    @Mock
    private QueryRepository queryRepository;

    @Test
    public void testSaveQuery() {
        Query query = new Query("John Doe", "john@example.com", "Subject", "Message", "Pending", "No response");
        when(queryRepository.save(query)).thenReturn(query);

        Query savedQuery = queryService.saveQuery(query);

        assertNotNull(savedQuery);
        assertEquals("John Doe", savedQuery.getName());
    }

    @Test
    public void testGetAllQueries() {
        List<Query> queryList = Arrays.asList(
                new Query("John Doe", "john@example.com", "Subject 1", "Message 1", "Pending", "No response"),
                new Query("Jane Doe", "jane@example.com", "Subject 2", "Message 2", "Completed", "Replied")
        );
        when(queryRepository.findAll()).thenReturn(queryList);

        List<Query> result = queryService.getAllQueries();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetQueryById() {
        Query query = new Query("John Doe", "john@example.com", "Subject", "Message", "Pending", "No response");
        when(queryRepository.findById("1")).thenReturn(Optional.of(query));

        Optional<Query> result = queryService.getQueryById("1");

        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
    }

    @Test
    public void testDeleteQuery() {
        doNothing().when(queryRepository).deleteById("1");

        assertDoesNotThrow(() -> queryService.deleteQuery("1"));
        verify(queryRepository, times(1)).deleteById("1");
    }

    @Test
    public void testUpdateQuery() {
        Query existingQuery = new Query("John Doe", "john@example.com", "Subject", "Message", "Pending", "No response");
        Query updatedQueryDetails = new Query("John Updated", "john.updated@example.com", "Updated Subject", "Updated Message", "Completed", "Replied");

        when(queryRepository.findById("1")).thenReturn(Optional.of(existingQuery));
        when(queryRepository.save(any(Query.class))).thenReturn(updatedQueryDetails);

        Query result = queryService.updateQuery("1", updatedQueryDetails);

        assertNotNull(result);
        assertEquals("John Updated", result.getName());
        assertEquals("Completed", result.getStatus());
    }

    @Test
    public void testUpdateQuery_NotFound() {
        Query updatedQueryDetails = new Query("John Updated", "john.updated@example.com", "Updated Subject", "Updated Message", "Completed", "Replied");
        when(queryRepository.findById("1")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            queryService.updateQuery("1", updatedQueryDetails);
        });

        assertEquals("Query not found", exception.getMessage());
    }
}
