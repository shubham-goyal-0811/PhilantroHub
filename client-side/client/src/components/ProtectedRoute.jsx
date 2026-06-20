import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Route guard for role-based access control on the client.
 *
 *   <ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>
 *
 * - Not authenticated  -> redirect to /login
 * - Wrong role         -> redirect home
 *
 * This is a UX guard only; the server still enforces RBAC on every request.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
