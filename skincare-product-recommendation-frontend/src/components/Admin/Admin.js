import React, { useState } from 'react';
import { FiMenu, FiUser, FiClipboard, FiSettings, FiLogOut } from 'react-icons/fi';
import './Admin.css';

import DermaluxeAdmin from '../../images/DermaluxeAdmin.png';


const Admin = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className="admin-container">
            <div className="sidebar">
                <img
                    src={DermaluxeAdmin}
                    alt="Admin Panel"
                    className="sidebar-image"
                />
                <ul>
                    <li className={`sidebar-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>
                        <FiMenu className="icon" /> Dashboard
                    </li>
                    <li className={`sidebar-item ${activeTab === 'Users' ? 'active' : ''}`} onClick={() => setActiveTab('Users')}>
                        <FiUser className="icon" /> Users
                    </li>
                    <li className={`sidebar-item ${activeTab === 'Orders' ? 'active' : ''}`} onClick={() => setActiveTab('Orders')}>
                        <FiClipboard className="icon" /> Orders
                    </li>
                    <li className={`sidebar-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}>
                        <FiSettings className="icon" /> Settings
                    </li>
                </ul>
                <div className="logout" onClick={() => alert('Logging out...')}>
                    <FiLogOut className="icon" /> Logout
                </div>
            </div>

            <div className="main-content">
                <h1 className="heading">{activeTab}</h1>
                <div className="content-box">
                    <p>Welcome to the {activeTab} section.</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;
