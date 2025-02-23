import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(user);

  if (user?.email) {
    return children;
  }

  if (loading || !!user?.email) {
    return <div>loading...</div>;
  }

  return user?.email ? (
    children
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
};

export default PrivateRoute;
