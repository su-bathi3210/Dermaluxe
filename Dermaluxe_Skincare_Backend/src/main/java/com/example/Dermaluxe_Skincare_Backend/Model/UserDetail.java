package com.example.Dermaluxe_Skincare_Backend.Model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "User_Details")

public class UserDetail {
    @Id
    private String id;
    private String userId;
    private LocalDate date;
    private String mealPlan;
    private String exercise;
    private double bloodGlucoseLevel;
    private double weight;
    private double waterIntake;

    // Constructors
    public UserDetail() {
    }

    public UserDetail(String userId, LocalDate date, String mealPlan, String exercise, double bloodGlucoseLevel, double weight, double waterIntake) {
        this.userId = userId;
        this.date = date;
        this.mealPlan = mealPlan;
        this.exercise = exercise;
        this.bloodGlucoseLevel = bloodGlucoseLevel;
        this.weight = weight;
        this.waterIntake = waterIntake;

    }
}