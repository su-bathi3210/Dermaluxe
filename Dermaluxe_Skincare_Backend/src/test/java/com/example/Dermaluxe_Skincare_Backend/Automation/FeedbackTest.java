package com.example.Dermaluxe_Skincare_Backend.Automation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeOptions;

public class FeedbackTest {

    public static void main(String[] args) {
        // Set up ChromeDriver (ensure the driver path is set correctly)
        System.setProperty("webdriver.chrome.driver", "path_to_your_chromedriver");

        // Initialize the ChromeDriver
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");  // Optional: To start browser maximized
        WebDriver driver = new ChromeDriver(options);

        try {
            // Navigate to your contact page (or feedback page in your app)
            driver.get("http://localhost:3000/feedback");  // Adjust if the route is different

            // Example interaction with the feedback form:
            WebElement nameField = driver.findElement(By.name("name"));
            WebElement emailField = driver.findElement(By.name("email"));
            WebElement subjectField = driver.findElement(By.name("subject"));
            WebElement messageField = driver.findElement(By.name("message"));
            WebElement ratingField = driver.findElement(By.name("rating"));
            WebElement submitButton = driver.findElement(By.cssSelector(".feedback-btn-primary-submit"));

            // Fill out the feedback form
            nameField.sendKeys("John Doe");
            emailField.sendKeys("john.doe@example.com");
            subjectField.sendKeys("Product Recommendation");
            messageField.sendKeys("Great experience, would recommend the product!");
            ratingField.sendKeys("5");

            // Submit the form
            submitButton.click();

            // Optional: You can add a wait here to ensure the form submission happens before continuing
            Thread.sleep(2000);  // Adding a 2-second wait to see the result of the submission

            // Verify if the success alert appears (if you have a success alert for submission)
            WebElement successAlert = driver.findElement(By.className("swal2-title"));
            if (successAlert != null && successAlert.getText().equals("Success!")) {
                System.out.println("Feedback submitted successfully!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close the browser after the automation
            driver.quit();
        }
    }
}
