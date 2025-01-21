import React, { useState } from "react";
import useAllAssets from "../../CustomHooks/useAllAssets";
import { FaSearch } from "react-icons/fa";

const AssetList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterBy, setFilterBy] = useState("");
  const { assets, totalCount, isLoading, isError, error, refetch } =
    useAllAssets(currentPage, itemsPerPage, filterBy);

  if (isLoading) return <div>Loading assets...</div>;

  if (isError) {
    return <div>Error: {error?.message || "Something went wrong!"}</div>;
  }

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  console.log(filterBy);

  return (
    <div className="p-6 min-h-screen pt-28 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-12 text-center">Asset List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 mb-12">
        {/* Search Section */}
        <label className="input input-bordered flex items-center gap-2 col-span-12 sm:col-span-8">
          <input type="text" className="grow" placeholder="Search" />
          <FaSearch></FaSearch>
        </label>

        {/* Filter Section */}
        <div className="col-span-12 sm:col-span-4 flex flex-col sm:flex-row sm:items-center gap-2">
          <select
            className="input input-bordered w-full"
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="">Filter By</option>
            <option value="Available">Available</option>
            <option value="Out-of-stock">Out-of-stock</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto ">
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

        {/* Pagination */}
        <div className="text-center">
          <div className="join p-10 text-center">
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
                  currentPage === page + 1 ? "bg-blue-500 text-white" : ""
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

          {/* Items per page selector */}
          <label htmlFor="itemsPerPage">Items Per Page</label>
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
    </div>
  );
};

export default AssetList;
