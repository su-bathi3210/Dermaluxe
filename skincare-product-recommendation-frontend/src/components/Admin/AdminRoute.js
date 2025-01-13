// Example of AdminRoute component (if you need one)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const isAdmin = true; // Replace with your actual logic (e.g., check if the user is an admin)

    if (!isAdmin) {
        // Redirect non-admin users to the login page or another page
        return <Navigate to="/login" />;
    }

    // Allow access to the admin routes
    return <Outlet />;
};

export default AdminRoute;
