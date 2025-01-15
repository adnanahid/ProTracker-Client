import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const JoinAsHR = () => {
  const { setUser, signInWithGoogle, userRegistration } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        toast.success("Login Successfully!");
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  const onSubmit = (data) => {
    const { fullName, email, password, dateOfBirth } = data;
    userRegistration(email, password)
      .then((result) => {
        const user = result.user; // Correctly retrieve the user
        setUser(user);
        console.log(user);
        toast.success("Registration Successful!");
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="max-w-screen-md mx-auto py-10 px-6 pt-32">
      <h2 className="text-3xl font-bold text-center mb-8">Join As HR</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[450px] mx-auto rounded"
      >
        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full Name is required" })}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            {...register("companyName", {
              required: "Company Name is required",
            })}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter company name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Company Logo */}
        <div className="mb-4">
          <label
            htmlFor="companyLogo"
            className="block text-sm font-medium text-gray-700"
          >
            Company Logo
          </label>
          <input
            type="file"
            id="companyLogo"
            {...register("companyLogo", {
              required: "Company Logo is required",
            })}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.companyLogo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyLogo.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            {...register("dob", { required: "Date of Birth is required" })}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              errors.dob ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        {/* Package Selection */}
        <div className="mb-6">
          <label
            htmlFor="package"
            className="block text-sm font-medium text-gray-700"
          >
            Select Package
          </label>
          <select
            id="package"
            {...register("package", { required: "Please select a package" })}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              errors.package ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a package</option>
            <option value="5">5 Members for $5</option>
            <option value="10">10 Members for $8</option>
            <option value="20">20 Members for $15</option>
          </select>
          {errors.package && (
            <p className="text-red-500 text-sm mt-1">
              {errors.package.message}
            </p>
          )}
        </div>

        {/* Signup Button */}
        <div className="text-center">
          <div className="mb-6">
            <button
              type="submit"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-black text-white focus:ring-black"
            >
              Sign Up
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-between my-4">
            <span className="w-1/5 border-b lg:w-5/12"></span>
            <span className="text-xs uppercase">or</span>
            <span className="w-1/5 border-b lg:w-5/12"></span>
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
        </div>
      </form>
    </div>
  );
};

export default JoinAsHR;
