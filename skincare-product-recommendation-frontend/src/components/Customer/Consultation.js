import React, { useState } from 'react';
import Header from '../../components/User/Header';
import './Consultation.css';

import consualtation1 from '../../images/consualtation2.png';

const Consultation = () => {

    const [formData, setFormData] = useState({
        clientName: '',
        contactNo: '',
        email: '',
        consultationDate: '',
        consultationTime: '',
        skinType: '',
        concerns: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/Consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Your consultation has been successfully scheduled!');
                setFormData({
                    clientName: '',
                    contactNo: '',
                    email: '',
                    consultationDate: '',
                    consultationTime: '',
                    skinType: '',
                    concerns: '',
                });
            } else {
                setMessage('Failed to schedule your consultation. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };


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

            {/* Consultation Form */}
            <div className="consultation-form-container">
                <h2>Book Your Consultation</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="clientName"
                        placeholder="Your Name"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="contactNo"
                        placeholder="Your Contact Number"
                        value={formData.contactNo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="consultationDate"
                        value={formData.consultationDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="consultationTime"
                        value={formData.consultationTime}
                        onChange={handleChange}
                        required
                    />
                    <select name="skinType" value={formData.skinType} onChange={handleChange} required>
                        <option value="">Select Your Skin Type</option>
                        <option value="Oily">Oily</option>
                        <option value="Dry">Dry</option>
                        <option value="Combination">Combination</option>
                        <option value="Sensitive">Sensitive</option>
                    </select>
                    <textarea
                        name="concerns"
                        placeholder="Your Skin Concerns"
                        value={formData.concerns}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>

        </div>
    );
};

export default Consultation;
