import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCheckRole from "../../CustomHooks/useCheckRole";

const Dashboard = () => {
  const { loading } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();
  console.log(clientDetails);
  if (loading) {
    return (
      <div className="flex items-center justify-center text-lg tracking-widest min-h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-[#191919] text-white min-h-screen">
        <div className="px-3 mt-12">
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

          {/* forEmployee */}
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

          {/* forEmployee */}
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
      <div className="col-span-10 mt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
