import React, { useState } from "react";
import axios from "axios";

const Tourism = () => {
    const [formData, setFormData] = useState({
        Interests: "",
        Budget_Range: "",
        Travel_Type: "",
        Duration: "",
        Country_Category: "",
        Transport_Preferences: "",
        Accommodation_Preference: "",
    });
    const [recommendation, setRecommendation] = useState({
        Preferred_Locations: "",
        Activities: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Send data to backend for prediction
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "application/json" },
            });

            // Check if the response contains preferred locations and activities
            if (response.data && response.data.Preferred_Locations && response.data.Activities) {
                setRecommendation({
                    Preferred_Locations: response.data.Preferred_Locations,
                    Activities: response.data.Activities,
                });
            } else {
                setRecommendation({
                    Preferred_Locations: "No recommendation available",
                    Activities: "No activities available",
                });
            }
        } catch (error) {
            console.error("Error fetching recommendation", error);
            setError("Failed to fetch recommendation. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg shadow-lg rounded-lg bg-white">
            <h1 className="text-2xl font-bold mb-4">Travel Recommendation System</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="Interests"
                    placeholder="Interests"
                    value={formData.Interests}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Budget_Range"
                    placeholder="Budget Range"
                    value={formData.Budget_Range}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Travel_Type"
                    placeholder="Travel Type"
                    value={formData.Travel_Type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Duration"
                    placeholder="Duration"
                    value={formData.Duration}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Country_Category"
                    placeholder="Country Category"
                    value={formData.Country_Category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Transport_Preferences"
                    placeholder="Transport Preferences"
                    value={formData.Transport_Preferences}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Accommodation_Preference"
                    placeholder="Accommodation Preference"
                    value={formData.Accommodation_Preference}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Get Recommendation
                </button>
            </form>

            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {recommendation.Preferred_Locations && (
                <div className="mt-4 text-lg font-semibold">
                    <p>Preferred Location: {recommendation.Preferred_Locations}</p>
                    <p>Activities: {recommendation.Activities}</p>
                </div>
            )}
        </div>
    );
};

export default Tourism;
