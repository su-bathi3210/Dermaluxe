import React from 'react';
import Header from '../../components/User/Header';
import '../../App.css';

import AskanExpert from '../../images/Ask an Expert.png';
import expert from '../../images/Expert.png';

const Expert = () => {
    return (
        <div>
            <Header />
            <div className="expert-container">
                <img
                    src={expert}
                    alt="Expert skincare professional"
                    className="expert-image"
                />
            </div>
            <div className="expert-section">
                <div className="left-side">
                    <img
                        src={AskanExpert}
                        alt="Skincare product or expert"
                        className="side-image1"
                    />
                </div>
                <div className="right-side">
                    <h1>YOUR PERSONAL BEAUTY PRO</h1>
                    <p>
                        Schedule a virtual consultation or chat with Luxora Skincare's experts for personalized product recommendations and professional advice. Our team of skincare specialists is here to guide you through your unique skin concerns, helping you discover the perfect solutions for healthy, radiant skin.
                    </p>
                    <div className="button-group">
                        <button className="primary-button">LEARN MORE</button>
                        <button className="secondary-button">VIDEO CONSULTATION</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expert;
