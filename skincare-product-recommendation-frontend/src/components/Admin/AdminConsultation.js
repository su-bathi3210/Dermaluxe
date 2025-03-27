import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import "./Admin.css";

const AdminConsultation = () => {
    const [consultations, setConsultations] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [consultationDate, setConsultationDate] = useState('');
    const [consultationTime, setConsultationTime] = useState('');
    const [consultationStatus, setConsultationStatus] = useState('');

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = async () => {
        try {
            const response = await axios.get('/Consultation');
            setConsultations(response.data);
        } catch (error) {
            console.error('Error fetching consultations:', error);
        }
    };

    const handleUpdateConsultation = async () => {
        if (!selectedConsultation) return;

        try {
            const updatedConsultation = {
                ...selectedConsultation,
                consultationDate,
                consultationTime,
                consultationStatus
            };
            await axios.put(`/Consultation/${selectedConsultation.id}`, updatedConsultation);
            fetchConsultations();
            sendStatusEmail(updatedConsultation);
            setSelectedConsultation(null); // Close modal
        } catch (error) {
            console.error('Error updating consultation:', error);
        }
    };

    const sendStatusEmail = async (consultation) => {
        try {
            let emailSubject = `Consultation ${consultation.consultationStatus}`;
            let emailBody = `Dear ${consultation.clientName},\n\nYour consultation has been ${consultation.consultationStatus.toLowerCase()} on ${consultation.consultationDate} at ${consultation.consultationTime}.\n\nThank you,\nDermaluxe Skincare.`;
            await axios.post('/sendEmail', {
                to: consultation.email,
                subject: emailSubject,
                body: emailBody
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleDeleteConsultation = async (id) => {
        try {
            await axios.delete(`/Consultation/${id}`);
            fetchConsultations();
        } catch (error) {
            console.error('Error deleting consultation:', error);
        }
    };

    const handleEditClick = (consultation) => {
        setConsultationDate(consultation.consultationDate);
        setConsultationTime(consultation.consultationTime);
        setConsultationStatus(consultation.consultationStatus);
        setSelectedConsultation(consultation); // Open the modal
    };

    return (
        <div>
            <AdminNav />
            <div className="admin-consultation-container">
                <h1 className="admin-consultation-form-head">Consultation</h1>
                <p className="admin-consultation-form-paragraph">
                    At Dermaluxe Skincare, our admin panel provides a streamlined interface for
                    efficiently managing consultations. This feature ensures that consultations are reviewed,
                    scheduled, updated, and responded to promptly, helping us deliver timely and personalized
                    care to our clients. The admin panel allows for easy management of consultation dates, times,
                    statuses, and responses, ensuring a smooth and organized process while enhancing the overall
                    customer experience.
                </p>

                <div className="admin-consultation-table11">
                    <table className="admin-consultation-table table-striped">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Consultation Date</th>
                                <th>Time</th>
                                <th>Skin Type</th>
                                <th>Concerns</th>
                                <th>Consultant</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultations.map(consultation => (
                                <tr key={consultation.id}>
                                    <td>{consultation.clientName}</td>
                                    <td>{consultation.email}</td>
                                    <td>{consultation.consultationDate}</td>
                                    <td>{consultation.consultationTime}</td>
                                    <td>{consultation.skinType}</td>
                                    <td>{consultation.concerns}</td>
                                    <td>{consultation.consultantName}</td>
                                    <td>{consultation.consultationStatus}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(consultation)} style={{backgroundColor: 'red'}}>Edit</button>
                                        <button onClick={() => handleDeleteConsultation(consultation.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedConsultation && (
                    <div className="admin-consultation-modal">
                        <div className="admin-consultation-modal-content">
                            <h2 className="admin-consultation-modal-heading">Edit Consultation</h2>
                            <label htmlFor="consultationDate">Consultation Date:</label>
                            <input
                                type="date"
                                id="consultationDate"
                                value={consultationDate}
                                onChange={(e) => setConsultationDate(e.target.value)}
                            />
                            <label htmlFor="consultationTime">Consultation Time:</label>
                            <input
                                type="time"
                                id="consultationTime"
                                value={consultationTime}
                                onChange={(e) => setConsultationTime(e.target.value)}
                            />
                            <label htmlFor="consultationStatus">Consultation Status:</label>
                            <select
                                id="consultationStatus"
                                value={consultationStatus}
                                onChange={(e) => setConsultationStatus(e.target.value)}
                            >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Canceled">Canceled</option>
                            </select>

                            <textarea
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                placeholder="Enter your response message"
                            />
                            <button onClick={handleUpdateConsultation}>Update Consultation</button>
                            <button onClick={() => setSelectedConsultation(null)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminConsultation;
