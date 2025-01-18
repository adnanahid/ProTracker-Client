import React, { useContext } from "react";
import Navbar from "./Pages/CommonPages/Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";

const App = () => {
  const { user, loading } = useContext(AuthContext);
  // if (loading) return <div>loading...</div>;
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/payment" &&
        location.pathname !== "/join-as-hr" &&
        location.pathname !== "/join-as-employee" && <Navbar />}
      <Outlet></Outlet>
    </div>
  );
};

export default App;
