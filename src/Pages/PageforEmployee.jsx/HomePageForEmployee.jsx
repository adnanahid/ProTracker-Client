import React, { useContext, useState } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Calendar styling
import useNotice from "../../CustomHooks/useNotice";
import useTodo from "../../CustomHooks/useTodo";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import toast from "react-hot-toast";

const RequestCard = ({ request }) => (
  <div className="card bg-white shadow-md rounded-lg p-4 border">
    <h3 className="text-xl font-bold text-gray-800 mb-2">
      {request.AssetName}
    </h3>
    <p>
      <strong>Type:</strong> {request.AssetType}
    </p>
    <p>
      <strong>Requested Date:</strong> {request.RequestedDate}
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
  const { loading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { todo, todoRefetch } = useTodo();
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

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

  const events = [
    {
      title: "Team Meeting",
      date: "January 25, 2025",
      time: "10:00 AM",
      location: "Conference Room A",
    },
    {
      title: "Project Deadline",
      date: "January 30, 2025",
      time: "5:00 PM",
      location: "Online",
    },
  ];

  const { notice } = useNotice();

  if (loading) {
    return <div>Loading ....</div>;
  }

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
        toast.error("Todo Removed");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-28">
      <Helmet>
        <title>Home - ProTracker</title>
      </Helmet>

      {/* Pending Requests Section */}
      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Pending Requests Section */}
          <div className="md:col-span-9">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
              Pending Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>

          {/* Calendar Section */}
          <div className="md:col-span-3">
            <div className="rounded-lg">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
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

      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Notices Section */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Notices
            </h2>
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <ul className="list-disc pl-6 text-gray-700 space-y-2 h-[150px] overflow-y-auto">
                {notice.map((notice, index) => (
                  <li key={index}>{notice.notice}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* My Monthly Requests Section */}
          <div className="md:col-span-7 shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
              My Monthly Requests
            </h2>
            {myMonthlyRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myMonthlyRequests.map((request) => (
                  <RequestCard key={request._id} request={request} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-gray-500 pt-20">
                No requests made this month.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Upcoming Events
        </h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="card bg-white shadow-lg rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No upcoming events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePageForEmployee;
