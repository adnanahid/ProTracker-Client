import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useCheckRole from "../CustomHooks/useCheckRole";

const EmployeeRoutes = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { clientDetails, isReloading } = useCheckRole();
  const location = useLocation();

  const isLoading = isReloading || loading;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return clientDetails?.role === "employee" ? (
    children
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
};

export default EmployeeRoutes;
