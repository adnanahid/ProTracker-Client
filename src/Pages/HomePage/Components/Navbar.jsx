import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar bg-black text-white fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RxHamburgerMenu />
          </div>
          <div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <NavLink>Home</NavLink>
            <NavLink>Join as Employee</NavLink>
            <NavLink>Join as HR Manager</NavLink>
          </div>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="space-x-5">
          <NavLink>Home</NavLink>
          <NavLink>Join as Employee</NavLink>
          <NavLink>Join as HR Manager</NavLink>
        </div>
      </div>
      <div className="navbar-end">
        <Link to="login" className="btn">SingIn</Link>
      </div>
    </div>
  );
};

export default Navbar;
