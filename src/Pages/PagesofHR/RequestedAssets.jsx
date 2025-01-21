import React, { useState } from "react";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

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
      <h2 className="text-4xl font-bold text-center mb-12">Request List</h2>
      <div className="text-center mb-12">
        <input
          onChange={(e) => setSearch(e.target.value)}
          defaultValue={search}
          type="text"
          name="search"
          placeholder="search by requester name or email."
          className="input input-bordered w-full"
        />
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Requester Email</th>
            <th>Requester Name</th>
            <th>Request Date</th>
            <th>Additional Note</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assetRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.AssetName}</td>
              <td>{request.AssetType}</td>
              <td>{request.email}</td>
              <td>{request.RequestedBy}</td>
              <td>{request.RequestedDate}</td>
              <td>
                {request.AdditionalNotes ? request.AdditionalNotes : "n/a"}
              </td>
              <td>{request.RequestStatus}</td>
              <td>
                <button
                  onClick={() => handleApprove(request._id)}
                  className="btn-xs rounded-3xl text-white w-16 bg-green-500 mb-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="btn-xs rounded-3xl text-white w-16 bg-red-500"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*pagination */}
      <div className="text-center">
        <div className="join p-10 text-center">
          <button
            className="btn btn-sm mx-1"
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
                currentPage === page + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-sm mx-1"
            onClick={() => {
              if (currentPage < pages.length) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </button>
        </div>
        <label htmlFor="itemsPerPage">Item Per Page</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="p-1 border rounded-xl mx-1"
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
