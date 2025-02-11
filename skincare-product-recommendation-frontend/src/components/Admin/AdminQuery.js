import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import AdminNav from './AdminNav';
import "./Admin.css";

Modal.setAppElement('#root');

const AdminQuery = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get('/api/query');
                setQueries(response.data);
            } catch (error) {
                Swal.fire('Error', 'Failed to fetch queries.', 'error');
            }
        };
        fetchQueries();
    }, []);

    const handleEditClick = (query) => {
        setSelectedQuery(query);
        setModalIsOpen(true);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/query/${id}`);
                    setQueries(queries.filter(query => query.id !== id));

                    Swal.fire("Deleted!", "Query has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error", "Failed to delete the query.", "error");
                }
            }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedQuery) return;

        try {
            const response = await axios.put(`/api/query/${selectedQuery.id}`, selectedQuery);
            setQueries(queries.map(query => query.id === selectedQuery.id ? response.data : query));
            setModalIsOpen(false);
            setSelectedQuery(null);

            Swal.fire("Updated!", "Query updated successfully.", "success"); // ✅ Success message
        } catch (error) {
            Swal.fire("Error", "Failed to update the query.", "error"); // ✅ Error alert
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    return (
        <div>
            <AdminNav />
            <div className="admin-query-container">
                <h2 className="admin-query-heading">Query</h2>
                <p className="admin-query-paragraph">
                    At Dermaluxe Skincare, our admin panel offers a seamless interface for efficiently managing customer inquiries.
                    This feature ensures that customer concerns are addressed promptly and effectively, enhancing the overall customer experience.
                </p>

                <table className="query-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Respond</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query) => (
                            <tr key={query.id}>
                                <td>{query.name}</td>
                                <td>{query.email}</td>
                                <td>{query.subject}</td>
                                <td>{query.message}</td>
                                <td>{query.status}</td>
                                <td>{query.respond}</td>
                                <td>
                                    <button
                                        className="admin-query-edit-button"
                                        style={{ backgroundColor: '#600000', color: 'white', width: '55px' }}
                                        onClick={() => handleEditClick(query)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="admin-query-delete-button"
                                        style={{ backgroundColor: 'tomato', color: 'white', width: '75px' }}
                                        onClick={() => handleDelete(query.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedQuery && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="Edit Query"
                        className="admin-query-modal"
                        overlayClassName="admin-query-overlay"
                    >
                        <h3 className="admin-query-model-heading">Edit Query</h3>
                        <form onSubmit={handleUpdate} className="admin-edit-query-form">
                            <div className="admin-query-form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={selectedQuery.subject}
                                    required
                                />
                            </div>
                            <div className="admin-query-form-group">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={selectedQuery.message}
                                    required
                                ></textarea>
                            </div>

                            <div className="admin-query-form-group">
                                <input
                                    type="text"
                                    id="respond"
                                    name="respond"
                                    value={selectedQuery.respond}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="admin-query-form-group">
                                <select
                                    id="status"
                                    name="status"
                                    value={selectedQuery.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <button className="admin-query-submit">Update Query</button>
                            <button className="admin-query-submit-button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default AdminQuery;
