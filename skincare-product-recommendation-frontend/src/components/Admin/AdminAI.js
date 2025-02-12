import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import AdminNav from './AdminNav';
import "./Admin.css";

Modal.setAppElement("#root"); // Ensures accessibility

const AdminAI = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCustomer(null);
    };

    return (
        <div className="admin-dashboard">
            <AdminNav />
            <h2 className="admin-personalized-heading">Skincare Personalized System</h2>
            <p className="admin-query-paragraph">
                At Dermaluxe Skincare, our admin panel offers a seamless interface for efficiently managing customer inquiries.
                This feature ensures that customer concerns are addressed promptly and effectively, enhancing the overall customer experience.
            </p>

            <h3 className="customer-heading">Customer List</h3>
            <div className="customer-list">
                {customers.map((customer) => (
                    <div key={customer._id} className="customer-box" onClick={() => handleSelectCustomer(customer)}>
                        <h4>{customer.name}</h4>
                        <p> {customer.email}</p>
                        <p><strong>Skin Type:</strong> {customer.skin_type}</p>
                        <p><strong>Skin Tone:</strong> {customer.skin_tone}</p>
                        <p><strong>Skin Concern:</strong> {customer.skin_concern}</p>
                        <p><strong>Environmental Impact:</strong> {customer.environmental_impact}</p>
                        <p><strong>Skin Goals:</strong> {customer.skin_goals}</p>
                        
                    </div>
                ))}
            </div>

            {/* Modal for Viewing Customer Details */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-content" overlayClassName="modal-overlay">
                <button className="close-button" onClick={closeModal}>×</button>
                <h3>Customer Skincare personalized Details</h3>
                {selectedCustomer && (
                    <div className="customer-details">
                        <p><strong>Name:</strong> {selectedCustomer.name}</p>
                        <p><strong>Email:</strong> {selectedCustomer.email}</p>

                        {/* Display Prediction Details */}
                        <h5>Predictions:</h5>
                        <p><strong>Product Name:</strong> {selectedCustomer.predictions.product_name}</p>
                        <p><strong>Brand:</strong> {selectedCustomer.predictions.brand}</p>
                        <p><strong>Product Type:</strong> {selectedCustomer.predictions.product_type}</p>
                        <p><strong>Ingredients:</strong> {selectedCustomer.predictions.ingredients}</p>
                        <p><strong>Price:</strong> {selectedCustomer.predictions.price}</p>
                        <p><strong>Benefit:</strong> {selectedCustomer.predictions.benefit}</p>
                        <p><strong>How To Use:</strong> {selectedCustomer.predictions.how_to_use}</p>
                        <img src={selectedCustomer.predictions.image_URL} alt="Product" width="100" />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminAI;
