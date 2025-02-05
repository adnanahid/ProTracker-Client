import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../CustomHooks/UseAxiosPublic";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const imageHostingKey = import.meta.env.VITE_ImgBB_Api;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const JoinAsHR = () => {
  const { setUser, userRegistration, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      //for company logo
      const formData = new FormData();
      formData.append("image", data.companyLogo[0]);
      const logoResponse = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const companyLogoUrl = logoResponse.data.data.url;

      //fot userPhoto
      const userPhotoFormData = new FormData();
      userPhotoFormData.append("image", data.userPhoto[0]);
      const userPhotoResponse = await axiosPublic.post(
        imageHostingApi,
        userPhotoFormData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      const userPhotoUrl = userPhotoResponse.data.data.url;

      // Proceed with user registration (after image upload)
      const HRInfo = {
        fullName: data.fullName,
        userPhoto: userPhotoUrl,
        companyName: data.companyName,
        companyLogo: companyLogoUrl,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dob,
        packageLimit: parseInt(data.package.split("for")[0], 10),
        packageAmount: parseInt(data.package.split("for")[1], 10),
        role: "hr",
      };

      // Call userRegistration
      userRegistration(data.email, data.password)
        .then((result) => {
          const user = result.user;
          updateUserProfile({
            displayName: data.fullName,
            photoURL: userPhotoUrl,
          });
          setUser(user);
          toast.success("Registration Successful!");
          navigate("/payment", { state: HRInfo });
        })
        .catch(() => {
          toast.error("An error occurred. Please try again.");
        });
    } catch (error) {
      console.error("Image upload failed: ", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto py-10 px-6 pt-32">
      <Helmet>
        <title>Join as HR - ProTracker</title>
      </Helmet>
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

        {/* userPhoto Logo */}
        <div className="mb-4">
          <label
            htmlFor="userPhoto"
            className="block text-sm font-medium text-gray-700"
          >
            User Photo
          </label>
          <input
            type="file"
            id="userPhoto"
            {...register("userPhoto", {
              required: "Company Logo is required",
            })}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.userPhoto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userPhoto.message}
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
            <option value="5for5">5 Members for $5</option>
            <option value="10for8">10 Members for $8</option>
            <option value="20for15">20 Members for $15</option>
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
        </div>
      </form>
    </div>
  );
};

export default JoinAsHR;
