import React from "react";
import Navbar from "./Pages/HomePage/Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
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
