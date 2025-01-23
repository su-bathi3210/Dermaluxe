import React, { useState } from "react";
import Header from '../../components/User/Header';
import axios from "axios";
import './AI.css';

const Dermaluxe = () => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        skin_type: "",
        skin_tone: "",
        skin_concern: "",
        environmental_impact: "",
        skin_goals: "",
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPrediction(null);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/predict",
                formData
            );
            setPrediction(response.data);
        } catch (err) {
            setError(
                err.response?.data?.error || "An error occurred. Please try again."
            );
        }
    };

    return (
        <div>
            <Header />
            <div className="dermaluxe-container">
                <h2 className="dermaluxe-title">Predict Skincare Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your age"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="form-label">Gender:</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your gender"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skin_type" className="form-label">Skin Type:</label>
                        <input
                            type="text"
                            id="skin_type"
                            name="skin_type"
                            value={formData.skin_type}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your skin type (e.g., oily, dry)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skin_tone" className="form-label">Skin Tone:</label>
                        <input
                            type="text"
                            id="skin_tone"
                            name="skin_tone"
                            value={formData.skin_tone}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your skin tone (e.g., fair, medium)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skin_concern" className="form-label">Skin Concern:</label>
                        <input
                            type="text"
                            id="skin_concern"
                            name="skin_concern"
                            value={formData.skin_concern}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your skin concern (e.g., acne, wrinkles)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="environmental_impact" className="form-label">Environment Impact:</label>
                        <input
                            type="text"
                            id="environmental_impact"
                            name="environmental_impact"
                            value={formData.environmental_impact}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your Environment (e.g., pollution, humidity)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skin_goals" className="form-label">Skin Goal:</label>
                        <input
                            type="text"
                            id="skin_goals"
                            name="skin_goals"
                            value={formData.skin_goals}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your Goal (e.g., hydration, anti-aging)"
                        />
                    </div>
                    <button
                        type="submit"
                        className="predict-button"
                    >
                        Predict
                    </button>
                </form>
                {error && (
                    <div className="error-message">
                        Error: {error}
                    </div>
                )}
                {prediction && (
                    <div className="prediction-result">
                        <h3>Prediction Results:</h3>
                        <p>
                            <strong>Product Name:</strong> {prediction["Product Name"]}
                        </p>
                        <p>
                            <strong>Brand:</strong> {prediction.Brand}
                        </p>
                        <p>
                            <strong>Product Type:</strong> {prediction["Product Type"]}
                        </p>
                        <p>
                            <strong>Ingredients:</strong> {prediction.Ingredients}
                        </p>
                        <p>
                            <strong>Price:</strong> {prediction.Price}
                        </p>
                        {console.log("Image URL:", prediction.Image_URL)}

                        {prediction.Image_URL && (
                            <div>
                                <p>
                                    <strong>Image:</strong>
                                </p>
                                <img
                                    src={prediction.Image_URL}
                                    alt="Product"
                                    className="prediction-image"
                                />
                            </div>
                        )}
                        <p>
                            <strong>Benefit:</strong> {prediction.Benefit}
                        </p>
                        <p>
                            <strong>How to Use:</strong> {prediction["How To Use"]}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dermaluxe;
