import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
