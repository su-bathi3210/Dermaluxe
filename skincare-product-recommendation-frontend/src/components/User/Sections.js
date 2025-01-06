import React, { useState } from 'react';
import './Sections.css';
import { Link } from "react-router-dom";

import Face from '../../images/Face.png'
import Serum from '../../images/Serum.png'
import Retinol from '../../images/Retinoal.png'
import VitaminC from '../../images/VitamiC.png'
import Tips from '../../images/Tips.png'
import Cleanser from '../../images/Cleanser.png'
import Scrub from '../../images/Scrub.png'
import Routine from '../../images/Routine.png'

const Sections = () => {
    const [activeTab, setActiveTab] = useState('Ingredient Index');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div>

            <div className="promo-section">
                <h2 className="promo-title">EXPERT RECOMMENDATIONS FOR GLOWING, HEALTHY SKIN!</h2>
                <p className="promo-paragraph">
                    At Dermaluxe Skincare, we offer a curated selection of premium skincare products designed to promote long-term skin health.
                    Our formulations feature innovative, skin-identical active ingredients with advanced delivery systems, all scientifically backed
                    for efficacy. We believe in complete transparency what you see is what you get. As both a user or stockist, you can trust that our
                    products are carefully designed to support your skin’s health, providing noticeable improvements just shy of prescription-level
                    treatments. Embrace a pro-aging approach and enjoy glowing, healthy skin at every age.
                </p>
                <p className="promo-paragraph">
                    Our platform also supports a wide variety of trusted brands, ensuring you have access to a diverse range of solutions for
                    all skin concerns. Whether you are looking for personalized skincare advice or need professional recommendations from our
                    specialized dermatologists, we provide tailored solutions based on your unique skin type and needs. Let us help you find the
                    perfect products for a radiant complexion that’s as individual as you are.
                </p>
            </div>

            <div className="blog-section">
                <h2 className="blog-title">FROM THE BLOG</h2>
                <p className="blog-paragraph">Welcome to Dermaluxe Skin Notes, your ultimate destination for all things skincare! <br /></p>
                <div className="blog-tabs">
                    <div
                        className={`tab ${activeTab === 'Ingredient Index' ? 'active-tab' : ''}`}
                        onClick={() => handleTabClick('Ingredient Index')}
                    >
                        INGREDIENT INDEX
                    </div>
                    <div
                        className={`tab ${activeTab === 'How To' ? 'active-tab' : ''}`}
                        onClick={() => handleTabClick('How To')}
                    >
                        HOW TO
                    </div>
                </div>

                {activeTab === 'Ingredient Index' && (
                    <div className="blog-images">
                        <Link to=''>
                            <img
                                src={Face}
                                alt="Ingredient IndexImage1"
                                className="blog-image"
                            />
                        </Link>

                        <Link to=''>
                            <img
                                src={Serum}
                                alt="Ingredient IndexImage2"
                                className="blog-image"
                            />
                        </Link>


                        <Link to=''>
                            <img
                                src={Retinol}
                                alt="Ingredient IndexImage3"
                                className="blog-image"
                            />
                        </Link>


                        <Link to=''>
                            <img
                                src={VitaminC}
                                alt="Ingredient IndexImage4"
                                className="blog-image"
                            />
                        </Link>
                    </div>
                )}


                {activeTab === 'How To' && (
                    <div className="how-to-images">
                        <Link to=''>
                            <img
                                src={Tips}
                                alt="How To UseImage1"
                                className="how-to-image"
                            />
                        </Link>


                        <Link to=''>
                            <img
                                src={Cleanser}
                                alt="How To UseImage2"
                                className="how-to-image"
                            />
                        </Link>


                        <Link to=''>
                            <img
                                src={Scrub}
                                alt="How To UseImage3"
                                className="how-to-image"
                            />
                        </Link>


                        <Link to=''>
                            <img
                                src={Routine}
                                alt="How To UseImage4"
                                className="how-to-image"
                            />
                        </Link>
                    </div>
                )}
            </div>

            <div className="icon-section">
                <div className="icon-item">
                    <div className="icon">🏬</div>
                    <div className="label-description">
                        <div className="label">Find a Store</div>
                        <div className="description">Choose Your Store</div>
                    </div>
                </div>
                <div className="icon-item">
                    <div className="icon">📞</div>
                    <div className="label-description">
                        <div className="label">Customer Service</div>
                        <div className="description">Chat is unavailable</div>
                    </div>
                </div>
                <div className="icon-item">
                    <div className="icon">📱</div>
                    <div className="label-description">
                        <div className="label">Get the App</div>
                        <div className="description">Download Now</div>
                    </div>
                </div>
                <div className="icon-item">
                    <div className="icon">📩</div>
                    <div className="label-description">
                        <div className="label">Get Sephora Text Alerts</div>
                        <div className="description">Sign up Now</div>
                    </div>
                </div>
                <div className="icon-item">
                    <div className="icon">💳</div>
                    <div className="label-description">
                        <div className="label">Sephora Credit Card Program</div>
                        <div className="description">
                            Want 25% off your Sephora purchase? <span className="details">DETAILS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sections;
