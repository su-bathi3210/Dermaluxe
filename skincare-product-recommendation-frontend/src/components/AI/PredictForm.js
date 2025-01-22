import React, { useState } from "react";
import axios from "axios";

const PredictForm = () => {
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
        <div style={{ padding: "20px", maxWidth: "500px", margin: "100px auto" }}>
            <h2>Predict Skincare Product</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your age"
                    />
                </div>




                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="gender">Gender:</label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your gender"
                    />
                </div>


                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="skin_type">Skin Type:</label>
                    <input
                        type="text"
                        id="skin_type"
                        name="skin_type"
                        value={formData.skin_type}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your skin type (e.g., oily, dry)"
                    />
                </div>


                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="skin_tone">Skin Tone:</label>
                    <input
                        type="text"
                        id="skin_tone"
                        name="skin_tone"
                        value={formData.skin_tone}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your skin tone (e.g., fair, medium)"
                    />
                </div>


                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="skin_concern">Skin Concern:</label>
                    <input
                        type="text"
                        id="skin_concern"
                        name="skin_concern"
                        value={formData.skin_concern}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your skin concern (e.g., acne, wrinkles)"
                    />
                </div>


                
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="environmental_impact">Environmental Impact</label>
                    <input
                        type="text"
                        id="environmental_impact"
                        name="environmental_impact"
                        value={formData.environmental_impact}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your skin concern (e.g., acne, wrinkles)"
                    />
                </div>




                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="skin_goals">Skin Goals</label>
                    <input
                        type="text"
                        id="skin_goals"
                        name="skin_goals"
                        value={formData.skin_goals}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="Enter your skin concern (e.g., acne, wrinkles)"
                    />
                </div>


                <button
                    type="submit"
                    style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        width: "100%",
                        cursor: "pointer",
                    }}
                >
                    Predict
                </button>
            </form>
            {error && (
                <div style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}>
                    Error: {error}
                </div>
            )}
            {prediction && (
                <div style={{ marginTop: "20px" }}>
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
                    {/* Add the console log here to see the Image URL */}
                    {console.log("Image URL:", prediction.Image_URL)}

                    {prediction.Image_URL && (
                        <div>
                            <p>
                                <strong>Image:</strong>
                            </p>
                            <img
                                src={prediction.Image_URL}
                                alt="Product"
                                style={{
                                    width: "100%",
                                    maxWidth: "300px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
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
    );
};

export default PredictForm;
