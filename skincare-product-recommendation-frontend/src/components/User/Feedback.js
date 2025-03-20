import AOS from 'aos';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import '../../App.css';
import Header from '../../components/User/Header';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        rating: 0
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const validate = () => {
        const errors = {};
        if (!feedback.name) errors.name = "Name is required";
        if (!feedback.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(feedback.email)) {
            errors.email = "Email is invalid";
        }
        if (!feedback.subject) errors.subject = "Subject is required";
        if (!feedback.message) errors.message = "Message is required";
        if (!feedback.rating || feedback.rating < 1) errors.rating = "Please provide a rating";
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleRatingChange = (newRating) => {
        setFeedback({ ...feedback, rating: newRating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            axios.post('/Feedback', feedback)
                .then(response => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Feedback submitted successfully!',
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    setFeedback({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                        rating: 0
                    });
                    setErrors({});
                })
                .catch(error => {
                    console.error('Error submitting feedback:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error submitting feedback',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false
                    });
                });
        }
    };

    return (
        <div>
            <Header />
            <div className="feedback-container2">
                <h1 className="feedback-form-head2">Send Us Your Feedback</h1>
                <p className="feedback-form-para2">At Dermaluxe Skincare, we are dedicated
                    to providing you with the most accurate and personalized AI-powered skincare
                    recommendations. Your feedback is invaluable in helping us refine our system,
                    ensuring that you receive the best-matched products for your unique skin type and concerns.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="feedback-row">
                        <div className="feedback-col">
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="name"
                                name="name"
                                value={feedback.name}
                                onChange={handleChange}
                                placeholder="Enter your Name"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    </div>

                    <div className="feedback-row">
                        <div className="feedback-col">
                            <input
                                type="text"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                value={feedback.email}
                                onChange={handleChange}
                                placeholder="Enter your Email"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>


                    <div className="feedback-row">
                        <div className="feedback-col">
                            <select
                                className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                                id="subject"
                                name="subject"
                                value={feedback.subject}
                                onChange={handleChange}
                            >
                                <option value="">Select Subject</option>
                                <option value="Product Recommendation">Product Recommendation</option>
                                <option value="Skin Type Accuracy">Skin Type Accuracy</option>
                                <option value="Product Effectiveness">Product Effectiveness</option>
                                <option value="Ease of Use">Ease of Use</option>
                                <option value="User Experience">User Experience</option>
                                <option value="Website/App Performance">Website/App Performance</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Overall Satisfaction">Overall Satisfaction</option>
                                <option value="Feature Suggestions">Feature Suggestions</option>
                            </select>
                            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                        </div>
                    </div>

                    <div className="feedback-row">
                        <div className="feedback-col">
                            <textarea
                                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                id="message"
                                name="message"
                                value={feedback.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter your message..."
                            ></textarea>
                            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>
                    </div>

                    <div className="feedback-rating-container">
                        <label>Rating</label>
                        <ReactStars
                            count={5}
                            value={feedback.rating}
                            onChange={handleRatingChange}
                            size={40}
                            activeColor="#ffd700"
                        />
                        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
                    </div>

                    <button type="submit" className="feedback-btn-primary-submit">Submit your Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
