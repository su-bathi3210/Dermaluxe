package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.UserDetail;
import com.example.Dermaluxe_Skincare_Backend.Repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailService {

    @Autowired
    private UserDetailRepository userDetailRepository;

    // Add a new user detail
    public UserDetail addUserDetail(UserDetail userDetail) {
        return userDetailRepository.save(userDetail);
    }

    // Get all details for a specific user
    public List<UserDetail> getUserDetailsByUserId(String userId) {
        return userDetailRepository.findByUserId(userId);
    }

    // Get a specific user detail by its ID
    public UserDetail getUserDetailById(String id) {
        Optional<UserDetail> userDetail = userDetailRepository.findById(id);
        return userDetail.orElse(null);
    }

    // Update an existing user detail
    public UserDetail updateUserDetail(String id, UserDetail updatedDetail) {
        Optional<UserDetail> existingDetail = userDetailRepository.findById(id);

        if (existingDetail.isPresent()) {
            UserDetail detail = existingDetail.get();
            detail.setDate(updatedDetail.getDate());
            detail.setMealPlan(updatedDetail.getMealPlan());
            detail.setExercise(updatedDetail.getExercise());
            detail.setBloodGlucoseLevel(updatedDetail.getBloodGlucoseLevel());
            detail.setWeight(updatedDetail.getWeight());
            detail.setWaterIntake(updatedDetail.getWaterIntake());
            return userDetailRepository.save(detail);
        } else {
            throw new RuntimeException("User detail with ID " + id + " not found.");
        }
    }

    // Delete a user detail by its ID
    public String deleteUserDetail(String id) {
        Optional<UserDetail> existingDetail = userDetailRepository.findById(id);
        if (existingDetail.isPresent()) {
            userDetailRepository.deleteById(id);
            return "User detail with ID " + id + " deleted successfully.";
        } else {
            throw new RuntimeException("User detail with ID " + id + " not found.");
        }
    }
}

