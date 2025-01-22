import { useState } from "react";
import useAssetsOfMyCompany from "../../CustomHooks/useAssetsOfMyCompany";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { Helmet } from "react-helmet-async";

const RequestForAnAsset = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const {
    requestedAssets,
    totalCount,
    requestedAssetLoading,
    requestedAssetsRefetch,
  } = useAssetsOfMyCompany(currentPage, itemsPerPage, search, filterBy);
  const { clientDetails } = useCheckRole();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAsset(null);
    setAdditionalNotes("");
  };

  const handleRequest = async (id) => {
    if (!selectedAsset) return;

    const assetsInfo = {
      RequestedBy: clientDetails.name,
      email: clientDetails.email,
      hrEmail: clientDetails.hrEmail,
      AssetName: selectedAsset.productName,
      AssetType: selectedAsset.productType,
      AdditionalNotes: additionalNotes,
      RequestStatus: "Pending",
      RequestedDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axiosSecure.post(`/assets-request-by-employee/${id}`, assetsInfo);
      toast.success(`Request sent for ${selectedAsset.productName}`);
      requestedAssetsRefetch();
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(`You have already requested ${selectedAsset.productName}.`);
      } else {
        toast.error("An error occurred while sending the request.");
      }
    }
  };

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="max-w-screen-xl mx-auto pt-28 px-4">
      {/* Helmet */}
      <Helmet>
        <title>Request for an Assets - ProTracker</title>
      </Helmet>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Request Asset</h2>
          <p className="mb-2">
            <strong>Asset Name:</strong> {selectedAsset?.productName}
          </p>
          <p className="mb-4">
            <strong>Asset Type:</strong> {selectedAsset?.productType}
          </p>
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Additional notes (optional)"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleRequest(selectedAsset._id)}
            >
              Submit Request
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center pb-12 text-gray-800">
        Asset List
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          defaultValue={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          name="search"
          placeholder="Search by requester name or email"
          className="input input-bordered w-full md:w-6/12"
        />
        <select
          className="select select-bordered w-full md:w-3/12"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="">Filter by</option>
          <option value="Available">Available</option>
          <option value="Out-of-stock">Out-of-stock</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Asset List Table */}
      <div className="overflow-x-auto w-10/12 mx-auto rounded-md shadow-lg">
        <table className="table w-full mx-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-center px-4 py-2">Product Name</th>
              <th className="text-center px-4 py-2">Type</th>
              <th className="text-center px-4 py-2">Availability</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestedAssets.map((asset) => (
              <tr key={asset._id} className="hover:bg-gray-50">
                <td className="text-center px-4 py-2">{asset.productName}</td>
                <td className="text-center px-4 py-2">{asset.productType}</td>
                <td className="text-center px-4 py-2">
                  {asset.productQuantity > 0 ? "Available" : "Out of stock"}
                </td>
                <td className="text-center px-4 py-2">
                  {asset.productQuantity > 0 ? (
                    <button
                      className="btn btn-xs bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => openModal(asset)}
                    >
                      Request
                    </button>
                  ) : (
                    <button disabled className="btn btn-xs bg-gray-400 text-white rounded">
                      Request
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex justify-center md:justify-start gap-2">
          <button
            className="btn btn-sm mx-1"
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
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
            onClick={() => currentPage < pages.length && setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
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
    </div>
  );
};

export default RequestForAnAsset;
