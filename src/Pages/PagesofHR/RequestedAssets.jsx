import React from "react";
import useAssetRequests from "../../CustomHooks/useAllAssetRequest";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";

const RequestedAssets = () => {
  const { assetRequests, isAssetRequestsLoading, refetchAssetRequests } =
    useAssetRequests();
  const axiosSecure = useAxiosSecure();

  if (isAssetRequestsLoading) {
    return <div>Loading requests...</div>;
  }

  const handleApprove = async (id) => {
    try {
      await axiosSecure.put(`/handleRequest/${id}`, {
        RequestStatus: "approved",
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

  return (
    <div className="request-list-section pt-28">
      <h2 className="text-4xl font-bold text-center mb-12">Request List</h2>
      <table className="table max-w-screen-lg mx-auto">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Requester Email</th>
            <th>Requester Name</th>
            <th>Request Date</th>
            {/* <th>Additional Note</th> */}
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
              {/* <td>-</td>  */}
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
    </div>
  );
};

export default RequestedAssets;
