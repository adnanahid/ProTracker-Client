import React, { useContext } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { AuthContext } from "../../Provider/AuthProvider";

const HomePageForEmployee = () => {
  const { myRequestedAssetList } = useMyRequestedAssets();
  const { loading } = useContext(AuthContext);

  // Filter pending requests
  const myPendingRequest = myRequestedAssetList.filter(
    (list) => list.RequestStatus === "Pending"
  );

  //filter monthly request 
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
    <div>
      <h1 className="pt-28 text-4xl font-bold text-center">Employee</h1>

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
    </div>
  );
};

export default HomePageForEmployee;
