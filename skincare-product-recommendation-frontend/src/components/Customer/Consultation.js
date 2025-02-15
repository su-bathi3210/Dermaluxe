import React from 'react';
import Header from '../../components/User/Header';
import './Consultation.css';

import consualtation1 from '../../images/consualtation2.png';

const Consultation = () => {
    return (
        <div>
            <Header />

            <div className="expert-consualtation1-image">
                <img src={consualtation1} alt="consultation Customer" />
            </div>


            <div className="consultation-conditions">
                <h2> DERMALUXE SKINCARE CONSULTATION GUIDELINES </h2>
                <ul>
                    <li>Appointment requests must be made at least 24 hours in advance and are available from Monday to Friday only. </li>
                    <li>Each consultation session is limited to <strong>20 minutes</strong> to ensure efficient and focused advice.</li>
                    <li>Please ensure accurate contact details are provided during booking to receive your appointment confirmation.  </li>
                    <li>Our sensitive skin coaches will get in touch by phone or video call for your skincare consultation at that time. (Don’t worry, we’ll send you a reminder too.)</li>
                    <li>Bring any relevant skincare or medical history to the consultation to help our experts provide the most effective advice.  </li>
                    <li>Your coach will listen to your concerns, share professional skincare advice and discuss what you need to help improve your skin, figuring it out together.</li>
                </ul>
            </div>
        </div>
    );
};

export default Consultation;
