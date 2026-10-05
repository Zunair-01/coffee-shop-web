import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isAdmin) {
    return <AdminDashboard />;
  }

  return element;
};

export default PrivateRoute;
