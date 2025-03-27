import React from 'react';
import { Link } from "react-router-dom";
import '../User/Header.css';

import logo from '../../images/DermaluxeAdmin.png';

const AdminNav = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo" style={{ marginLeft: '29px' }}>
                    <Link to="/admin">
                        <img src={logo} alt="Dermaluxe Logo" />
                    </Link>
                </div>
            </div>


            {/* Navigation Bar */}
            <nav className="header-nav">
                <ul>
                    <li><Link to="">USERS</Link></li>
                    <li><Link to='/adminAI'>PERSONALISED SKINCARE</Link></li>
                    <li><Link to="/adminconsultation">CONSULTATION</Link></li>
                </ul>
            </nav>

            <div className="header-promo" style={{ fontWeight: 'bold' }}>
                <div className="header-promo-item">
                    <Link to="/admingallery">
                        <span>GALLERY</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <Link to="/adminquery">
                        <span>QUERY</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <Link to="/adminfeedback">
                        <span>FEEDBACK</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <Link to=" ">
                        <span>REVIEWS</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <Link to="">
                        <span>OFFERS</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <Link to="/adminArticle">
                        <span>ARTICLES</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default AdminNav;
