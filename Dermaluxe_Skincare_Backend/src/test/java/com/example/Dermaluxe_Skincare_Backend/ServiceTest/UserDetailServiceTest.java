package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.Dermaluxe_Skincare_Backend.Model.UserDetail;
import com.example.Dermaluxe_Skincare_Backend.Repository.UserDetailRepository;
import com.example.Dermaluxe_Skincare_Backend.Service.UserDetailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class UserDetailServiceTest {

    @InjectMocks
    private UserDetailService userDetailService;

    @Mock
    private UserDetailRepository userDetailRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddUserDetail() {
        UserDetail userDetail = new UserDetail("user1", LocalDate.now(), "Keto", "Yoga", 110.5, 70.0, 2.5);
        when(userDetailRepository.save(userDetail)).thenReturn(userDetail);

        UserDetail result = userDetailService.addUserDetail(userDetail);

        assertNotNull(result);
        assertEquals("user1", result.getUserId());
    }

    @Test
    public void testGetUserDetailsByUserId() {
        List<UserDetail> details = Arrays.asList(
                new UserDetail("user1", LocalDate.now(), "Keto", "Yoga", 110.5, 70.0, 2.5),
                new UserDetail("user1", LocalDate.now(), "Vegan", "Running", 95.0, 68.0, 3.0)
        );
        when(userDetailRepository.findByUserId("user1")).thenReturn(details);

        List<UserDetail> result = userDetailService.getUserDetailsByUserId("user1");

        assertEquals(2, result.size());
    }

    @Test
    public void testGetUserDetailById() {
        UserDetail userDetail = new UserDetail("user1", LocalDate.now(), "Keto", "Yoga", 110.5, 70.0, 2.5);
        when(userDetailRepository.findById("1"))
                .thenReturn(Optional.of(userDetail));

        UserDetail result = userDetailService.getUserDetailById("1");

        assertNotNull(result);
        assertEquals("Keto", result.getMealPlan());
    }

    @Test
    public void testUpdateUserDetail() {
        UserDetail existingDetail = new UserDetail("user1", LocalDate.now(), "Keto", "Yoga", 110.5, 70.0, 2.5);
        UserDetail updatedDetail = new UserDetail("user1", LocalDate.now(), "Vegan", "Running", 95.0, 68.0, 3.0);
        when(userDetailRepository.findById("1")).thenReturn(Optional.of(existingDetail));
        when(userDetailRepository.save(any(UserDetail.class))).thenReturn(updatedDetail);

        UserDetail result = userDetailService.updateUserDetail("1", updatedDetail);

        assertNotNull(result);
        assertEquals("Vegan", result.getMealPlan());
        assertEquals("Running", result.getExercise());
    }

    @Test
    public void testDeleteUserDetail() {
        UserDetail userDetail = new UserDetail("user1", LocalDate.now(), "Keto", "Yoga", 110.5, 70.0, 2.5);
        when(userDetailRepository.findById("1")).thenReturn(Optional.of(userDetail));

        String result = userDetailService.deleteUserDetail("1");

        assertEquals("User detail with ID 1 deleted successfully.", result);
        verify(userDetailRepository, times(1)).deleteById("1");
    }

    @Test
    public void testDeleteUserDetailNotFound() {
        when(userDetailRepository.findById("2")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userDetailService.deleteUserDetail("2"));

        assertEquals("User detail with ID 2 not found.", exception.getMessage());
    }
} 