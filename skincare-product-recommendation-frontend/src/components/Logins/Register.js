import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from '../../components/User/Header';
import './Register.css';

import LoginImage from "../../images/LoginImage3.png";

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({
        name: '',
        username: '',
        password: '',
        userId: ''
    });

    const navigate = useNavigate();

    // Validate the form before submitting
    const validateForm = () => {
        const errors = {};

        // Name validation
        if (!name) {
            errors.name = "Full Name is required";
        }

        // User ID validation
        if (!userId) {
            errors.userId = "User ID is required";
        }

        // Username (email) validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!username) {
            errors.username = "Email is required";
        } else if (!emailRegex.test(username)) {
            errors.username = "Please enter a valid email address";
        }

        // Password validation
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios
            .post('/User/register', { name, username, password, userId })
            .then((response) => {
                // Handle successful registration
                console.log('Registration successful:', response.data);

                // Navigate to the login page
                navigate('/login');
            })
            .catch((error) => {
                // Handle errors
                setError('Registration failed');
                console.error('Registration error:', error);
            });
    };

    return (
        <div>
            <Header />
            <div className="register-container">
                <div className="register-image">
                    <img src={LoginImage} alt="register Illustration" />
                </div>

                <div className="register-form-section">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <h2>Create Account</h2>
                        <div className="form-group">
                            <label1>Full Name</label1>
                            <input
                                type="text"
                                placeholder="ENTER YOUR NAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {formErrors.name && <p className="error">{formErrors.name}</p>}
                        </div>


                        <div className="form-group">
                            <label1>User Id:</label1>
                            <input
                                type="text"
                                placeholder="Enter your user ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                            {formErrors.userId && <p className="error">{formErrors.userId}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="form-group">
                            <label1>Email:</label1>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {formErrors.username && <p className="error">{formErrors.username}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="form-group">
                            <label1>Password:</label1>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>
                                
                            </div>
                            {formErrors.password && <p className="error">{formErrors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="login-button">
                            Submit for Create New Account
                        </button>

                        {/* Error Message */}
                        {error && <p className="error">{error}</p>}

                        <p className="login-paragraph">
                        Already got an account? <Link to="/login">Log in here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;