import React from 'react';
import Header from '../../components/User/Header';
import '../../App.css';

import App from '../../images/Download App.png';
import AppStore from '../../images/App Store.png';
import GooglePlay from '../../images/Google Paly.png';
import Image1 from '../../images/perk1.png';
import Image2 from '../../images/perk2.png';
import Image3 from '../../images/perk3.png';

const AppOrder = () => {
    return (
        <div>
            <Header />
            <div className="app-order-container">
                <div className="download-buttons">
                    <div className="download-card1">
                        <img
                            src={App}
                            alt="App Store"
                            className="download-image1"
                        />
                    </div>
                    <div className="download-card2">
                        <img
                            src={AppStore}
                            alt="Google Play"
                            className="download-image2"
                        />
                    </div>
                    <div className="download-card3">
                        <img
                            src={GooglePlay}
                            alt="Other Store"
                            className="download-image3"
                        />
                    </div>
                </div>
                <h2 className="app-perks-heading">DERMALUXE APP PERKS</h2>

                <div className="app-perks-images">
                    <img src={Image1} alt="Perk 1" className="perk-image" />
                    <img src={Image2} alt="Perk 2" className="perk-image" />
                    <img src={Image3} alt="Perk 3" className="perk-image" />
                </div>

                <div className="app-perks-paragraphs">
                    <p className="perk-paragraph1">
                    Keep up to date with latest beauty trends.
                    </p>
                    <p className="perk-paragraph2">
                    Enjoy exclusive offers and products.
                    </p>
                    <p className="perk-paragraph3">
                    Get early access to the hottest offers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppOrder;
