package com.example.Dermaluxe_Skincare_Backend.Controller;

import com.example.Dermaluxe_Skincare_Backend.Model.UserDetail;
import com.example.Dermaluxe_Skincare_Backend.Service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Dermaluxe_Skincare_Backend.Service.UserService;

import java.util.List;

@RestController
@RequestMapping("User_Details")
public class UserDetailController {

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private UserService userService;

    // Endpoint to add a new user detail
    @PostMapping("/{userId}")
    public UserDetail addUserDetail(@RequestBody UserDetail userDetail) {
        return userDetailService.addUserDetail(userDetail);
    }

    // Endpoint to get all details for a specific user
    @GetMapping("/{userId}")
    public List<UserDetail> getUserDetailsByUserId(@PathVariable String userId) {
        return userDetailService.getUserDetailsByUserId(userId);
    }

    // Endpoint to get a specific user detail by its ID
    @GetMapping("/detail/{id}")
    public UserDetail getUserDetailById(@PathVariable String id) {
        return userDetailService.getUserDetailById(id);
    }

    // Endpoint to update an existing user detail
    @PutMapping("/{id}")
    public UserDetail updateUserDetail(@PathVariable String id, @RequestBody UserDetail userDetail) {
        return userDetailService.updateUserDetail(id, userDetail);
    }

    // Endpoint to delete a user detail by its ID
    @DeleteMapping("/{id}")
    public String deleteUserDetail(@PathVariable String id) {
        return userDetailService.deleteUserDetail(id);
    }
}
