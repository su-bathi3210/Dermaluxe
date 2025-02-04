import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Header from './Header';

import brightness from '../../images/brightness.png';
import consu from '../../images/Consu.png';
import deep from '../../images/deep.png';
import expertImage from '../../images/expert.png';
import facial from '../../images/facial.png';
import microdermabrasion from '../../images/microdermabrasion.png';
import skincare from '../../images/skincare-product.png';
import routine from '../../images/skincare-routine.png';
import understand from '../../images/understand.png';
import wash from '../../images/wash-face.png';

import Video from '../../images/Video3.mp4';
import Video1 from '../../images/Video6.mp4';


const Expert = () => {
    return (
        <div>
            <Header />
            <div className="free-video">
                <video autoPlay loop muted>
                    <source src={Video1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
                    <Link to='/consultation' className="consultation-button">Book Your Consultation</Link>

                </div>
                <div className="consultation-doctor-image">
                    <img src={consu} alt="Customer" />
                </div>
            </div>

            <div className="how-consultation-helps">
                <h2 className="consultation-centered-heading2">HOW AN ONLINE SKINCARE CONSULTATION CAN HELP</h2>
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

            <div className="consultation-video">
                <Link to='/consultation'>
                    <video autoPlay loop muted>
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Link>
            </div>

            <div className="expert-highlight-section">
                <div className="expert-highlight-container">
                    <div className="expert-image">
                        <img src={expertImage} alt="Expert" />
                    </div>
                    <div className="expert-content">
                        <h2>NOTES FROM OUR EXPERTS</h2>
                        <h3>MEET OUR ONLINE SKIN EXPERT</h3>
                        <p>
                            Behind every glowing skin journey is our dedicated expert. With years of experience in skincare, our expert
                            is here to provide personalized advice tailored to your unique skin concerns. Discover their top product picks,
                            favorite treatments, and what they love most about helping you achieve radiant, healthy skin.
                        </p>

                        <Link to='' className="read-more-button">Read Now</Link>
                    </div>
                </div>
            </div>


            <div className="popular-treatments">
                <h2 className="popular-treatments-heading">POPULAR TREATMENTS AT DERMALUXE SKINCARE THERAPY</h2>
                <p className="popular-treatments-paragraph">
                    We may also recommend a skin treatment to kick-start your professional skincare journey. At Dermaluxe Skincare Therapy,
                    we provide an array of treatments to help you achieve the skin you’ve always dreamed of. Some of our popular skin treatments include:
                </p>

                <div className="popular-treatments-wrapper">
                    <div className="popular-treatment-item">
                        <img src={wash} alt="Customer" className="treatment-icon" />
                        <h3>Light me up</h3>
                        <p>
                            Using a Dermalux LED machine, we use red, blue, and near-infrared light to penetrate layers of the skin and target concerns.
                            This is a great treatment for scarring, eczema, psoriasis, rosacea, dry skin, acne, redness, dermatitis, and more.
                        </p>
                    </div>

                    <div className="popular-treatment-item">
                        <img src={deep} alt="Customer" className="treatment-icon" />
                        <h3>Detoxifying deep cleanse</h3>
                        <p>
                            The detoxifying deep cleanse utilises steam and heated towels to open pores and soften the skin. This relaxing treatment
                            also includes an all-over face extraction using our Ultrasonic device. The 1-hour treatment concludes with a purifying
                            mask to close your deeply-cleansed pores.
                        </p>
                    </div>

                    <div className="popular-treatment-item">
                        <img src={facial} alt="Customer" className="treatment-icon" />
                        <h3>Bye Bye Pigment</h3>
                        <p>
                            Is pigmentation a skin issue for you? Our Bye Bye Pigmentation treatment package uses Cosmelan to remove pigmentation
                            such as melasma, freckles, post-baby pigment, hormonal pigment, and sun damage.
                        </p>
                    </div>

                    <div className="popular-treatment-item">
                        <img src={brightness} alt="Customer" className="treatment-icon" />
                        <h3>Dermapen skin needling</h3>
                        <p>
                            This 45-minute session is also sometimes called collagen induction therapy. The Dermapen 4 glides over the skin, creating
                            millions of fine fractional channels. This treatment is great for pigmentation, ageing, lines, wrinkles, and scars.
                        </p>
                    </div>

                    <div className="popular-treatment-item">
                        <img src={microdermabrasion} alt="Customer" className="treatment-icon" />
                        <h3>Microdermabrasion</h3>
                        <p>
                            Microdermabrasion works by removing surface dead skin cells, giving your skin a smoother complexion while minimising the
                            look of wrinkles and fine lines. The session ends with manual extractions and a calming hydration mask before a neck
                            and décolletage massage.
                        </p>
                    </div>

                    <div className="popular-treatments-button">
                        <Link to='/consultation' className="treatments-button">Book Your Consultation</Link>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Expert;
