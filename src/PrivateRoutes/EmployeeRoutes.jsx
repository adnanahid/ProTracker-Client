import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const EmployeeRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user) return children;
  else {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
};

export default EmployeeRoutes;
