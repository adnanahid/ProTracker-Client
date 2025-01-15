import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useHr from "../../../CustomHooks/useHr";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const [isHR] = useHr();
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
          {user && !isHR && (
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/join-as-employee">My Assets</NavLink>
              <NavLink to="/join-as-hr">My Team</NavLink>
              <NavLink to="/join-as-hr">Request for An Asset</NavLink>
              <NavLink to="/join-as-hr">Profile</NavLink>
            </div>
          )}
          {user && isHR && (
            <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/join-as-employee">Asset List</NavLink>
              <NavLink to="/join-as-hr">Add an Asset</NavLink>
              <NavLink to="/join-as-hr">All Request</NavLink>
              <NavLink to="/join-as-hr">Add an Employee</NavLink>
              <NavLink to="/join-as-hr">Profile</NavLink>
            </div>
          )}
        </div>
        <a className="btn btn-ghost text-xl">ProTracker</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {!user && (
          <div className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/join-as-employee">Join as Employee</NavLink>
            <NavLink to="/join-as-hr">Join as HR Manager</NavLink>
          </div>
        )}
        {user && !isHR && (
          <div className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/join-as-employee">My Assets</NavLink>
            <NavLink to="/join-as-hr">My Team</NavLink>
            <NavLink to="/join-as-hr">Request for An Asset</NavLink>
            <NavLink to="/join-as-hr">Profile</NavLink>
          </div>
        )}
        {user && isHR && (
          <div className="space-x-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/join-as-employee">Asset List</NavLink>
            <NavLink to="/join-as-hr">Add an Asset</NavLink>
            <NavLink to="/join-as-hr">All Request</NavLink>
            <NavLink to="/join-as-hr">Add an Employee</NavLink>
            <NavLink to="/join-as-hr">Profile</NavLink>
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
