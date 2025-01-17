import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const EmployeeRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>loading...</div>;
  }
  const location = useLocation();
  if (user) return children;
  else {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
};

export default EmployeeRoutes;
