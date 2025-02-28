import React, { useState } from 'react';
import Header from '../../components/User/Header';
import './Consultation.css';

import consualtation1 from '../../images/consualtation2.png';

const Consultation = () => {
    const [formData, setFormData] = useState({
        clientName: '',
        contactNo: '',
        email: '',
        skinType: '',
        concerns: '',
        consultantName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/Consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Consultation request submitted successfully!');
            } else {
                alert('Failed to submit consultation request.');
            }
        } catch (error) {
            console.error('Error submitting consultation:', error);
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
                    <li>Appointment requests must be made at least 24 hours in advance and are available from Monday to Friday only.</li>
                    <li>Each consultation session is limited to <strong>20 minutes</strong> to ensure efficient and focused advice.</li>
                    <li>Please ensure accurate contact details are provided during booking to receive your appointment confirmation.</li>
                    <li>Our sensitive skin coaches will get in touch by phone or video call for your skincare consultation at that time. (Don’t worry, we’ll send you a reminder too.)</li>
                    <li>Bring any relevant skincare or medical history to the consultation to help our experts provide the most effective advice.</li>
                    <li>Your coach will listen to your concerns, share professional skincare advice and discuss what you need to help improve your skin, figuring it out together.</li>
                </ul>
            </div>

            <div className="consultation-form">
                <h2>Consultation Request Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Contact Number:
                        <input
                            type="text"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email Address:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Skin Type:
                        <select
                            name="skinType"
                            value={formData.skinType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Skin Type</option>
                            <option value="Oily">Oily</option>
                            <option value="Dry">Dry</option>
                            <option value="Combination">Combination</option>
                            <option value="Sensitive">Sensitive</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Skin Concerns:
                        <textarea
                            name="concerns"
                            value={formData.concerns}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Preferred Consultant:
                        <input
                            type="text"
                            name="consultantName"
                            value={formData.consultantName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Submit Request</button>
                </form>
            </div>
        </div>
    );
};

export default Consultation;
