import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

import expertIcon from '../../images/ask.png';
import logo from '../../images/Dermaluxe.png';
import orderIcon from '../../images/phone.png';
import referIcon from '../../images/refer.png';
import rewardsIcon from '../../images/reward.png';
import shippingIcon from '../../images/shipping.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <Link to='/'>
                        <img src={logo} alt="Dermaluxe Logo" />
                    </Link>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">PRODUCTS</Link></li>
                    <li><Link to="/about">ABOUT</Link></li>
                    <li><Link to="">GALLERY</Link></li>
                    <li><Link to="">REVIEWS</Link></li>
                    <li><Link to="">HOT DEALS</Link></li>
                    <li><Link to="">COMMUNITY</Link></li>
                    <li><Link to="">BLOG</Link></li>
                    <li><Link to="">SKINCARE SERVICES</Link></li>
                </ul>
            </nav>

            <div className="header-promo">
                <div className="header-promo-item">
                    <img src={shippingIcon} alt="Shipping Icon" />
                    <Link to="/shipping">
                        <span>FREE US Shipping</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <img src={expertIcon} alt="Expert Icon" />
                    <Link to="/consultation">
                        <span>Skin Consultation</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <img src={orderIcon} alt="Order Icon" />
                    <Link to="/AppOrder">
                        <span>15% off first App Order</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <img src={rewardsIcon} alt="Rewards Icon" />
                    <Link to="/Reward">
                        <span>Dermaluxe Rewards</span>
                    </Link>
                </div>
                <div className="header-promo-item">
                    <img src={referIcon} alt="Refer Icon" />
                    <span>Refer a Friend, Get $25</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
