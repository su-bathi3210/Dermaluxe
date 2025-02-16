import React, { useState } from "react";
import Header from "../../components/User/Header";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import "./Dermaluxe.css";

import dry from "../../images/Dry.png";
import oily from "../../images/Oily.png";
import normal from "../../images/Normal.png";
import combination from "../../images/Combination.png";
import sensitive from "../../images/Sensitive.png";

const Dermaluxe = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
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
            label: "Enter your details",
            name: "user_details",
            type: "text",
            fields: [
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" }
            ]
        },

        { label: "Which age group do you belong to?", name: "age", options: ["16-19", "20-25", "26-30", "31 Above"] },
        { label: "What is your gender?", name: "gender", options: ["Female", "Male"] },
        { label: "What is your skin type?", name: "skin_type", options: [{ label: "Dry", image: dry }, { label: "Oily", image: oily }, { label: "Normal", image: normal }, { label: "Combination", image: combination }, { label: "Sensitive", image: sensitive }] },
        { label: "What best describes your skin tone?", name: "skin_tone", options: ["Fair", "Medium", "Deep", "Dark", "Olive"] },
        { label: "What are your primary skin concerns?", name: "skin_concern", options: ["Acne, Enlarged Pores", "Redness, Dehydration", "Hyperpigmentation", "Aging, Fine Lines, Dullness", "Uneven Skin Tone", "Wrinkles, Sagging Skin"] },
        { label: "What environmental conditions are you most exposed to?", name: "environmental_impact", options: ["Spring – Moderate climate", "Summer – Hot and humid", "Autumn – High pollution levels", "Winter – Cold and dry"] },
        { label: "What are your skincare goals?", name: "skin_goals", options: ["Reduce acne and blemishes", "Improve hydration", "Even out skin tone", "Prevent aging signs", "General maintenance"] },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationError(false);
        setIsOptionSelected(true);
    };

    const handleNext = () => {
        if (currentStep === 0) {
            if (!formData.name || !formData.email) {
                setValidationError(true);
                return;
            }
        } else if (!isOptionSelected) {
            setValidationError(true);
            return;
        }

        setIsOptionSelected(false);
        if (currentStep < formSteps.length - 1) {
            setCurrentStep(currentStep + 1);
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
            const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            setPrediction(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred. Please try again.");
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
                <div className="progress-container">
                    {formSteps.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-step ${index <= currentStep ? "active" : ""}`}
                        ></div>
                    ))}
                </div>

                <h2 className="dermaluxe-title">
                    {!prediction ? "Let's start with your facial skincare" : ""}
                </h2>


                {prediction ? (
                    <div className="prediction-result">
                        <h3>This Is Your Personalized Product According to Your Skin:</h3>
                        <div className="prediction-container">
                            {/* Image on the Left */}
                            {prediction.Image_URL && (
                                <div className="prediction-image-container">
                                    <img src={prediction.Image_URL} alt="Product" className="prediction-image" />
                                </div>
                            )}

                            {/* Details on the Right */}
                            <div className="prediction-details">
                                <p className="product-name">{prediction["Product Name"]}</p>
                                <p className="product-brand">{prediction.Brand}</p>
                                <p className="product-price">{prediction.Price}</p>
                                <p className="product-type">{prediction["Product Type"]}</p>
                                <p className="product-ingredients"><strong>Ingredients</strong> <br></br>{prediction.Ingredients}</p>
                                <p className="product-benefit"><strong>Benefit</strong> <br></br>{prediction.Benefit}</p>
                                <p className="product-use"><strong>How to Use</strong> <br></br>{prediction["How To Use"]}</p>

                                <div className="form-navigation">
                                        <button type="button" className="nav-button">Re-Start</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (

                    // Show form if no prediction
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor={formSteps[currentStep].name} className="form-label">
                                {formSteps[currentStep].label}:
                            </label>

                            {formSteps[currentStep].fields ? (
                                <div className="text-input-group">
                                    {formSteps[currentStep].fields.map((field, index) => (
                                        <input
                                            key={index}
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.label}
                                            className="text-input"
                                            required
                                        />
                                    ))}
                                </div>
                            ) : formSteps[currentStep].options ? (
                                <div className="radio-options">
                                    {formSteps[currentStep].options.map((option, index) => (
                                        <label key={index} className="radio-option">
                                            {typeof option === "object" && option.image && <img src={option.image} alt={option.label} className="option-image" />}
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
                            ) : null}
                        </div>

                        {validationError && <div className="validation-error">Please enter valid details before proceeding.</div>}

                        <div className="form-navigation">
                            {currentStep > 0 && (
                                <button type="button" className="nav-button" onClick={handlePrevious}>
                                    Previous
                                </button>
                            )}
                            {currentStep === 0 ? (
                                <button type="button" className="nav-button lets-go" onClick={handleNext}>
                                    Let's Go
                                </button>
                            ) : currentStep < formSteps.length - 1 ? (
                                <button type="button" className="nav-button next" onClick={handleNext}>
                                    Next
                                </button>
                            ) : (
                                <button type="submit" className="predict-button">
                                    Predict
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {error && <div className="error-message">Error: {error}</div>}
            </div>
        </div>
    );
};

export default Dermaluxe;
