import React, { useEffect, useState } from 'react';

const AdminConsultation = () => {
    const [consultations, setConsultations] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = async () => {
        const response = await fetch('http://localhost:8081/Consultation');
        const data = await response.json();
        setConsultations(data);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8081/Consultation/${id}`, { method: 'DELETE' });
        fetchConsultations();
    };

    const handleRespond = async (id, response) => {
        const consultation = consultations.find((c) => c.id === id);
        consultation.responseMessage = response;

        await fetch(`http://localhost:8081/Consultation/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consultation),
        });
        fetchConsultations();
        setResponseMessage('Response sent!');
    };

    return (
        <div className="admin-consultations">
            <h2>Manage Consultations</h2>
            {responseMessage && <p>{responseMessage}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {consultations.map((consultation) => (
                        <tr key={consultation.id}>
                            <td>{consultation.clientName}</td>
                            <td>{consultation.email}</td>
                            <td>{consultation.consultationDate}</td>
                            <td>{consultation.consultationTime}</td>
                            <td>
                                <button onClick={() => handleDelete(consultation.id)}>Delete</button>
                                <button onClick={() => handleRespond(consultation.id, 'Your consultation is confirmed.')}>Respond</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminConsultation