import React, { useState } from "react";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const RequestedAssets = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    assetRequests,
    totalCount,
    isAssetRequestsLoading,
    refetchAssetRequests,
  } = useAssetRequests(currentPage, itemsPerPage, search);

  const axiosSecure = useAxiosSecure();

  const handleApprove = async (id) => {
    try {
      await axiosSecure.put(`/handleRequest/${id}`, {
        RequestStatus: "Approved",
        ApprovalDate: new Date().toISOString().split("T")[0],
      });
      refetchAssetRequests();
      toast.success("Request approved successfully.");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request. Please try again.");
    }
  };

  const handleReject = async (request) => {
    try {
      await axiosSecure.put(`/handleRequest/${request._id}`, {
        RequestStatus: "canceled",
        productName: request.AssetName,
      });
      refetchAssetRequests();
      toast.success("Request rejected successfully.");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request. Please try again.");
    }
  };

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="request-list-section pt-28 px-4 max-w-screen-xl mx-auto min-h-[calc(100vh-64px)]">
      <Helmet>
        <title>Requested Assets - ProTracker</title>
      </Helmet>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Request List
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="w-full sm:w-6/12">
          <input
            type="text"
            name="search"
            placeholder="Search by requester name or email"
            className="input input-bordered w-full pl-4 pr-12"
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-[#323232] text-white">
            <tr>
              <th className="text-center">Asset Name</th>
              <th className="text-center">Type</th>
              <th className="text-center">Requester Email</th>
              <th className="text-center">Requester Name</th>
              <th className="text-center">Request Date</th>
              <th className="text-center">Additional Notes</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetRequests.length > 0 ? (
              assetRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-100">
                  <td className="text-center">{request.AssetName}</td>
                  <td className="text-center">{request.AssetType}</td>
                  <td className="text-center">{request.email}</td>
                  <td className="text-center">{request.RequestedBy}</td>
                  <td className="text-center">{request.RequestedDate}</td>
                  <td className="text-center">
                    {request.AdditionalNotes || "n/a"}
                  </td>
                  <td className="text-center">{request.RequestStatus}</td>
                  <td className="text-center">
                    {request.RequestStatus === "Approved" ||
                    request.RequestStatus === "canceled" ||
                    request.RequestStatus === "Returned" ? null : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="btn btn-sm rounded-md bg-[#323232] hover:bg-[#191919] text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request)}
                          className="btn btn-sm rounded-md bg-[#323232] hover:bg-[#191919] text-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 p-4">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <label htmlFor="itemsPerPage" className="text-gray-600">
            Items Per Page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="select select-bordered w-20"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex gap-1">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`btn btn-sm ${
                currentPage === page + 1 ? "bg-[#323232] text-white" : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={currentPage === pages.length}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pages.length))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestedAssets;
