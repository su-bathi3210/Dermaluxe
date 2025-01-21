// src/ProductPrediction.js
import React, { useState } from "react";
import axios from "axios";

function ProductPrediction() {
    const [age, setAge] = useState("");
    const [skinType, setSkinType] = useState("");
    const [skinTone, setSkinTone] = useState("");
    const [skinConcern, setSkinConcern] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct input data to send to the backend
        const inputData = {
            age,
            skin_type: skinType,
            skin_tone: skinTone,
            skin_concern: skinConcern,
        };

        try {
            // Send the data to the Flask API
            const response = await axios.post("http://127.0.0.1:5000/predict", inputData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Set the prediction response from the backend
            setPrediction(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError("Error occurred while fetching the prediction.");
            setPrediction(null); // Clear any previous predictions
        }
    };

    return (
        <div>
            <h1>Dermaluxe Skincare Product Recommendation</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Skin Type:</label>
                    <input
                        type="text"
                        value={skinType}
                        onChange={(e) => setSkinType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Skin Tone:</label>
                    <input
                        type="text"
                        value={skinTone}
                        onChange={(e) => setSkinTone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Skin Concern:</label>
                    <input
                        type="text"
                        value={skinConcern}
                        onChange={(e) => setSkinConcern(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Get Product Recommendation</button>
            </form>

            {prediction && (
                <div>
                    <h3>Predicted Product Details:</h3>
                    <p><strong>Product Name:</strong> {prediction["Product Name"]}</p>
                    <p><strong>Brand:</strong> {prediction["Brand"]}</p>
                    <p><strong>Product Type:</strong> {prediction["Product Type"]}</p>
                    <p><strong>Ingredients:</strong> {prediction["Ingredients"]}</p>
                    <p><strong>Price:</strong> {prediction["Price"]}</p>
                    <p><strong>Image URL:</strong> <a href={prediction["Image_URL"]} target="_blank" rel="noopener noreferrer">View Image</a></p>
                    <p><strong>Benefit:</strong> {prediction["Benefit"]}</p>
                    <p><strong>How To Use:</strong> {prediction["How To Use"]}</p>
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
}

export default ProductPrediction;
