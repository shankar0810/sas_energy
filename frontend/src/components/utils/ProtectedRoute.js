import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;