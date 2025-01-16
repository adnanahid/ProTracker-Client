import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../CustomHooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

const AddAsset = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit Handler
  const onSubmit = (data) => {
    const addedDate = new Date().toISOString().split("T")[0];
    const HREmail = user?.email;
    const assetData = { ...data, addedDate, HREmail };

    axiosPublic
      .post("/add-asset", assetData)
      .then((response) => {
        console.log(response.data);
        toast.success("Asset added successfully!");
        navigate("/all-asset");
      })
      .catch((error) => {
        console.error("Error adding asset:", error);
        toast.error("Failed to add asset. Please try again.");
      });
  };

  return (
    <div className="p-8 pt-28">
      <h1 className="text-4xl font-bold text-center mb-8">Add New Asset</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
      >
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Type
          </label>
          <select
            {...register("productType", {
              required: "Product Type is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select product type</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Stationery">Stationery</option>
          </select>
          {errors.productType && (
            <p className="text-red-600 text-sm mt-1">
              {errors.productType.message}
            </p>
          )}
        </div>

        {/* Product Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Quantity
          </label>
          <input
            type="number"
            {...register("productQuantity", {
              required: "Product Quantity is required",
              min: {
                value: 1,
                message: "Quantity must be at least 1",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product quantity"
          />
          {errors.productQuantity && (
            <p className="text-red-600 text-sm mt-1">
              {errors.productQuantity.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
