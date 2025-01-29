import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAI = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: "",
        email: "",
        skin_type: "",
        skin_tone: "",
        skin_concern: "",
        environmental_impact: "",
        skin_goals: ""
    });

    // Fetch customer data from the backend
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
        setUpdatedData({
            name: customer.name,
            email: customer.email,
            skin_type: customer.skin_type,
            skin_tone: customer.skin_tone,
            skin_concern: customer.skin_concern,
            environmental_impact: customer.environmental_impact,
            skin_goals: customer.skin_goals
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleUpdateCustomer = async () => {
        if (selectedCustomer) {
            try {
                await axios.put(`http://127.0.0.1:5000/admin/customer/${selectedCustomer._id}`, updatedData);
                alert("Customer updated successfully!");
            } catch (err) {
                console.error("Error updating customer:", err);
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="customer-list">
                <h3>Customer List</h3>
                <ul>
                    {customers.map((customer) => (
                        <li key={customer._id} onClick={() => handleSelectCustomer(customer)}>
                            {customer.name} - {customer.email}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedCustomer && (
                <div className="customer-form">
                    <h3>Edit Customer</h3>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={updatedData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={updatedData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Skin Type:
                            <input
                                type="text"
                                name="skin_type"
                                value={updatedData.skin_type}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Skin Tone:
                            <input
                                type="text"
                                name="skin_tone"
                                value={updatedData.skin_tone}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Skin Concern:
                            <input
                                type="text"
                                name="skin_concern"
                                value={updatedData.skin_concern}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Environmental Impact:
                            <input
                                type="text"
                                name="environmental_impact"
                                value={updatedData.environmental_impact}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Skin Goals:
                            <input
                                type="text"
                                name="skin_goals"
                                value={updatedData.skin_goals}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="button" onClick={handleUpdateCustomer}>
                            Update Customer
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminAI;
