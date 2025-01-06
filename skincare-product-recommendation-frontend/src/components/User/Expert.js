import React from 'react';
import Header from '../../components/User/Header';
import './Expert.css';

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

            {/* New Section */}
            <div className="steps-section">
                <h2>YOUR STEP-BY STEP <br />JOURNEY TO HEALTHIER LOOKING SKIN</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-icon">📅</div>
                        <h3>STEP 1: SELECT A SLOT</h3>
                        <p>
                            Select a convenient slot for your online consultation using our booking form.
                        </p>
                    </div>
                    <div className="step">
                        <div className="step-icon">📧</div>
                        <h3>STEP 2: RECEIVE CONFIRMATION</h3>
                        <p>
                            Receive your confirmation via email, including a link to join the consultation.
                        </p>
                    </div>
                    <div className="step">
                        <div className="step-icon">🔗</div>
                        <h3>STEP 3: CLICK THE LINK TO JOIN</h3>
                        <p>
                            Click the link in your confirmation email to join your online consultation.
                        </p>
                    </div>
                    <div className="step">
                        <div className="step-icon">👩‍⚕️</div>
                        <h3>STEP 4: SPEAK WITH AN EXPERT</h3>
                        <p>
                            Enjoy your 15-minute bespoke consultation with a Brand Expert.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expert;
