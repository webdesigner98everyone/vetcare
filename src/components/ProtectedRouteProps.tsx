import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  let user;

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    user = {};
  }

  // Redirigir al login si no hay usuario autenticado
  if (!user.email) return <Navigate to="../Login" replace />;

  // Redirigir a la página principal si el rol no está permitido
  return allowedRoles.includes(user.role) ? <>{children}</> : <Navigate to="../" replace />;
};

export default ProtectedRoute;
