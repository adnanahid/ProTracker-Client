import React, { useState } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { Helmet } from "react-helmet-async";
import useNotice from "../../CustomHooks/useNotice";
import useTodo from "../../CustomHooks/useTodo";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import toast from "react-hot-toast";
import CalendarSection from "../CommonPages/Components/CalenderSection";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAssetsOfMyCompany from "../../CustomHooks/useAssetsOfMyCompany";
import {
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Rectangle,
} from "recharts";

const RequestCard = ({ request }) => (
  <div className="card bg-white shadow-md rounded-lg p-4 border">
    <h3 className="text-xl font-bold text-gray-800 mb-2">
      {request.AssetName}
    </h3>
    <p>
      <strong>Type:</strong> {request.AssetType}
    </p>
    <p>
      <strong>Date:</strong> {request.RequestedDate}
    </p>
    <p>
      <strong>Status:</strong>{" "}
      <span
        className={`${
          request.RequestStatus === "Approved"
            ? "text-green-500"
            : request.RequestStatus === "Pending"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {request.RequestStatus}
      </span>
    </p>
  </div>
);

const HomePageForEmployee = () => {
  const { myRequestedAssetList } = useMyRequestedAssets("", "", 1, 10);
  const { todo, todoRefetch } = useTodo();
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const { notice } = useNotice();
  const { requestedAssets } = useAssetsOfMyCompany(1, 100, "", "");

  console.log(requestedAssets);

  // pending for return
  const pendingToReturn = (myRequestedAssetList ?? []).filter(
    (asset) =>
      asset.RequestStatus === "Approved" && asset.AssetType === "returnable"
  );

  console.log(pendingToReturn);

  // Filter pending requests
  const myPendingRequest = myRequestedAssetList.filter(
    (list) => list.RequestStatus === "Pending"
  );

  // Filter monthly requests
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const myMonthlyRequests = myRequestedAssetList
    .filter((request) => {
      const requestDate = new Date(request.RequestedDate);
      return (
        requestDate.getMonth() === currentMonth &&
        requestDate.getFullYear() === currentYear
      );
    })
    .sort((a, b) => new Date(b.RequestedDate) - new Date(a.RequestedDate));

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Add task function
  const addTask = () => {
    if (taskInput.trim()) {
      axiosSecure
        .post("/todo", { email: clientDetails.email, text: taskInput })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setTaskInput("");
          todoRefetch();
          toast.success("Todo added");
        })
        .catch((error) => {
          console.error("There was an error adding the task!", error);
        });
    }
  };

  // Delete task function
  const deleteTask = (taskId) => {
    axiosSecure
      .delete(`/todo/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully");
        todoRefetch();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      });
  };

  const formattedData = requestedAssets
    ? requestedAssets.map((asset) => ({
        name: asset.productName, // Correctly accessing productName from each asset
        product_quantity: asset.productQuantity, // Correctly accessing productQuantity
      }))
    : [];

  return (
    <div className="pt-16">
      <Helmet>
        <title>Home - ProTracker</title>
      </Helmet>

      <div className="bg-[#191919] text-white flex flex-col items-center justify-center text-center px-6 min-h-[500px]">
        <motion.h1
          className="text-4xl md:text-5xl font-semibold mb-4 tracking-widest"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome, {clientDetails.name}!
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

      <section className="max-w-screen-lg mx-auto mt-28 grid grid-cols-1 md:grid-cols-7 gap-10">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-semibold text-center">Notices</h2>
          <div className="shadow-md rounded-lg p-6 mt-6 bg-[#191919]">
            <ul className="list-disc pl-6 text-white space-y-2">
              {notice.map((notice, index) => (
                <li key={index}>{notice.notice}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Calender Section */}
        <div className="md:col-span-3">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-5">
            Calender
          </h2>
          <div className="rounded-lg w-10/12 mx-auto">
            <CalendarSection></CalendarSection>
          </div>
        </div>
      </section>

      {/* To-Do List Section */}
      <div className="md:col-span-7 shadow-lg rounded-lg p-6 bg-white mt-28 max-w-screen-lg mx-auto">
        {/* Flex container for the input and task list */}
        <div className="flex items-center space-x-6">
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
              Add ToDo
            </button>
          </div>

          {/* Task list */}
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-semibold text-center mb-4">My Tasks</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {todo?.map((task, index) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center p-4 border rounded-lg  shadow-md bg-[#191919]"
                >
                  <div className="text-white">
                    <span>{index + 1}. </span>
                    <span>{task.text}</span>
                  </div>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* My Assets Requests Section */}
      <section className="mt-28 max-w-screen-xl mx-auto ">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          My Requested Assets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myRequestedAssetList.length > 0 ? (
            myRequestedAssetList.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 col-span-full">
              You have no pending requests! Enjoy your day.
            </p>
          )}
        </div>
      </section>

      {/* Pending Requests Section */}
      <section className="mt-28 max-w-screen-xl mx-auto ">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Pending Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myPendingRequest.length > 0 ? (
            myPendingRequest.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 col-span-full">
              You have no pending requests! Enjoy your day.
            </p>
          )}
        </div>
      </section>

      <section className="mt-28 max-w-screen-xl mx-auto ">
        {/* My Monthly Requests Section */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          My Monthly Requests
        </h2>
        {myMonthlyRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {myMonthlyRequests.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500 pt-20">
            No requests made this month.
          </p>
        )}
      </section>

      <section className="max-w-screen-xl mx-auto mt-28">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Pending to Return
        </h1>
        <div className="grid grid-cols-4 gap-5">
          {pendingToReturn.map((pending, idx) => (
            <RequestCard key={idx} request={pending}></RequestCard>
          ))}
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto mt-28 font-semibold h-[400px] md:pr-10">
        <h1 className="text-3xl text-center mb-6">BarChart</h1>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="product_quantity"
              fill="#191919"
              activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default HomePageForEmployee;
