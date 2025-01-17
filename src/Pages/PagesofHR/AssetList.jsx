import React from "react";
import useAllAssets from "../../CustomHooks/useAllAssets";
import toast from "react-hot-toast";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";

const AssetList = () => {
  const { assets, refetch } = useAllAssets();
  const axiosSecure = useAxiosSecure();

  const handleUpdate = (asset) => {
    console.log(`Update item with ID: ${asset._id}`);
  };

  const handleDelete = (asset) => {
    console.log(`Delete item with ID: ${asset}`);
    axiosSecure.delete(`/delete-asset/${asset._id}`).then((res) => {
      refetch();
      toast.success(`${asset.productName} is deleted`);
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-28">
      <h1 className="text-2xl font-bold mb-12 text-center">Asset List</h1>

      <div className="overflow-x-auto max-w-screen-lg mx-auto">
        {assets && assets.length > 0 ? (
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id}>
                  <td>{asset.productName}</td>
                  <td>{asset.productType}</td>
                  <td>{asset.productQuantity}</td>
                  <td>{asset.addedDate}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm bg-green-600 text-white"
                      onClick={() => handleUpdate(asset)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm bg-red-600 text-white"
                      onClick={() => handleDelete(asset)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No assets found.</p>
        )}
      </div>
    </div>
  );
};

export default AssetList;
