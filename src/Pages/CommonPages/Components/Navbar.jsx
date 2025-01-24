import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCheckRole from "../../../CustomHooks/useCheckRole";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();

  return (
    <div className="navbar fixed z-10 text-[#191919] bg-white px-5">
      <div className="navbar-start z-20">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RxHamburgerMenu />
          </div>
          {!user && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
              <NavLink className="font-semibold text-lg" to="/join-as-employee">Join as Employee</NavLink>
              <NavLink className="font-semibold text-lg" to="/join-as-hr">Join as HR Manager</NavLink>
            </div>
          )}
          {clientDetails?.role === "n/a" && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
              <NavLink className="font-semibold text-lg" to="/profile">Profile</NavLink>
            </div>
          )}
          {clientDetails?.role === "employee" && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
              <NavLink className="font-semibold text-lg" to="/myRequestedAssetList">My Requested Assets</NavLink>
              <NavLink className="font-semibold text-lg" to="/myTeamMembers">My Team</NavLink>
              <NavLink className="font-semibold text-lg" to="/request-for-an-assets">Request for Asset</NavLink>
              <NavLink className="font-semibold text-lg" to="/profile">Profile</NavLink>
            </div>
          )}
          {clientDetails?.role === "hr" && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
              <NavLink className="font-semibold text-lg" to="/all-asset">Asset List</NavLink>
              <NavLink className="font-semibold text-lg" to="/add-asset">Add an Asset</NavLink>
              <NavLink className="font-semibold text-lg" to="/assetRequests">All Assets Request</NavLink>
              <NavLink className="font-semibold text-lg" to="/all-employees">Add an Employee</NavLink>
              <NavLink className="font-semibold text-lg" to="/my-employee-list">My Employee List</NavLink>
              <NavLink className="font-semibold text-lg" to="/profile">Profile</NavLink>
            </div>
          )}
        </div>
        {clientDetails ? (
          clientDetails?.companyLogo ? (
            <div className="avatar">
              <div className="w-10 rounded-full object-cover">
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
          <a className="text-2xl font-semibold">ProTracker</a>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        {!user && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
            <NavLink className="font-semibold text-lg" to="/join-as-employee">Join as Employee</NavLink>
            <NavLink className="font-semibold text-lg" to="/join-as-hr">Join as HR Manager</NavLink>
          </div>
        )}
        {clientDetails?.role === "n/a" && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
            <NavLink className="font-semibold text-lg" to="/profile">Profile</NavLink>
          </div>
        )}
        {clientDetails?.role === "employee" && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
            <NavLink className="font-semibold text-lg" to="/myRequestedAssetList">My Requested Assets</NavLink>
            <NavLink className="font-semibold text-lg" to="/myTeamMembers">My Team</NavLink>
            <NavLink className="font-semibold text-lg" to="/request-for-an-assets">Request for Asset</NavLink>
            <NavLink className="font-semibold text-lg" to="/profile">Profile</NavLink>
          </div>
        )}
        {clientDetails?.role === "hr" && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">Home</NavLink>
            <NavLink className="font-semibold text-lg" to="/all-asset">Asset List</NavLink>
            <NavLink className="font-semibold text-lg" to="/add-asset">Add an Asset</NavLink>
            <NavLink className="font-semibold text-lg" to="/assetRequests">All Assets Request</NavLink>
            <NavLink className="font-semibold text-lg" to="/all-employees">Add an Employee</NavLink>
            <NavLink className="font-semibold text-lg" to="/my-employee-list">My Employee List</NavLink>
            <NavLink className="font-semibold text-lg" to="/profile">Profile</NavLink>
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
            <div className="flex items-center gap-5">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>
              </div>
              {/* <p className="text-sm">{user.displayName}</p> */}
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
