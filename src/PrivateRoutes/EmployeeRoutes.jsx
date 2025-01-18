import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const EmployeeRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // Always call hooks at the top

  if (loading) {
    return <div>loading...</div>;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
};

export default EmployeeRoutes;
