import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../App.css';

import Cleanser from '../../images/Cleanser.png';
import Face from '../../images/Face.png';
import Retinol from '../../images/Retinoal.png';
import Routine from '../../images/Routine.png';
import Scrub from '../../images/Scrub.png';
import Serum from '../../images/Serum.png';
import Tips from '../../images/Tips.png';
import VitaminC from '../../images/VitamiC.png';

import new1 from '../../images/new1.png';
import new2 from '../../images/new2.png';
import new3 from '../../images/new3.png';
import val from '../../images/val.png';

import Video from '../../images/Video4.mp4';
import Video1 from '../../images/Video9.mp4';


import judithafter from '../../images-gallery/judith-afte.png';
import judithbefore from '../../images-gallery/judith-before.png';
import nicolaafter from '../../images-gallery/nicola-after.png';
import nicolabefore from '../../images-gallery/nicola-before.png';
import rubyafter from '../../images-gallery/ruby-after.png';
import rubybefore from '../../images-gallery/ruby-before.png';


const Sections = () => {
    const [activeTab, setActiveTab] = useState('Ingredient Index');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };


    const transformations = [
        {
            beforeImg: judithbefore,
            afterImg: judithafter,
            title: 'Blemishes',
            description:
                '“I’ve been using this serum for about a month, and the difference in my blemishes is remarkable. My skin feels smoother, and the dark spots have noticeably faded. ”'
        },
        {
            beforeImg: rubybefore,
            afterImg: rubyafter,
            title: 'Redness',
            description:
                '“I’ve been been struggling with redness and rosacea for years. After two weeks, my redness was significantly reduced. Its gentle, absorbs quickly, and works well with my sensitive skin.”'
        },
        {
            beforeImg: nicolabefore,
            afterImg: nicolaafter,
            title: 'Blemishes & Pigmentation',
            description:
                '“I’ve been been using it for 3 weeks and my dark spots have noticeably faded. It absorbs quickly, isnt greasy, and makes my skin look brighter and more even!.”'
        },
    ];


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


            <div className="start-section-video">
                <video autoPlay loop muted>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>




            <div className="new-and-trending-container">
                <h2 className="new-and-trending-title">NEW & TRENDING</h2>
                <p className="new-and-trending-paragraph">Discover the latest in skincare innovation with Dermaluxe. 
                    From hydrating serums to rejuvenating treatments, our new & trending 
                    collection is designed to enhance your natural glow and keep your skin radiant every day.</p>
                <div className="new-and-trending-items">
                    <div className="new-and-trending-item">
                        <img src={new1} alt="VT Cosmetics Reclic Shot" />
                        <h3>VT Cosmetics Reclic Shot</h3>
                        <p>
                            The VT Cosmetics Reclic Shot 100 serves as an at-home micro-needling
                            experience, delivering targeted benefits for smoother, radiant skin.
                        </p>
                        <button>SHOP NOW</button>
                    </div>

                    <div className="new-and-trending-item">
                        <img src={new2} alt="Blush Me Beauty" />
                        <h3>Blush Me Beauty</h3>
                        <p>
                            Unleash your beauty with our high-tech products at unbeatable prices!
                            Dive into the fabulous world of Blush Me and see what we have in store for you!
                        </p>
                        <button>SHOP NOW</button>
                    </div>

                    <div className="new-and-trending-item">
                        <img src={new3} alt="Sunscreen Glossary" />
                        <h3>Sunscreen Glossary</h3>
                        <p>
                            Helping you find the only SPF you want to wear. Every. Single. Day.
                            Click the button below and discover our wide range of sunscreens now!
                        </p>
                        <button>SHOP NOW</button>
                    </div>
                </div>
            </div>

            <div className="se-image">
                    <img src={val} alt="se" />
                </div>

            <div className="real-result">
                <h2 className="real-result-title">REAL ROUTINES, REAL RESULTS</h2>
                <p className="real-result-description">
                    Whatever your skin concern, we have solutions. Build a simple, effective routine with <br />
                    science-backed ingredients and skin-nourishing formulas.
                </p>
                <div className="transformation-container">
                    {transformations.map((item, index) => (
                        <div key={index} className="transformation-card">
                            <div className="image-comparison">
                                <img src={item.beforeImg} alt="Before" className="before-image" />
                                <img src={item.afterImg} alt="After" className="after-image" />
                                <div className="slider"></div>
                            </div>
                            <h3 className="transformation-title">{item.title}</h3>
                            <p className="transformation-description">{item.description}</p>
                        </div>
                    ))}
                </div>
                <Link to="/gallery"><button className="real-result-button">SEE MORE SKIN TRANSFIRMATIONS</button></Link>
            </div>



            <div className="com-section-video">
                <video autoPlay loop muted>
                    <source src={Video1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
