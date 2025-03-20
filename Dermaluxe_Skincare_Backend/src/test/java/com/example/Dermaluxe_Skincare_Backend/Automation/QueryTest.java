package com.example.Dermaluxe_Skincare_Backend.Automation;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import org.openqa.selenium.By;

public class QueryTest {

    WebDriver driver;

    @BeforeTest
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "path_to_chromedriver"); // Update this path
        driver = new ChromeDriver();
    }

    @Test(priority = 1)
    public void testSubmitQuery() throws InterruptedException {
        driver.get("http://localhost:3000/contact"); // Adjust the URL as needed

        // Fill the form
        driver.findElement(By.id("name")).sendKeys("John Doe");
        driver.findElement(By.id("email")).sendKeys("johndoe@gmail.com");
        driver.findElement(By.id("subject")).sendKeys("Product Inquiry");
        driver.findElement(By.id("message")).sendKeys("I would like to know more about your services.");

        // Submit the form
        driver.findElement(By.tagName("form")).submit();

        // Wait for the response
        Thread.sleep(3000);

        // Validate the success message using window alert or popup
        String alertText = driver.switchTo().alert().getText();
        Assert.assertEquals(alertText, "Your query has been submitted successfully!");
        driver.switchTo().alert().accept();
    }

    @AfterTest
    public void teardown() {
        driver.quit();
    }
}
