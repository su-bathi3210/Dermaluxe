import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Customer = () => {
    const [user, setUser] = useState({ name: '', userId: '' });

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`/User/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUser({ name: data.name, userId: data.userId });
                    } else {
                        console.error('Failed to fetch user data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        } else {
            console.log('No user ID found in local storage');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 0) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo-container">
                        <Link to="/userdash">
                            {/* Add logo if needed */}
                        </Link>
                    </div>

                    <div className="user-info">
                        <span className="user-name">Hello, {user.name || 'Guest'}</span>
                        <span className="user-id"> - (User ID: {user.userId || 'N/A'})</span>
                    </div>

                    <div className="right-corner-icons">
                        <div className="login-container">
                            <Link to="/login">
                                <button className="login-button">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="nav-links-container">
                    <ul className="nav-links">
                        <li><NavLink to="/personalized system" className={({ isActive }) => (isActive ? 'active' : '')}>DERMALUXE SKINCARE PERSONALIZED SYSTEM</NavLink></li>
                        <li><NavLink to="/personalized-consultation" className={({ isActive }) => (isActive ? 'active' : '')}>CONSULTATION</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Customer;
