import React, { useContext } from "react";
import Navbar from "./Pages/CommonPages/Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";

const App = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="flex items-center justify-center text-lg tracking-widest min-h-screen">
        Loading...
      </div>
    );
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/payment" &&
        location.pathname !== "/join-as-hr" &&
        location.pathname !== "/join-as-employee" && <Navbar />}
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <footer className="footer footer-center tracking-widest mt-28 text-xs md:text-base">
        <aside>
          <p className="mb-2">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Protracker
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default App;
