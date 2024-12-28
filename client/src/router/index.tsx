// src/router/index.tsx

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ManagerDashboard from '../pages/ManagerDashboard/ManagerDashboard';
import { AuthContext } from '../context/AuthContext';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            user?.role === 'MANAGER' ? (
              <Navigate to="/manager-dashboard" />
            ) : (
              <Dashboard />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/manager-dashboard"
        element={
          isAuthenticated && user?.role === 'MANAGER' ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;
