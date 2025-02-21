import React from 'react';
import Slider from "react-slick";
import Header from '../../components/User/Header';
import './Service.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Video from '../../images/Video10.mp4';
import SkincareImage from '../../images/Newsletter-Subscription-Homepage.png';


import YouTubeIcon from '../../images/youtube.png';
import FacebookIcon from '../../images/facebook.png';
import TikTokIcon from '../../images/tiktok.png';
import PinterestIcon from '../../images/twitter.png';
import InstagramIcon from '../../images/instagram.png';

import EmailConsultation from '../../images/OnlineRecommendation.png';
import QuikRecommendation from '../../images/OnlineConsultation.png';
import OnlineAdvice from '../../images/onlineAdvice.png';


const Service = () => {
    const shorts = [
        { id: 1, url: "https://www.youtube.com/embed/MUJA1tL_RaA" },
        { id: 2, url: "https://www.youtube.com/embed/w7Bjef55aoo" },
        { id: 3, url: "https://www.youtube.com/embed/omundjYMBzk" },
        { id: 4, url: "https://www.youtube.com/embed/rZzLemjD0XU" },
        { id: 5, url: "https://www.youtube.com/embed/P5FxIZeOF-Y" },
        { id: 6, url: "https://www.youtube.com/embed/lIAnRmY0h6M" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div>
            <Header />

            <div className="service-section-video">
                <video autoPlay loop muted>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>


            <div className="skincare-tips-section">
                <h2>SKINCARE TIPS AND EXPERT ADVICE FROM SKINCARE.COM</h2>
                <div className="skincare-tips-container">
                    <div className="skincare-tip reverse">
                        <div className="skincare-tip-text">
                            <h3>Jeana's Quick Recommends</h3>
                            <p>Discover our founder Jeana's personalized skincare recommendations with a quick and easy quiz.</p>
                        </div>
                        <img src={QuikRecommendation} alt="Body Scrub" className="skincare-image-leftside" />
                    </div>


                    <div className="skincare-tip">
                        <div className="skincare-tip-text">
                            <h3>Free Email Consultation</h3>
                            <p>From acne to healthy aging, our estheticians are here to keep your skin glowing. Fillout our FREE consultation form, and an AOS expert will email you a fully personalized routine.</p>
                        </div>
                        <img src={EmailConsultation} alt="Vitamin C Skincare" className="skincare-image-rightside" />
                    </div>


                    <div className="skincare-tip reverse">
                        <div className="skincare-tip-text">
                            <h3>Expert Advice</h3>
                            <p>From finding a moisturizer to solving a skin concern, our experts are here to help via Live Chat Monday through Friday, 7:30 am to 4 pm PST.</p>
                        </div>
                        <img src={OnlineAdvice} alt="Toner" className="skincare-image-leftside" />
                    </div>
                </div>
            </div>


            <div className="shorts-section">
                <h2>WATCH OUR LATEST YOUTUBE SHORTS</h2>
                <Slider {...settings}>
                    {shorts.map((short) => (
                        <div key={short.id} className="shorts-card">
                            <iframe
                                width="100%"
                                height="250"
                                src={short.url}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="subscription-container">
                <div className="subscription-content">
                    <h2>WANT MORE SKINCARE TIPS AND TRICKS?</h2>
                    <form className="subscription-form">
                        <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" required />
                        <button type="submit">SUBMIT</button>
                    </form>
                    <div className="subscription-checkbox">
                        <input type="checkbox" id="termsCheckbox" required />
                        <label htmlFor="termsCheckbox">
                            By submitting this form, I confirm I am a US resident, and (1) agree to
                            <span className="fake-link"> Terms of Use</span> and to receive marketing and promotional communications from
                            Dermaluxe Skincare and <span className="fake-link">other affiliated brands</span>, and (2) have read and acknowledge
                            Dermaluxe Skincare's <span className="fake-link">Privacy Notice</span> and affiliated brands <span className="fake-link">Notice of Financial Incentives</span>.
                        </label>
                    </div>

                    <div className="social-media">
                        <h3>SUBSCRIBE + FOLLOW US!</h3>
                        <div className="social-icons">
                            <img src={YouTubeIcon} alt="YouTube" />
                            <img src={FacebookIcon} alt="Facebook" />
                            <img src={TikTokIcon} alt="TikTok" />
                            <img src={PinterestIcon} alt="Pinterest" />
                            <img src={InstagramIcon} alt="Instagram" />
                        </div>
                    </div>
                </div>

                <div className="subscription-image">
                    <img src={SkincareImage} alt="Skincare Products" />
                </div>
            </div>
        </div>
    );
};

export default Service;
