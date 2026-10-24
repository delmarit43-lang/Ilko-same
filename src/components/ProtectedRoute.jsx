import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin access all by default based on user request ("admin ku ha wada arko isagu")
  if (user?.role === 'admin') {
    return children;
  }

  // Check if user's role is in the allowed list
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect un-authorized user to their own dashboard or home
    if (user?.role === 'doctor') return <Navigate to="/doctor-dashboard" replace />;
    if (user?.role === 'patient') return <Navigate to="/patient-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
