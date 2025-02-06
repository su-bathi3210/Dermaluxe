import React from 'react'
import AdminNav from './AdminNav'
import "./Admin.css";

import Video from '../../images/Video8.mp4';

const Admin = () => {
    return (
        <div>
            <AdminNav />

            <div className="admin-video">
                <video autoPlay loop muted>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

export default Admin