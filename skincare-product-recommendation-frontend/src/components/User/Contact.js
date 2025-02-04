import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/User/Header";
import "./Contact.css";

import Video7 from "../../images/Video7.mp4";
import call from '../../images/call.png';
import chat from '../../images/chat.png';
import email from '../../images/email.png';

const Contact = () => {
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState("");


    const [query, setQuery] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuery({
            ...query,
            [name]: value
        });


        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};

        if (query.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

        if (!query.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors.email = "Enter a valid email address";
        }

        if (query.subject.trim() === "") {
            newErrors.subject = "Subject cannot be empty";
        }

        if (query.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/Query', query, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert("Your query has been submitted successfully!");
                setQuery({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
                setErrors({});
            } else {
                alert("Failed to submit query. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        }
    };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setError("");
                },
                (err) => {
                    setError("Unable to retrieve your location. Please enable location services.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    return (
        <div className="contact-container">
            <Header />
            <div className="free-video">
                <video autoPlay loop muted>
                    <source src={Video7} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="contact-content">
                <div className="contact-images">
                    <img src={chat} alt="Chat with us" className="contact--image" />
                    <img src={email} alt="Email us" className="contact--image" />
                    <img src={call} alt="Call us" className="contact--image" />
                </div>

                <div className="contact-section">
                    <div className="query-form">
                        <h2>Send Us Your Query</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={query.name}
                                    onChange={handleChange}
                                    placeholder="Enter Your Name"
                                    required
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={query.email}
                                    onChange={handleChange}
                                    placeholder="Enter Your Email"
                                    required
                                />
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={query.subject}
                                    onChange={handleChange}
                                    placeholder="Your Subject"
                                    required
                                />
                                {errors.subject && <p className="error-message">{errors.subject}</p>}
                            </div>
                            <div className="form-group">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={query.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    required
                                />
                                {errors.message && <p className="error-message">{errors.message}</p>}
                            </div>
                            <button type="submit" className="submit-btn">
                                Submit Query
                            </button>
                        </form>
                    </div>


                    <div className="live-location-section">
                        {userLocation.lat && userLocation.lng ? (
                            <div className="map-container">
                                <iframe
                                    title="Live Location"
                                    className="map-iframe"
                                    src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            error && <p className="location-error">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;