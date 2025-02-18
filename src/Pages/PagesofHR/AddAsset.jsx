import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddAsset = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit Handler
  const onSubmit = async (data) => {
    const addedDate = new Date().toISOString().split("T")[0];
    const HREmail = user?.email;
    const assetData = {
      ...data,
      addedDate,
      HREmail,
      productQuantity: parseInt(data.productQuantity, 10),
    };

    try {
      const response = await axiosSecure.post("/add-asset", assetData);
      console.log(response.data);
      toast.success("Asset added successfully!");
      reset();
      navigate("/all-asset");
    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add asset. Please try again."
      );
    }
  };

  return (
    <div className="p-8 pt-28 min-h-[calc(100vh-64px)] grid place-items-center">
      <Helmet>
        <title>Add an Asset - ProTracker</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg w-full bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Add New Asset</h1>

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            {...register("productName", { required: "Product Name is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-600 text-sm mt-1">{errors.productName.message}</p>
          )}
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <label htmlFor="productType" className="block text-gray-700 text-sm font-bold mb-2">
            Product Type
          </label>
          <select
            id="productType"
            {...register("productType", { required: "Product Type is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select product type</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-Returnable</option>
          </select>
          {errors.productType && (
            <p className="text-red-600 text-sm mt-1">{errors.productType.message}</p>
          )}
        </div>

        {/* Product Quantity */}
        <div className="mb-4">
          <label htmlFor="productQuantity" className="block text-gray-700 text-sm font-bold mb-2">
            Product Quantity
          </label>
          <input
            id="productQuantity"
            type="number"
            {...register("productQuantity", {
              required: "Product Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product quantity"
          />
          {errors.productQuantity && (
            <p className="text-red-600 text-sm mt-1">{errors.productQuantity.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#191919] text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
