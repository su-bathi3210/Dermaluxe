import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/User/Header";
import '../../App.css';

import Video7 from "../../images/Video7.mp4";
import call from '../../images/call.png';
import chat from '../../images/chat.png';
import email1 from '../../images/email.png';

const Contact = () => {
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState("");


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};
        if (!name) validationErrors.name = 'Name is required';
        if (!email) validationErrors.email = 'Email is required';
        if (!subject) validationErrors.subject = 'Subject is required';
        if (!message) validationErrors.message = 'Message is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('/api/query', {
                name,
                email,
                subject,
                message,
                status: 'Pending',
                respond: '',
            });

            console.log('Server response:', response.data);

            // Display the success message as a popup
            window.alert('Your query has been submitted successfully!');

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error submitting query:', error);
            setErrors({ submit: 'Failed to submit your query. Please try again later.' });
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
                    <img src={email1} alt="Email us" className="contact--image" />
                    <img src={call} alt="Call us" className="contact--image" />
                </div>

                <div className="contact-section">
                    <div className="query-container">
                    <h2>Send us Your Query</h2>
                        <form onSubmit={handleSubmit} className="query-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Your Name"
                                    />
                                    {errors.name && <p className="error-message">{errors.name}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Enter The Subject"
                                />
                                {errors.subject && <p className="error-message">{errors.subject}</p>}
                            </div>
                            <div className="form-group">
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter Your Message"
                                ></textarea>
                                {errors.message && <p className="error-message">{errors.message}</p>}
                            </div>

                            {errors.submit && <p className="error-message">{errors.submit}</p>}
                            <button type="submit" class="contact-submit-btn" title="Click to submit your query">Submit Query</button>

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