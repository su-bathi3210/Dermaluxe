import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

import expertIcon from '../../images/ask.png';
import logo from '../../images/Dermaluxe.png';
import orderIcon from '../../images/phone.png';
import referIcon from '../../images/refer.png';
import rewardsIcon from '../../images/reward.png';
import shippingIcon from '../../images/shipping.png';
import sign from '../../images/log.png';
import cart from '../../images/cart.png';
import search from '../../images/search.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                {/* Search Bar */}
                <div className="header-left">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <img src={search} alt="Search Icon" className="search-icon" />
                </div>

                {/* Logo */}
                <div className="header-logo">
                    <Link to="/">
                        <img src={logo} alt="Dermaluxe Logo" />
                    </Link>
                </div>

                {/* Right Section */}
                <div className="header-right">
                    {/* Cart Section */}
                    <div className="user-options">
                        <Link to="/cart">
                            <img src={cart} alt="Cart Icon" className="icon" />
                            <p>Cart</p>
                        </Link>
                    </div>

                    {/* Sign In Button */}
                    <div className="user-options">
                        <Link to="/skin"><button className="sign-in-button">
                            <img src={sign} alt="Login Icon" className="icon1" />
                            <span1>Sign In</span1>
                        </button></Link>
                    </div>
                </div>

            </div>


            {/* Navigation Bar */}
            <nav className="header-nav">
                <ul>
                    <li><Link to="/">PRODUCTS</Link></li>
                    <li><Link to="/about">ABOUT</Link></li>
                    <li><Link to="">GALLERY</Link></li>
                    <li><Link to="/skin">QUIZ</Link></li>
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
                    <Link to="/expert">
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
