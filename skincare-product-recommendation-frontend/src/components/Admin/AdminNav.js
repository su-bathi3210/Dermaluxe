import React from 'react';
import { Link } from "react-router-dom";
import '../User/Header.css';

import logo from '../../images/DermaluxeAdmin.png';

const AdminNav = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo" style={{ marginLeft: '29px' }}>
                    <Link to="/">
                        <img src={logo} alt="Dermaluxe Logo" />
                    </Link>
                </div>
            </div>


            {/* Navigation Bar */}
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">USERS</Link></li>
                    <li><Link to="/">PRODUCTS</Link></li>
                    <li><Link to="/">ORDERS</Link></li>
                    <li><Link to="/adminAI">PERSONALISED SKINCARE</Link></li>
                    <li><Link to="/adminconsultation">CONSULTATION</Link></li>
                    <li><Link to='/admingallery'>GALLERY</Link></li>
                    <li><Link to="/adminquery">QUERY</Link></li>
                    <li><Link to="/adminfeedback">FEEDBACK</Link></li>
                    <li><Link to="/">REVIEWS</Link></li>
                    <li><Link to="/">OFFERS</Link></li>
                    <li><Link to="/">BLOG</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminNav;
