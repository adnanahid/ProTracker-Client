import { Navigate, useLocation } from "react-router-dom";
import useHr from "../CustomHooks/useHr";

const HRRoute = ({ children }) => {
  const [isHR, isHRLoading] = useHr();
  const location = useLocation();
  if (isHR) return children;
  else return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default HRRoute;
