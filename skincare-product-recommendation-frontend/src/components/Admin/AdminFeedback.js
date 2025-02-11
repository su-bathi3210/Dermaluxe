import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import ReactStars from 'react-stars';
import Modal from 'react-modal';
import AdminNav from './AdminNav';
import "./Admin.css";

Modal.setAppElement('#root');

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [response, setResponse] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 2000 });
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/Feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const openModal = (feedback) => {
        setSelectedFeedback(feedback);
        setResponse(feedback.response || '');
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedFeedback(null);
        setResponse('');
    };

    const submitResponse = async (e) => {
        e.preventDefault();
        if (!response.trim()) {
            Swal.fire({
                title: 'Error!',
                text: 'Response cannot be empty.',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
            return;
        }

        try {
            await axios.put(`/Feedback/${selectedFeedback.feedbackId}`, { response });
            Swal.fire({
                title: 'Success!',
                text: 'Feedback has been responded to.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            fetchFeedbacks();
            closeModal();
        } catch (error) {
            console.error('Error responding to feedback:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error responding to feedback.',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    const deleteFeedback = async (feedbackId) => {
        try {
            await axios.delete(`/Feedback/${feedbackId}`);
            Swal.fire({
                title: 'Deleted!',
                text: 'Feedback has been deleted.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            fetchFeedbacks();
        } catch (error) {
            console.error('Error deleting feedback:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error deleting feedback',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="feedback-container">
                <h1 className="admin-feedback-form-head">Feedback</h1>
                <p className="admin-feedback-form-paragraph">
                    At Dermaluxe Skincare, our admin panel provides a streamlined interface for
                    efficiently managing customer feedback. This feature ensures that feedback is reviewed and responded to promptly, helping us
                    continuously improve our services and enhance the overall customer experience.
                </p>

                <div className="admin-feedback-table">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Rating</th>
                                <th>Response</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback) => (
                                <tr key={feedback.feedbackId}>
                                    <td>{feedback.name}</td>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.subject}</td>
                                    <td>{feedback.message}</td>
                                    <td>
                                        <ReactStars
                                            count={5}
                                            value={feedback.rating}
                                            size={24}
                                            color2={'#ffd700'}
                                            edit={false}
                                        />
                                    </td>
                                    <td>{feedback.response || 'No response yet'}</td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#600000', color: 'white', width: '75px' }}
                                            className="admin-feedback-btn-danger"
                                            onClick={() => deleteFeedback(feedback.feedbackId)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            style={{ backgroundColor: 'tomato', color: 'white', width: '75px', marginTop: '4px' }}
                                            className="admin-feedback-btn-primary"
                                            onClick={() => openModal(feedback)}
                                        >
                                            Respond
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit Feedback "
                    className="admin-feedback-modal"
                    overlayClassName="admin-feedback-overlay"
                >
                    <h2 className="admin-feedback-model-heading">Edit Feedback Query</h2>
                    {selectedFeedback && (
                        <form onSubmit={submitResponse} className="admin-edit-feedback-form">
                            <div className="admin-feedback-form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={selectedFeedback.subject}
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="admin-feedback-form-group">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={selectedFeedback.message}
                                    required
                                    readOnly
                                ></textarea>
                            </div>
                            <div className="admin-feedback-form-group">
                                <input
                                    type="text"
                                    id="respond"
                                    name="respond"
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                />
                            </div>
                            <button className="admin-query-submit">Update Query</button>
                            <button className="admin-query-submit-button" onClick={closeModal}>Cancel</button>
                        </form>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default AdminFeedback;
