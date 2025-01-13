import React from 'react';
import Header from '../../components/User/Header';
import './Contact.css';

import contact from '../../images/contact.png';

const Contact = () => {
    return (
        <div>
            <Header />

            <div className="contact-image">
                <img src={contact} alt="contact" />
            </div>
        </div>
    );
};

export default Contact;
