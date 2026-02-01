import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      admin: "/admin/dashboard",
      owner: "/owner/dashboard",
      tenant: "/tenant/dashboard",
    };
    return <Navigate to={dashboardRoutes[userRole] || "/auth"} replace />;
  }

  return children;
};

export default ProtectedRoute;
