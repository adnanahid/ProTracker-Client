import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-[#191919] text-white min-h-screen">
        <div className="px-3 mt-12">
          <NavLink className="btn btn-sm w-full mb-2 bg-[#191919] text-white" to="/">Home</NavLink> <br />
          <NavLink className="btn btn-sm w-full mb-2 bg-[#191919] text-white" to="/dashboard">Profile</NavLink> <br />
          <NavLink className="btn btn-sm w-full mb-2 bg-[#191919] text-white" to="/dashboard/overview">Overview</NavLink> <br />
        </div>
      </div>
      <div className="col-span-10 mt-12">
        <h1 className="text-4xl tracking-widest font-semibold text-center pb-12">
          Dashboard
        </h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
