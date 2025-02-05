import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import ReactStars from 'react-rating-stars-component';

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
        <div className="container mt-5" data-aos="fade-up">
            <h1 className="form-head">Send Us Your Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-sm-10">
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

                <div className="mb-3 row">
                    <div className="col-sm-10">
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


                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <select
                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                            id="subject"
                            name="subject"
                            value={feedback.subject}
                            onChange={handleChange}
                        >
                            <option value="">Select Subject</option>
                            <option value="Food Quality">Food Quality</option>
                            <option value="Service">Service</option>
                            <option value="Ambiance">Ambiance</option>
                            <option value="Value for Money">Value for Money</option>
                            <option value="Menu Variety">Menu Variety</option>
                            <option value="Order Accuracy">Order Accuracy</option>
                            <option value="Speed of Service">Speed of Service</option>
                            <option value="Overall Experience">Overall Experience</option>
                            <option value="Reservations and Wait Time">Reservations and Wait Time</option>
                            <option value="Accessibility">Accessibility</option>
                        </select>
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10">
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

                <div className="rating-container">
                    <label>Rating</label>
                    <ReactStars
                        count={5}
                        value={feedback.rating}
                        onChange={handleRatingChange}
                        size={30}
                        activeColor="#ffd700"
                    />
                    {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
                </div>

                <button type="submit" className="btn-primary-submit">Submit your Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;
