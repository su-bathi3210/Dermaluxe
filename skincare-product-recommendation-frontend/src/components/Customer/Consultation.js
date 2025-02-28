import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Consultation.css';

// Schema for validating the consultation form
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
        <div className="dialog">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
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

        setDialogMessage('Are you sure you want to submit the consultation request?');
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
        <div className="consultation-container">
            <form className="consultation-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Consultation Request</h1>

                <div className="form-row">
                    <div className="form-group">
                        <label>Client Name:</label>
                        <input type="text" {...register('clientName')} placeholder="Enter your name" />
                        {errors.clientName && <p>{errors.clientName.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Contact Number:</label>
                        <input type="text" {...register('contactNo')} placeholder="Enter contact number" />
                        {errors.contactNo && <p>{errors.contactNo.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" {...register('email')} placeholder="Enter email address" />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Skin Type:</label>
                        <input type="text" {...register('skinType')} placeholder="e.g. Oily, Dry, Combination" />
                        {errors.skinType && <p>{errors.skinType.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Concerns:</label>
                        <textarea {...register('concerns')} placeholder="Describe your skin concerns" />
                        {errors.concerns && <p>{errors.concerns.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Consultant Name:</label>
                        <input type="text" {...register('consultantName')} placeholder="Enter consultant name" />
                        {errors.consultantName && <p>{errors.consultantName.message}</p>}
                    </div>
                </div>

                <button type="submit" className="submit-button">Submit Consultation Request</button>
            </form>

            <ConfirmationDialog
                isOpen={showDialog}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message={dialogMessage}
            />
        </div>
    );
};

export default ConsultationForm;
