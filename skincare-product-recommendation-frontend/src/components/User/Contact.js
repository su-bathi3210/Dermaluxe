import React from "react";
import Header from "../../components/User/Header";
import "./Contact.css";

import Video7 from "../../images/Video7.mp4";


import ChatIcon from "../../images/chat.png";
import EmailIcon from "../../images/email.png";
import PhoneIcon from "../../images/call.png";

const Contact = () => {
    return (
        <div>
            <Header />

            <div className="free-video">
                <video controls autoPlay loop muted>
                    <source src={Video7} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default Contact;
