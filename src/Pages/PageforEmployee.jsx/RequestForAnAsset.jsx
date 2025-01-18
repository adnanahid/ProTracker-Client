import React from "react";
import useAssetsOfMyCompany from "../../CustomHooks/useAssetsOfMyCompany";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import toast from "react-hot-toast";

const RequestForAnAsset = () => {
  const { requestedAssets, requestedAssetLoading, requestedAssetsRefetch } =
    useAssetsOfMyCompany();
  const { clientDetails } = useCheckRole();
  const axiosSecure = useAxiosSecure();
  const handleRequest = async (asset) => {
    const assetsInfo = {
      RequestedBy: clientDetails.name,
      email: clientDetails.email,
      hrEmail: clientDetails.hrEmail,
      AssetName: asset.productName,
      AssetType: asset.productType,
      RequestStatus: "Pending",
      RequestedDate: new Date().toISOString().split("T")[0],
    };

    axiosSecure
      .post(`/assets-request-by-employee`, assetsInfo)
      .then(() => {
        toast.success(`Request Sent for ${asset.productName}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error(`You have already requested ${asset.productName}.`);
        } else {
          toast.error(
            error.message || "An error occurred while sending the request"
          );
        }
      });
    requestedAssetsRefetch();
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-28">
      <h1 className="text-4xl font-bold text-center pb-12">Asset List</h1>
      <table className="table md:w10/12 mx-auto">
        {/* Table Head */}
        <thead>
          <tr>
            <th className="text-center">Product Name</th>
            <th className="text-center">Type</th>
            <th className="text-center">Availability </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {requestedAssets.map((asset) => (
            <tr key={asset._id}>
              <td className="text-center">{asset.productName}</td>
              <td className="text-center">{asset.productType}</td>
              <td className="text-center">
                {asset.productQuantity > 0 ? "Available" : "Out of stock"}
              </td>
              <td className="flex gap-2">
                {asset.productQuantity > 0 ? (
                  <button
                    className="btn btn-sm bg-green-600 text-white mx-auto"
                    onClick={() => handleRequest(asset)}
                  >
                    Request for this
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-sm bg-red-600 text-white mx-auto"
                  >
                    Request for this
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestForAnAsset;
