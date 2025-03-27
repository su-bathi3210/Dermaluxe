import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from '../../components/User/Header';
import './Login.css';

import LoginImage from "../../images/LoginImage3.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin";

        if (username === adminEmail && password === adminPassword) {
            sessionStorage.setItem("userSession", JSON.stringify({ username, role: "admin" }));
            navigate("/admin");
        } else {
            try {
                const response = await axios.post("/User/login", { username, password });
                if (response.data) {
                    const { userId, name } = response.data;
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("userName", name);
                    sessionStorage.setItem("userSession", JSON.stringify({ userId, name, role: "user" }));
                    navigate("/skin");
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            } catch (error) {
                console.error("Login error:", error);
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className="login-image">
                    <img src={LoginImage} alt="Login Illustration" />
                </div>
                <div className="login-form-section">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label1>Email</label1>
                            <input
                                type="text"
                                placeholder="ENTER YOUR EMAIL"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label1>Password</label1>
                            <input
                                type="password"
                                placeholder="ENTER YOUR PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Login to Your Account
                        </button>
                        <p className="login-paragraph">
                            Don't have an account? <Link to="/register">Create Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;