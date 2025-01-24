import React, { useState } from "react";
import useAllAssets from "../../CustomHooks/useAllAssets";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";

const AssetList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [updatedAsset, setUpdatedAsset] = useState({
    productName: "",
    productQuantity: "",
    productType: "",
  });

  const { assets, totalCount, isLoading, isError, error, RefetchAllAssets } =
    useAllAssets(currentPage, itemsPerPage, search, filterBy, sortBy);

  const axiosSecure = useAxiosSecure();

  const handleDelete = (asset) => {
    axiosSecure
      .delete(`/delete-asset-from-assets/${asset._id}`)
      .then((res) => {
        if (res.data.deletedCount === 1) {
          RefetchAllAssets();
          toast.success("Asset deleted successfully.");
        } else {
          toast.error("Failed to delete the asset.");
        }
      })
      .catch(() => {
        toast.error(
          "An error occurred while deleting the asset. Please try again."
        );
      });
  };

  const handleUpdate = (asset) => {
    setSelectedAsset(asset);
    setUpdatedAsset({
      productName: asset.productName,
      productQuantity: asset.productQuantity,
      productType: asset.productType,
    });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAsset(null);
    setUpdatedAsset({ productName: "", productQuantity: "", productType: "" });
  };

  const handleModalSave = () => {
    axiosSecure
      .patch(`/update-asset/${selectedAsset._id}`, updatedAsset)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          RefetchAllAssets();
          toast.success("Asset updated successfully.");
          handleModalClose();
        } else {
          toast.error("Failed to update the asset.");
        }
      })
      .catch(() => {
        toast.error(
          "An error occurred while updating the asset. Please try again."
        );
      });
  };

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="p-4 sm:p-6 min-h-screen pt-28 max-w-screen-xl mx-auto">
      <Helmet>
        <title>Asset List - ProTracker</title>
      </Helmet>

      <h1 className="md:text-4xl text-3xl font-bold mb-8 text-center text-gray-800">
        Asset List
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 max-w-screen-md mx-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by Asset Name"
          className="input input-bordered w-full sm:w-1/2"
        />
        <select
          className="select select-bordered w-full sm:w-1/4"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="">Filter by</option>
          <option value="Available">Available</option>
          <option value="Out-of-stock">Out-of-stock</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-Returnable</option>
        </select>
        <select
          className="select select-bordered w-full sm:w-1/4"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {assets && assets.length > 0 ? (
          <table className="table w-full">
            <thead className="bg-[#323232] text-white">
              <tr>
                <th className="text-center">Product Name</th>
                <th className="text-center">Type</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Date Added</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id} className="border-b hover:bg-gray-100">
                  <td className="text-center p-4 text-gray-700">
                    {asset.productName}
                  </td>
                  <td className="text-center p-4 text-gray-700">
                    {asset.productType}
                  </td>
                  <td className="text-center p-4 text-gray-700">
                    {asset.productQuantity}
                  </td>
                  <td className="text-center p-4 text-gray-700">
                    {asset.addedDate}
                  </td>
                  <td className="text-center p-4 flex justify-center gap-2">
                    <button
                      className="btn btn-sm bg-[#323232] hover:bg-[#191919] text-white"
                      onClick={() => handleUpdate(asset)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm bg-[#323232] hover:bg-[#191919] text-white"
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
          <p className="text-center text-gray-500 py-6">No assets found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="text-center py-6">
        <div className="join flex flex-wrap justify-center">
          <button
            className="btn btn-sm mx-1 bg-[#323232] text-white"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            className="btn btn-sm mx-1 bg-[#323232] text-white"
            disabled={currentPage === pages.length}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pages.length))
            }
          >
            Next
          </button>
        </div>
        <div className="mt-4">
          <label htmlFor="itemsPerPage" className="mr-2">
            Items Per Page
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-1 border rounded-xl"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Update Asset</h2>
            <label className="block mb-2">Asset Name</label>
            <input
              type="text"
              value={updatedAsset.productName}
              onChange={(e) =>
                setUpdatedAsset({
                  ...updatedAsset,
                  productName: e.target.value,
                })
              }
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              value={updatedAsset.productQuantity}
              onChange={(e) =>
                setUpdatedAsset({
                  ...updatedAsset,
                  productQuantity: e.target.value,
                })
              }
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2">Type</label>
            <select
              value={updatedAsset.productType}
              onChange={(e) =>
                setUpdatedAsset({
                  ...updatedAsset,
                  productType: e.target.value,
                })
              }
              className="input input-bordered w-full mb-4"
            >
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                className="btn btn-sm bg-gray-300"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-[#323232] text-white"
                onClick={handleModalSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
