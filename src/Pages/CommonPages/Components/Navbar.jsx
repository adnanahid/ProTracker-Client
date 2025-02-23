import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCheckRole from "../../../CustomHooks/useCheckRole";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`navbar fixed z-10 text-[#191919] bg-white px-5 tracking-wide top-0 shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="navbar-start z-20">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RxHamburgerMenu />
          </div>
          {!user && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white">
              <NavLink className="font-semibold text-lg" to="/">
                Home
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/join-as-employee">
                Join as Employee
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/join-as-hr">
                Join as HR Manager
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/community">
                Community
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
                Contact Us
              </NavLink>
            </div>
          )}
          {clientDetails?.role === "n/a" && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white">
              <NavLink className="font-semibold text-lg" to="/">
                Home
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/profile">
                Profile
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/community">
                Community
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
                Contact Us
              </NavLink>
            </div>
          )}
          {clientDetails?.role === "employee" && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white">
              <NavLink className="font-semibold text-lg" to="/">
                Home
              </NavLink>
              <NavLink
                className="font-semibold text-lg"
                to="/request-for-an-assets"
              >
                Request for Asset
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/community">
                Community
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
                Contact Us
              </NavLink>
            </div>
          )}
          {clientDetails?.role === "hr" && (
            <div className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white">
              <NavLink className="font-semibold text-lg" to="/">
                Home
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/add-asset">
                Add an Asset
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/all-employees">
                Add an Employee
              </NavLink>
              <NavLink className="font-semibold text-lg" to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/community">
                Community
              </NavLink>
              <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
                Contact Us
              </NavLink>
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
            <a className="text-2xl font-semibold">ProTracker</a>
          )
        ) : (
          <a className="text-2xl font-semibold">ProTracker</a>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        {!user && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">
              Home
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/join-as-employee">
              Join as Employee
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/join-as-hr">
              Join as HR Manager
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/community">
              Community
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
              Contact Us
            </NavLink>
          </div>
        )}
        {clientDetails?.role === "n/a" && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">
              Home
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/profile">
              Profile
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/community">
              Community
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
              Contact Us
            </NavLink>
          </div>
        )}
        {clientDetails?.role === "employee" && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">
              Home
            </NavLink>
            <NavLink
              className="font-semibold text-lg"
              to="/request-for-an-assets"
            >
              Request for Asset
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/community">
              Community
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
              Contact Us
            </NavLink>
          </div>
        )}
        {clientDetails?.role === "hr" && (
          <div className="space-x-5">
            <NavLink className="font-semibold text-lg" to="/">
              Home
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/add-asset">
              Add an Asset
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/all-employees">
              Add an Employee
            </NavLink>
            <NavLink className="font-semibold text-lg" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/community">
              Community
            </NavLink>
            <NavLink className="font-semibold text-lg pb-5" to="/contact-us">
              Contact Us
            </NavLink>
          </div>
        )}
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center space-x-5">
            <button
              onClick={() => {
                userLogOut();
                navigate("/");
              }}
              className="btn bg-black text-white btn-sm rounded-lg"
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
          <Link
            to="/login"
            className="btn bg-black text-white btn-sm rounded-lg"
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
