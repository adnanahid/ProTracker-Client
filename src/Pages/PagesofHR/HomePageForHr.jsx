import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAllAssets from "../../CustomHooks/useAllAssets";
import { Helmet } from "react-helmet-async";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import toast from "react-hot-toast";
import useNotice from "../../CustomHooks/useNotice";
import useTodo from "../../CustomHooks/useTodo";

const HomePageForHr = () => {
  const { assetRequests } = useAssetRequests(1, 10, "");
  const { assets } = useAllAssets(1, 10, "", "", "");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const { notice, noticeRefetch } = useNotice();
  const { todo, todoRefetch } = useTodo();

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
    const notice = {
      notice: e.target.notice.value,
      by: clientDetails.email,
    };
    const response = await axiosSecure.post("/add-notice", notice);
    if (response.data.acknowledged) {
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
    <div className="max-w-screen-xl mx-auto px-4">
      <Helmet>
        <title>Home - ProTracker</title>
      </Helmet>

      {/* Asset Type Distribution */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
        <div className="md:col-span-2">
          <h1 className="pt-28 text-3xl font-semibold text-center">
            Asset Type Distribution
          </h1>
          <div className="flex justify-center p-6">
            {data01.length > 0 &&
            (data01[0].value > 0 || data01[1].value > 0) ? (
              <div className="w-full max-w-[600px] h-[400px]">
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
        <div>
          <h1 className="pt-28 text-3xl font-semibold text-center">Calendar</h1>
          <div className="flex justify-center p-6">
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>
        </div>
      </section>

      {/* Pending Asset Requests */}
      <h1 className="pt-28 text-3xl font-semibold text-center">
        Pending Asset Requests
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
        {PendingAssets && PendingAssets.length > 0 ? (
          PendingAssets.map((asset, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{asset.AssetName}</h2>
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
      </section>

      {/* Limited Stock Section */}
      <h1 className="pt-28 text-3xl font-semibold text-center">
        Limited Stock
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
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
      </section>

      {/* Top Requested Assets Section */}
      <h1 className="text-3xl font-semibold text-center mb-6">
        Top Requested Assets
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
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
      </section>

      {/* To-Do List Section */}
      <div className="md:col-span-7 shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Add To-Do
        </h2>

        {/* Flex container for the input and task list */}
        <div className="flex space-x-6">
          {/* Input for adding tasks */}
          <div className="w-full md:w-1/3">
            <input
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
            <h3 className="text-xl font-semibold text-center mb-4">
              Your Tasks
            </h3>
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
    </div>
  );
};

export default HomePageForHr;
