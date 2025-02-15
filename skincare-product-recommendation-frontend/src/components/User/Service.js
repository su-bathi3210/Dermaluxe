import React from 'react';
import Header from '../../components/User/Header';
import "./SE.css";


import Video from '../../images/Video10.mp4';
import ex1 from '../../images/ex1.png';
import ex2 from '../../images/ex2.png';
import ex3 from '../../images/ex3.png';
import ex4 from '../../images/ex4.png';
import ex5 from '../../images/ex5.png';
import ex6 from '../../images/ex6.png';

const Service = () => {
    return (
        <div>
            <Header />
            <div className="service-section-video">
                <video autoPlay loop muted>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="service-options">
                <h2>Three Ways to Get Started</h2>
                <div className="service-cards">
                    <div className="service-card">
                        <h3>Jeana's Quick Recommends</h3>
                        <p>Discover our founder Jeana's personalized skincare recommendations with a quick and easy quiz. Get expert suggestions tailored to your skin type and concerns in minutes.</p>
                        <button className="service-button">Take A Quiz</button>
                    </div>
                    <div className="service-card">
                        <h3>Personalized Consultation</h3>
                        <p>From acne to healthy aging, our estheticians are here to keep your skin glowing. Fill out our FREE consultation form, and an AOS expert will email you a fully personalized routine.</p>
                        <button className="service-button">Get Started</button>
                    </div>
                    <div className="service-card">
                        <h3>Expert Advice</h3>
                        <p>From finding a moisturizer to solving a skin concern, our experts are here to help via Live Chat Monday through Friday, 7:30 am to 4 pm PST. Get real-time advice and personalized solutions.</p>
                        <button className="service-button">Contact</button>
                    </div>
                </div>
            </div>


            <div className="meet-the-experts">
                <h2>Meet the Experts</h2>
                <div className="experts-grid">

                    <div className="expert-card">
                        <img src={ex1} alt="Jeana" />
                    </div>

                    <div className="expert-card">
                        <img src={ex2} alt="Celine" />
                    </div>

                    <div className="expert-card">
                        <img src={ex3} alt="MJ" />
                    </div>

                    <div className="expert-card">
                        <img src={ex4} alt="MJ" />
                    </div>

                    <div className="expert-card">
                        <img src={ex5} alt="MJ" />
                    </div>

                    <div className="expert-card">
                        <img src={ex6} alt="MJ" />
                    </div>
                </div>
            </div>

            <div className="AOS">
                <h2>AOS Recommendations</h2>
            </div>

        </div>
    );
};

export default Service;
