import { Navigate, useLocation } from "react-router-dom";
import useCheckRole from "../CustomHooks/useCheckRole";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const HRRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { clientDetails, isReloading, isError, error, refetch } =
    useCheckRole();
  const location = useLocation();

  const isLoading = isReloading || loading;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return clientDetails?.role === "hr" ? (
    children
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
};

export default HRRoute;
