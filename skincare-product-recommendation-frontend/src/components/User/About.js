import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/User/Header';
import '../../App.css';

import Video from '../../images/Video.mp4';
import SkincareImage from '../../images/products.png';
import Brands from '../../images/Brands.png';
import Advice from '../../images/Advice.png';
import Customer from '../../images/CustomerS.png';

export const About = () => {
    return (
        <div className="about-container">
            <Header />
            <div className="about-content">
                <h1>LET'S FACE IT WE'RE ALL DIFFERENT</h1>
                <p>
                    Our cultures, ethnicities, genders, sexualities. And there’s vitality and power in those differences.
                    But something important unites us—from a smooth baby’s cheek to the crisscrossing lines born from
                    a lifetime of laughter, we’ll always be in the skin we’re in. We’re here to honor and protect it.
                    To obsess over it. To bear witness to its magical properties, understand its limitations, and offer
                    it the care it needs. We’re a vibrant community of dermatologists, consumers, and brands, and
                    we’re all here for the unabashed love of skin.
                </p>

                <div className="about-video">
                    <video controls autoPlay loop muted>
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="additional-content">
                    <h2>WE'RE DERMALUXE</h2>
                    <p>
                        We care about what goes on your skin, because of what’s within. Our assortment is top-rated, curated & authenticated bringing you the highest quality products and straight-from-the-experts info to help you navigate all things beauty and skin care. Join the conversation on Instagram with #MyDermaluxeGlow show us your favorite #Dermaluxe finds that help you care for the skin you’re in! We’re excited to feature our community’s must-haves all season long.
                    </p>
                </div>


                <div className="image-content-section">
                    <div className="image-container">
                        <img src={SkincareImage} alt="Skincare" />
                    </div>
                    <div className="content-container">
                        <h2>THE DERMALUXE DIFFERENCE</h2>
                        <p>
                            We offer professional-strength formulas from top skin care brands (otherwise only available at a dermatologist’s office), hard-to-find spa care and natural beauty brands, professional hair care and makeup products, and specialty brands from around the world. <br></br>
                            Dermaluxe was created in 2024 by a dermatologist who wanted to better serve his patients with easier access to the treatments their skin needed. We offer professional-strength formulas from top skin care brands (otherwise only available at a dermatologist’s office), hard-to-find spa care and natural beauty brands, professional hair care and makeup products, and specialty brands from around the world.
                        </p>
                    </div>
                </div>

                <div className="about-images">
                    <Link to="">
                        <img src={Brands} alt="Brands" className="about--image" />
                    </Link>

                    <Link to="">
                        <img src={Advice} alt="Advice" className="about--image" />
                    </Link>

                    <Link to="">
                        <img src={Customer} alt="Customer" className="about--image" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;
