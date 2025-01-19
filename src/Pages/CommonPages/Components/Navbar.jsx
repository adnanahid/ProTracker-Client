import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCheckRole from "../../../CustomHooks/useCheckRole";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();

  return (
    <div className="navbar fixed z-10 bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RxHamburgerMenu />
          </div>
          {!user && (
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/join-as-employee">Join as Employee</NavLink>
              <NavLink to="/join-as-hr">Join as HR Manager</NavLink>
            </div>
          )}
          {clientDetails?.role === "n/a" && (
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              request pending
            </div>
          )}
          {clientDetails?.role === "employee" && (
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/myRequestedAssetList">My Requested Assets</NavLink>
              <NavLink to="/join-as-hr">My Team</NavLink>
              <NavLink to="/request-for-an-assets">Request for Asset</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </div>
          )}
          {clientDetails?.role === "hr" && (
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/all-asset">Asset List</NavLink>
              <NavLink to="/add-asset">Add an Asset</NavLink>
              <NavLink to="/assetRequests">All Assets Request</NavLink>
              <NavLink to="/all-employees">Add an Employee</NavLink>
              <NavLink to="/my-employee-list">My Employee List</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </div>
          )}
        </div>
        {clientDetails ? (
          clientDetails?.companyLogo ? (
            <div className="avatar">
              <div className="w-12 rounded-full object-cover">
                <img
                  referrerPolicy="no-referrer"
                  src={clientDetails.companyLogo}
                  alt={clientDetails.companyName}
                />
              </div>
            </div>
          ) : (
            <a className="btn btn-ghost text-xl">Joining Request is Pending</a>
          )
        ) : (
          <a className="btn btn-ghost text-xl">ProTracker</a>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        {!user && (
          <div className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/join-as-employee">Join as Employee</NavLink>
            <NavLink to="/join-as-hr">Join as HR Manager</NavLink>
          </div>
        )}
        {clientDetails?.role === "n/a" && (
          <div className="space-x-5">
            <h3>Request Pending</h3>
            <NavLink to="/">Home</NavLink>
          </div>
        )}
        {clientDetails?.role === "employee" && (
          <div className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/myRequestedAssetList">My Requested Assets</NavLink>
            <NavLink to="/myTeamMembers">My Team</NavLink>
            <NavLink to="/request-for-an-assets">Request for Asset</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>
        )}
        {clientDetails?.role === "hr" && (
          <div className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/all-asset">Asset List</NavLink>
            <NavLink to="/add-asset">Add an Asset</NavLink>
            <NavLink to="/assetRequests">All Assets Request</NavLink>
            <NavLink to="/all-employees">Add an Employee</NavLink>
            <NavLink to="/my-employee-list">My Employee List</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>
        )}
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center space-x-5">
            <button
              onClick={() => userLogOut()}
              className="btn btn-sm rounded-3xl"
            >
              Log Out
            </button>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm rounded-3xl">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
