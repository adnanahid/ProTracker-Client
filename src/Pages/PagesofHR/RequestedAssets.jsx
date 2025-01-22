import React, { useState } from "react";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
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

  const handleReject = async (id) => {
    try {
      await axiosSecure.put(`/handleRequest/${id}`, {
        RequestStatus: "canceled",
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
    <div className="request-list-section pt-28 max-w-screen-lg mx-auto">
      <Helmet>
        <title>Requested Assets - ProTracker</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-center mb-12">Request List</h2>

      <div className="text-center mb-12 w-6/12 mx-auto">
        <input
          onChange={(e) => setSearch(e.target.value)}
          defaultValue={search}
          type="text"
          name="search"
          placeholder="Search by requester name or email"
          className="input input-bordered w-full"
        />
      </div>

      <div className="overflow-x-auto rounded-md shadow-xl">
        <table className="table w-full rounded-xl shadow-lg">
          <thead className="bg-[#323232] text-white">
            <tr>
              <th className="text-center">Asset Name</th>
              <th className="text-center">Asset Type</th>
              <th className="text-center">Requester Email</th>
              <th className="text-center">Requester Name</th>
              <th className="text-center">Request Date</th>
              <th className="text-center">Additional Note</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetRequests.length > 0 ? (
              assetRequests.map((request) => (
                <tr key={request._id}>
                  <td className="text-center">{request.AssetName}</td>
                  <td className="text-center">{request.AssetType}</td>
                  <td className="text-center">{request.email}</td>
                  <td className="text-center">{request.RequestedBy}</td>
                  <td className="text-center">{request.RequestedDate}</td>
                  <td className="text-center">
                    {request.AdditionalNotes ? request.AdditionalNotes : "n/a"}
                  </td>
                  <td className="text-center">{request.RequestStatus}</td>
                  <td className="text-center">
                    {request.RequestStatus === "Approved" ||
                    request.RequestStatus === "canceled" ? null : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="btn btn-xs rounded-md text-white w-16 bg-[#323232] hover:bg-[#4b4b4b]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="btn btn-xs rounded-md text-white w-16 bg-[#323232] hover:bg-[#4b4b4b]"
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
                <td colSpan="8" className="text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="text-center mt-6">
        <div className="join p-4 text-center">
          <button
            className="btn btn-sm mx-1"
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`btn btn-sm mx-1 ${
                currentPage === page + 1 ? "bg-[#323232] text-white" : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-sm mx-1"
            disabled={currentPage === pages.length}
            onClick={() => {
              if (currentPage < pages.length) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </button>
        </div>

        <label htmlFor="itemsPerPage">Items Per Page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="p-2 border rounded-xl mx-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default RequestedAssets;
