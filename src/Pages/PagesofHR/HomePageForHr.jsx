import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAllAssets from "../../CustomHooks/useAllAssets";
import { Helmet } from "react-helmet-async";
import "react-calendar/dist/Calendar.css";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import toast from "react-hot-toast";
import useNotice from "../../CustomHooks/useNotice";
import useTodo from "../../CustomHooks/useTodo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CalendarSection from "../CommonPages/Components/CalenderSection";

const HomePageForHr = () => {
  const { assetRequests } = useAssetRequests(1, 10, "");
  const { assets } = useAllAssets(1, 10, "", "", "");
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const { notice, noticeRefetch } = useNotice();
  const { todo, todoRefetch } = useTodo();

  console.log(notice);

  // pending for return
  const pendingToReturn = assetRequests?.filter(
    (asset) =>
      asset.RequestStatus === "Approved" && asset.AssetType === "returnable"
  );
  // PendingAssets
  const PendingAssets = assetRequests
    ?.filter((asset) => asset.RequestStatus === "Pending")
    .slice(-5);

  // Top requested assets logic
  const assetCounts = assetRequests.reduce((acc, asset) => {
    acc[asset.AssetName] = (acc[asset.AssetName] || 0) + 1;
    return acc;
  }, {});

  const sortedAssets = Object.entries(assetCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const topAssets = sortedAssets.slice(0, 4);

  // Limited Stock
  const limitedStock = assets?.filter((asset) => asset.productQuantity < 10);

  const returnableCount =
    assetRequests?.filter((asset) => asset.AssetType === "returnable").length ||
    0;

  const nonReturnableCount =
    assetRequests?.filter((asset) => asset.AssetType === "non-returnable")
      .length || 0;

  const data01 = [
    { name: "Returnable", value: returnableCount },
    { name: "Non-Returnable", value: nonReturnableCount },
  ];

  //handle add notice
  const handleAddNotice = async (e) => {
    e.preventDefault();
    const notice = e.target.notice.value;
    const response = await axiosSecure.post("/add-notice", {
      notice,
      by: clientDetails?.email,
    });
    if (response.data.acknowledged) {
      e.target.reset();
      noticeRefetch();
      toast.success("Notice sent");
    } else {
      toast.error("Failed to send notice");
    }
  };

  const [taskInput, setTaskInput] = useState("");

  // Add task function
  const addTask = () => {
    if (taskInput.trim()) {
      axiosSecure
        .post("/todo", { email: clientDetails.email, text: taskInput })
        .then((response) => {
          todoRefetch(); // Refetch tasks after adding a new one
          setTaskInput(""); // Clear the input field
          toast.success("Task added");
        })
        .catch((error) => {
          console.error("There was an error adding the task!", error);
          toast.error("Failed to add task");
        });
    }
  };

  // Delete task function
  const deleteTask = (taskId) => {
    axiosSecure
      .delete(`/todo/${taskId}`)
      .then(() => {
        todoRefetch(); // Refetch tasks after deleting one
        toast.success("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      });
  };

  return (
    <div className="">
      <Helmet>
        <title>Home - ProTracker</title>
      </Helmet>

      <div className="bg-[#191919] text-white flex flex-col items-center justify-center text-center px-6 min-h-[580px] pt-16">
        <motion.h1
          className="text-4xl md:text-5xl font-semibold mb-4 tracking-widest"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome, {clientDetails.fullName}!
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-gray-300 max-w-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Stay updated with your tasks, meetings, and company news. Let's make
          today productive!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Link
            to={"/dashboard"}
            className="btn bg-white text-black px-6 text-lg rounded-xl"
          >
            View Dashboard
          </Link>
        </motion.div>
      </div>

      {/* Asset Type Distribution */}
      <section className="max-w-screen-xl mx-auto px-4 mt-28 grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-3xl font-semibold text-center">
            Asset Type Distribution
          </h1>
          <div className="flex justify-center">
            {data01.length > 0 &&
            (data01[0].value > 0 || data01[1].value > 0) ? (
              <div className="w-[250px] md:w-[600px] h-[400px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive
                      data={data01}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#191919"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No data available for asset type distribution.
              </p>
            )}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold text-center">Calendar</h1>
          <CalendarSection></CalendarSection>
        </div>
      </section>

      <section className="max-w-screen-lg mx-auto justify-around items-center mt-28 grid grid-cols-6 gap-5">
        {/* Notices Section */}
        <div className="w-full col-span-2">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
            Add Notice
          </h2>
          <form onSubmit={handleAddNotice}>
            <textarea
              type="text"
              name="notice"
              placeholder="Add a new notice"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              type="submit"
              className="w-full p-2 bg-[#191919] text-white rounded-lg"
            >
              Add Notice
            </button>
          </form>
        </div>
        <div className="w-full col-span-4">
          <h2 className="text-3xl font-semibold text-center">Notices</h2>
          <div className="shadow-md rounded-lg p-6 mt-6 bg-[#191919]">
            <ul className="list-disc pl-6 text-white space-y-2">
              {notice.map((notice, index) => (
                <li key={index}>{notice.notice}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pending Asset Requests */}
      <section className="max-w-screen-xl mx-auto px-4 mt-28">
        <h1 className="text-3xl font-semibold text-center">
          Pending Asset Requests
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 ">
          {PendingAssets && PendingAssets.length > 0 ? (
            PendingAssets.map((asset, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md p-4 bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {asset.AssetName}
                </h2>
                <p className="text-gray-700">
                  <strong>By:</strong> {asset.RequestedBy}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {asset.RequestedDate}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No pending asset requests.
            </p>
          )}
        </div>
      </section>

      {/* Limited Stock Section */}
      <section className="max-w-screen-xl mx-auto px-4 mt-28">
        <h1 className="text-3xl font-semibold text-center">Limited Stock</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 ">
          {limitedStock && limitedStock.length > 0 ? (
            limitedStock.map((asset, index) => (
              <div
                key={index}
                className="flex border rounded-lg shadow-md p-4 bg-white flex-col"
              >
                <h2 className="text-xl font-semibold mb-2 flex-grow">
                  {asset.productName}
                </h2>
                <h2 className="text-lg font-semibold mb-2">
                  Available:
                  <span className="text-3xl font-semibold">
                    {asset.productQuantity}
                  </span>
                </h2>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No assets with limited stock.
            </p>
          )}
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 mt-28">
        {/* Top Requested Assets Section */}
        <h1 className="text-3xl font-semibold text-center">
          Top Requested Assets
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
          {topAssets && topAssets.length > 0 ? (
            topAssets.map((asset, index) => (
              <div
                key={index}
                className="flex flex-col border rounded-lg shadow-md p-4 bg-white"
              >
                <h2 className="flex-grow text-xl font-semibold mb-2">
                  {asset.name}
                </h2>
                <p className="text-gray-700">
                  <strong>Requests:</strong>{" "}
                  <span className="text-4xl font-bold">{asset.count}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No top requested assets available.
            </p>
          )}
        </div>
      </section>

      {/* To-Do List Section */}
      <div className="md:col-span-7 shadow-lg rounded-lg p-6 bg-white max-w-screen-lg mx-auto px-4 mt-28">
        {/* Flex container for the input and task list */}
        <div className="flex space-x-6">
          {/* Input for adding tasks */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
              Add To-Do
            </h2>
            <textarea
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a new task..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={addTask}
              className="w-full p-2 bg-[#191919] text-white rounded-lg"
            >
              Add Task
            </button>
          </div>

          {/* Task list */}
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-semibold text-center mb-4">My Tasks</h3>
            <div className="space-y-4">
              {todo?.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-md"
                >
                  <span>{task.text}</span>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto px-4 mt-28">
        <h1 className="text-3xl font-semibold text-center">
          Pending to return
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
          {pendingToReturn && pendingToReturn.length > 0 ? (
            pendingToReturn.map((asset, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md p-4 bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {asset.AssetName}
                </h2>
                <p className="text-gray-700">
                  <strong>By:</strong> {asset.RequestedBy}
                </p>
                <p className="text-gray-700 overflow-hidden">
                  <strong>email:</strong> {asset.email}
                </p>
                <p className="text-gray-700">
                  <strong>Req. Date:</strong> {asset.RequestedDate}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No pending to return asset.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePageForHr;
