import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import AdminNav from './AdminNav';
import "./Admin.css";

Modal.setAppElement("#root");

const AdminAI = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [updatedPredictions, setUpdatedPredictions] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/admin/customers");
                setCustomers(response.data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            }
        };
        fetchCustomers();
    }, []);

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setModalIsOpen(true);
    };

    const handleEditPredictions = () => {
        setUpdatedPredictions(selectedCustomer.predictions);  // Pre-fill with current predictions
        setEditModalIsOpen(true);
    };

    const handleSavePredictions = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:5000/admin/customer/${selectedCustomer._id}/update_predictions`,
                { predictions: updatedPredictions }
            );
            alert(response.data.message);
            setEditModalIsOpen(false);
            setModalIsOpen(false);  // Close the customer modal
        } catch (err) {
            console.error("Error updating predictions:", err);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCustomer(null);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    return (
        <div className="admin-dashboard">
            <AdminNav />
            <h2 className="admin-personalized-heading">Skincare Personalized System</h2>
            <p className="admin-query-paragraph">
                The Dermaluxe Skincare Product Personalized System Admin Panel
                allows administrators to access a comprehensive view of user predictions and preferences
                related to Dermaluxe skincare products. Admins have read-only access, and if any issues arise,
                an automatic email is sent to the customer for resolution.
            </p>

            {/* Table for Customer Data */}
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Skin Type</th>
                        <th>Skin Tone</th>
                        <th>Skin Concern</th>
                        <th>Environmental Impact</th>
                        <th>Skin Goals</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.skin_type}</td>
                            <td>{customer.skin_tone}</td>
                            <td>{customer.skin_concern}</td>
                            <td>{customer.environmental_impact}</td>
                            <td>{customer.skin_goals}</td>
                            <td>
                                <button className="see-more-btn" onClick={() => handleSelectCustomer(customer)}>See More</button>
                                <button className="edit-predictions-btn" onClick={handleEditPredictions}>Edit Predictions</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for displaying customer details */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay">
                <button className="close-button" onClick={closeModal}>×</button>
                <h3 className="csp-details">Customer Skincare Personalized Details</h3>
                {selectedCustomer && (
                    <div className="customer-details">
                        <p className="name-email-details">{selectedCustomer.name}</p>
                        <p className="name-email-details">{selectedCustomer.email}</p>

                        <h5>Product Recommendation</h5>
                        <table className="prediction-table">
                            <tbody>
                                {/* Show predictions here */}
                                <tr>
                                    <td><strong>Product Name</strong></td>
                                    <td>{selectedCustomer.predictions.product_name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Brand</strong></td>
                                    <td>{selectedCustomer.predictions.brand}</td>
                                </tr>
                                <tr>
                                    <td><strong>Product Type</strong></td>
                                    <td>{selectedCustomer.predictions.product_type}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ingredients</strong></td>
                                    <td>{selectedCustomer.predictions.ingredients}</td>
                                </tr>
                                <tr>
                                    <td><strong>Price</strong></td>
                                    <td>{selectedCustomer.predictions.price}</td>
                                </tr>
                                <tr>
                                    <td><strong>Benefit</strong></td>
                                    <td>{selectedCustomer.predictions.benefit}</td>
                                </tr>
                                <tr>
                                    <td><strong>How To Use</strong></td>
                                    <td>{selectedCustomer.predictions.how_to_use}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: "center" }}>
                                        <img src={selectedCustomer.predictions.image_URL} alt="Product" width="100" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>

            {/* Modal for editing predictions */}
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                className="modal-content"
                overlayClassName="modal-overlay">
                <button className="close-button" onClick={closeEditModal}>×</button>
                <h3>Edit Product Predictions</h3>
                <div className="customer-details">
                    {updatedPredictions && (
                        <form onSubmit={handleSavePredictions}>
                            <div>
                                <label>Product Name:</label>
                                <input
                                    type="text"
                                    value={updatedPredictions.product_name}
                                    onChange={(e) => setUpdatedPredictions({
                                        ...updatedPredictions,
                                        product_name: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label>Brand:</label>
                                <input
                                    type="text"
                                    value={updatedPredictions.brand}
                                    onChange={(e) => setUpdatedPredictions({
                                        ...updatedPredictions,
                                        brand: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label>Product Type:</label>
                                <input
                                    type="text"
                                    value={updatedPredictions.product_type}
                                    onChange={(e) => setUpdatedPredictions({
                                        ...updatedPredictions,
                                        product_type: e.target.value
                                    })}
                                />
                            </div>
                            {/* Add other fields as needed */}
                            <button type="submit">Save Predictions</button>
                        </form>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default AdminAI;
