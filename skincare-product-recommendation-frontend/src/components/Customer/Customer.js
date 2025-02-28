import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Customer = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState({ name: '', userId: '' });
    const location = useLocation();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`/User/${userId}`); // Fixed URL formatting
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

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

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
                            <Link to="/">
                                <button className="login-button">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`nav-links-container ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li><NavLink to="/diabetic-monitoring" className={({ isActive }) => (isActive ? 'active' : '')}>DIABETIC MONITORING</NavLink></li>
                        <li><NavLink to="/view-records" className={({ isActive }) => (isActive ? 'active' : '')}>VIEW RECORDS</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Customer;