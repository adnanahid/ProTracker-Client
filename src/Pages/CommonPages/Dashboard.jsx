import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-[#191919] text-white min-h-screen">
        <div className="pl-11">
          <Link to="/">Home</Link>
        </div>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
