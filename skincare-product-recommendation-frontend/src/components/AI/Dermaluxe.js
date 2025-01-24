import React, { useState } from "react";
import Header from "../../components/User/Header";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import "./AI.css";

import dry from '../../images/Dry.png';
import oily from '../../images/Oily.png';
import normal from '../../images/Normal.png';
import combination from '../../images/Combination.png';
import sensitive from '../../images/Sensitive.png';

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

    const [currentStep, setCurrentStep] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const formSteps = [
        {
            label: "Which age group do you belong to?",
            name: "age",
            options: ["16-19", "20-25", "26-30", "31 Above"],
        },
        {
            label: "What is your gender?",
            name: "gender",
            options: ["Female", "Male"],
        },
        {
            label: "What is your skin type?",
            name: "skin_type",
            options: [
                { label: "Dry", image: dry },
                { label: "Oily", image: oily },
                { label: "Normal", image: normal },
                { label: "Combination", image: combination },
                { label: "Sensitive", image: sensitive },
            ],
        },
        {
            label: "What best describes your skin tone?",
            name: "skin_tone",
            options: [
                { label: "Fair", image: "fair_skin_image_url" },
                { label: "Medium", image: "medium_skin_image_url" },
                { label: "Deep", image: "deep_skin_image_url" },
                { label: "Dark", image: "dark_skin_image_url" },
                { label: "Olive", image: "olive_skin_image_url" },
            ],
        },
        {
            label: "What are your primary skin concerns?",
            name: "skin_concern",
            options: [
                "Acne, Enlarged Pores",
                "Redness, Dehydration",
                "Hyperpigmentation",
                "Aging, Fine Lines, Dullness",
                "Uneven Skin Tone",
                "Wrinkles, Sagging Skin",
            ],
        },
        {
            label: "What environmental conditions are you most exposed to?",
            name: "environmental_impact",
            options: [
                "Spring – Moderate climate",
                "Summer – Hot and humid",
                "Autumn (Fall) – High pollution levels",
                "Winter – Cold and dry",
            ],
        },
        {
            label: "What are your skincare goals?",
            name: "skin_goals",
            options: [
                "Reduce acne and blemishes",
                "Improve hydration",
                "Even out skin tone",
                "Prevent aging signs",
                "General maintenance",
            ],
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationError(false);
        setIsOptionSelected(true);
    };

    const handleNext = () => {
        if (isOptionSelected) {
            setIsOptionSelected(false);
            if (currentStep < formSteps.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            setValidationError(true);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPrediction(null);

        if (Object.values(formData).some((field) => field === "")) {
            setValidationError(true);
            return;
        }

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

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrevious,
        trackMouse: true,
    });

    return (
        <div>
            <Header />
            <div className="dermaluxe-container" {...handlers}>
                <h2 className="dermaluxe-title">Predict Skincare Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor={formSteps[currentStep].name} className="form-label">
                            {formSteps[currentStep].label}:
                        </label>
                        <div className="radio-options">
                            {formSteps[currentStep].options.map((option, index) => (
                                <label key={index} className="radio-option">
                                    {option.image && <img src={option.image} alt={option.label} className="option-image" />}
                                    <input
                                        type="radio"
                                        name={formSteps[currentStep].name}
                                        value={option.label || option}
                                        checked={formData[formSteps[currentStep].name] === (option.label || option)}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="radio-label">{option.label || option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {validationError && (
                        <div className="validation-error">
                            Please select an answer before proceeding.
                        </div>
                    )}

                    <div className="form-navigation">
                        {currentStep > 0 && (
                            <button type="button" className="nav-button" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {currentStep < formSteps.length - 1 ? (
                            <button type="button" className="nav-button" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="predict-button">
                                Predict
                            </button>
                        )}
                    </div>
                </form>
                {error && <div className="error-message">Error: {error}</div>}
                {prediction && (
                    <div className="prediction-result">
                        <h3>This Is Your Personalized Product According to Your Skin:</h3>
                        <p><strong>Product Name:</strong> {prediction["Product Name"]}</p>
                        <p><strong>Brand:</strong> {prediction.Brand}</p>
                        <p><strong>Product Type:</strong> {prediction["Product Type"]}</p>
                        <p><strong>Ingredients:</strong> {prediction.Ingredients}</p>
                        <p><strong>Price:</strong> {prediction.Price}</p>
                        {prediction.Image_URL && (
                            <div>
                                <p><strong>Image:</strong></p>
                                <img src={prediction.Image_URL} alt="Product" className="prediction-image" />
                            </div>
                        )}
                        <p><strong>Benefit:</strong> {prediction.Benefit}</p>
                        <p><strong>How to Use:</strong> {prediction["How To Use"]}</p>
                    </div>
                )}
                <div className="progress-bar">
                    Step {currentStep + 1} of {formSteps.length}
                </div>
            </div>
        </div>
    );
};

export default Dermaluxe;
