import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCheckRole from "../../CustomHooks/useCheckRole";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { loading } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log(clientDetails);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-lg tracking-widest min-h-screen">
        Loading...
      </div>
    );
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Drawer Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-10 bg-[#191919] text-white p-2 rounded-md"
        onClick={toggleDrawer}
      >
        <span className="material-icons">Dashboard</span>
      </button>

      {/* Drawer */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 bg-[#191919] text-white w-3/4 h-full z-20 p-4"
          onClick={toggleDrawer}
        >
          <div className="mt-12">
            <NavLink
              className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
              to="/dashboard"
            >
              Profile
            </NavLink>
            <NavLink
              className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
              to="/dashboard/overview"
            >
              Overview
            </NavLink>

            {/* for Employee */}
            {clientDetails?.role === "employee" && (
              <>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/myTeamMembers"
                >
                  My Team
                </NavLink>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/myRequestedAssetList"
                >
                  My Requested Assets
                </NavLink>
              </>
            )}

            {/* for HR */}
            {clientDetails?.role === "hr" && (
              <>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/all-asset"
                >
                  Asset List
                </NavLink>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/assetRequests"
                >
                  All Assets Request
                </NavLink>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/my-employee-list"
                >
                  My Employee List
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar for larger screens */}
        <div className="col-span-12 lg:col-span-2 bg-[#191919] text-white min-h-screen p-4 hidden lg:block">
          <div className="mt-12">
            <NavLink
              className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
              to="/dashboard"
            >
              Profile
            </NavLink>
            <NavLink
              className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
              to="/dashboard/overview"
            >
              Overview
            </NavLink>

            {/* for Employee */}
            {clientDetails?.role === "employee" && (
              <>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/myTeamMembers"
                >
                  My Team
                </NavLink>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/myRequestedAssetList"
                >
                  My Requested Assets
                </NavLink>
              </>
            )}

            {/* for HR */}
            {clientDetails?.role === "hr" && (
              <>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/all-asset"
                >
                  Asset List
                </NavLink>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/assetRequests"
                >
                  All Assets Request
                </NavLink>
                <NavLink
                  className="btn btn-sm w-full mb-2 bg-[#191919] text-white"
                  to="/dashboard/my-employee-list"
                >
                  My Employee List
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-10 mt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
