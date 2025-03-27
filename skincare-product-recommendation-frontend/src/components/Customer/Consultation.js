import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../../components/User/Header';
import './Consultation.css';

const consultationSchema = yup.object().shape({
    clientName: yup.string().required('Client name is required'),
    contactNo: yup.string().required('Contact number is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    skinType: yup.string().required('Skin type is required'),
    concerns: yup.string().required('Please specify your skin concerns'),
    consultantName: yup.string().required('Consultant name is required'),
});

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <p>{message}</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};


const ConsultationForm = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [submitHandler, setSubmitHandler] = useState(() => () => { });
    const [dialogMessage, setDialogMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(consultationSchema)
    });

    const onSubmit = async (data) => {
        const consultationData = {
            ...data,
            consultationStatus: 'Scheduled',  // Default status is Scheduled
            responseMessage: ''  // Admin will set the response message after the consultation
        };

        setDialogMessage('Are You Sure You Want to Submit The Consultation Request?');
        setSubmitHandler(() => async () => {
            try {
                await axios.post('/Consultation', consultationData);
                alert('Consultation request submitted successfully!');
                window.location.reload();
            } catch (error) {
                console.error('Error submitting consultation request:', error);
            }
        });
        setShowDialog(true);
    };

    const handleConfirm = async () => {
        setShowDialog(false);
        if (submitHandler) {
            await submitHandler();
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <div>
            <Header />

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

            <div className="consultation-container">
                <form className="consultation-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="consultation-form-heading">Consultation Request</h1>

                    <div className="consultation-form-row">
                        <div className="consultation-form-group">
                            <input type="text" {...register('clientName')} placeholder="Enter Your Name" />
                            {errors.clientName && <p>{errors.clientName.message}</p>}
                        </div>


                        <div className="consultation-form-group">
                            <input type="text" {...register('contactNo')} placeholder="Enter Contact Number" />
                            {errors.contactNo && <p>{errors.contactNo.message}</p>}
                        </div>
                    </div>

                    <div className="consultation-form-row">
                        <div className="consultation-form-group">
                            <input type="email" {...register('email')} placeholder="Enter Email Address" />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="consultation-form-row">
                        <div className="consultation-form-group">
                            <select {...register('skinType')} defaultValue="">
                                <option value="" disabled>Select Your Skin Type</option>
                                <option value="Oily">Oily</option>
                                <option value="Dry">Dry</option>
                                <option value="Combination">Combination</option>
                                <option value="Sensitive">Sensitive</option>
                                <option value="Normal">Normal</option>
                            </select>
                            {errors.skinType && <p>{errors.skinType.message}</p>}
                        </div>

                        <div className="consultation-form-group">
                            <textarea {...register('concerns')} placeholder="Describe Your Skin Concerns" />
                            {errors.concerns && <p>{errors.concerns.message}</p>}
                        </div>
                    </div>

                    <div className="consultation-form-row">
                        <div className="consultation-form-group">
                            <input type="text" {...register('consultantName')} placeholder="Enter consultant name" />
                            {errors.consultantName && <p>{errors.consultantName.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className="consultation-submit-button">Submit Consultation Request</button>
                </form>

                <ConfirmationDialog
                    isOpen={showDialog}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    message={dialogMessage}
                />
            </div>
        </div>
    );
};

export default ConsultationForm;
