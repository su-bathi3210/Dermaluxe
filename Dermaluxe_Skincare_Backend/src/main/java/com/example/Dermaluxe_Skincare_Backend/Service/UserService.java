package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.User;
import com.example.Dermaluxe_Skincare_Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User loginUser(User user) {
        // Assuming a simple validation for username and password (adjust logic as needed)
        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    }



    // Add a new user
    public User addUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by userId
    public User getUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    // Update a user
    public User updateUser(String id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        existingUser.setName(updatedUser.getName());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setUserId(updatedUser.getUserId());
        return userRepository.save(existingUser);
    }

    // Delete a user by ID
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }


}
