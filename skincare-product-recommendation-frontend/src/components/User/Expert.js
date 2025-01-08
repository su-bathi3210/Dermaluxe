import React from 'react';
import Header from '../../components/User/Header';
import './Expert.css';

import consultation from '../../images/Consultation.png';
import consu from '../../images/Consu.png';
import experts from '../../images/Experts.png';
import skincare from '../../images/skincare-product.png';
import routine from '../../images/skincare-routine.png';
import understand from '../../images/understand.png';

const Expert = () => {
    return (
        <div>
            <Header />

            <div className="consultation-image">
                <img src={consultation} alt="consultation Customer" />
            </div>

            <div className="consultation-content">
                <div className="consultation-text">
                    <h1>GET EXPERT SKINCARE ADVICE ONLINE!</h1>
                    <p>
                        Struggling to find time for an in-person visit? Our online skincare consultation is the perfect solution for
                        those with busy schedules or living far away. Connect with our skincare experts from the comfort of your home for a
                        personalized assessment of your skin's unique needs. We’ll recommend the best products and ingredients to help you achieve
                        clear, glowing skin. Whether you’re dealing with acne, dryness, or simply want to enhance your natural radiance, our virtual
                        service makes it simple to start your journey to healthier, more beautiful skin anytime, anywhere.
                    </p>
                    <button className="consultation-button">Book Your Consultation</button>
                </div>
                <div className="consultation-doctor-image">
                    <img src={consu} alt="Customer" />
                </div>
            </div>

            <div className="skin-experts-section">
                <h2>MEET OUR SKIN EXPERTS</h2>
                <div className="skin-expert-image">
                    <img src={experts} alt="experts" />
                </div>
            </div>


            <div className="how-consultation-helps">
                <h2 className="consultation-centered-heading2">WAYS TO EARN</h2>
                <p className="consultation-centered-paragraph">An online skincare consultation can help you determine how to get the best out of your skin. We think
                    it’s one of the best beauty investments you can make. Here are a few reasons why we love online skin consultations.</p>

                <div className="consultation-helps-wrapper">
                    <div className="consultation-helps">
                        <img src={skincare} alt="Customer" className="consultation-icon" />
                        <h3>Find the right skincare products</h3>
                        <p>Beauty brands often apply a one-size-fits-all approach to skincare. The truth is, everyone’s skin is different.
                            We’re all unique, and this applies to our skin too. Our online skincare consultants can help you find the right skincare
                            products for your skin.
                        </p>
                    </div>

                    <div className="consultation-helps">
                        <img src={routine} alt="Customer" className="consultation-icon" />
                        <h3>Personalised skin goals</h3>
                        <p> While some people may wish to minimise fine lines and wrinkles, others may be looking to eliminate pigmentation or
                            ease the appearance of rosacea. The skin consultants at Chantal Louise Skin Therapy can help you develop realistic
                            skin goals that are tailored to your individual skin type and concerns.
                        </p>
                    </div>


                    <div className="consultation-helps">
                        <img src={understand} alt="Customer" className="consultation-icon" />
                        <h3>A deeper understanding</h3>
                        <p> We love sharing our skincare knowledge with clients to help them better understand their skin. Our expert team can
                            give you an idea of exactly what could be causing your skin concerns, empowering you with the knowledge and products
                            needed to begin your treatment journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expert;
