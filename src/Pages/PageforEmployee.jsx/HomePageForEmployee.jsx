import React, { useContext } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { AuthContext } from "../../Provider/AuthProvider";

const HomePageForEmployee = () => {
  const { myRequestedAssetList } = useMyRequestedAssets("", "", 1, 10);
  const { loading } = useContext(AuthContext);

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

  if (loading) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto pt-28">
      {/* Pending Requests Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">Pending Requests</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 p-3">
          {myPendingRequest.length > 0 ? (
            myPendingRequest.map((request) => (
              <div
                key={request._id}
                className="card bg-white shadow-md rounded-lg p-4 border"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {request.AssetName}
                </h3>
                <p>
                  <strong>Type:</strong> {request.AssetType}
                </p>
                <p>
                  <strong>Requested Date:</strong> {request.RequestedDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 col-span-full">
              No pending requests found.
            </p>
          )}
        </div>
      </section>

      {/* My Monthly Requests Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">
          My Monthly Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {myMonthlyRequests.length > 0 ? (
            myMonthlyRequests.map((request) => (
              <div
                key={request._id}
                className="card bg-white shadow-md rounded-lg p-4 border"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {request.AssetName}
                </h3>
                <p>
                  <strong>Requested By:</strong> {request.RequestedBy}
                </p>
                <p>
                  <strong>Type:</strong> {request.AssetType}
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
                <p>
                  <strong>Requested Date:</strong> {request.RequestedDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 col-span-full">
              No requests made this month.
            </p>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">Calendar</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <p className="text-center text-gray-500">
            This is where a calendar component will be displayed.
          </p>
          {/* Integrate a calendar library like react-calendar or fullcalendar here */}
        </div>
      </section>

      {/* Events Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Example static data for events */}
          <div className="card bg-white shadow-md rounded-lg p-4 border">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Team Meeting
            </h3>
            <p>
              <strong>Date:</strong> January 25, 2025
            </p>
            <p>
              <strong>Time:</strong> 10:00 AM
            </p>
            <p>
              <strong>Location:</strong> Conference Room A
            </p>
          </div>
          {/* Repeat similar cards for more events */}
        </div>
      </section>

      {/* Notices Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-center">Notices</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              Office will be closed on January 26, 2025, due to maintenance.
            </li>
            <li>Submit your project updates by January 28, 2025.</li>
            <li>
              Training session on "Effective Communication" on February 1, 2025.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePageForEmployee;
