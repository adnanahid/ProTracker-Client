import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    console.log("Google login clicked!");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login button clicked!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center pb-8">
          Log in to Your Account
        </h2>
        <form className="mt-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-white px-4 py-2 bg-black rounded-md hover:bg-white border focus:outline-none focus:ring-2 focus:ring-black hover:text-black hover:border"
          >
            Continue
          </button>
          {/* Divider */}
          <div className="flex items-center justify-between my-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <span className="text-xs uppercase">or</span>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 rounded-md border gap-3"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
