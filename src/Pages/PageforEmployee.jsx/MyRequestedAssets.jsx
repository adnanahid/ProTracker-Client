import React, { useState } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import useCheckRole from "../../CustomHooks/useCheckRole";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyRequestedAssets = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const axiosSecure = useAxiosSecure();

  const {
    myRequestedAssetList,
    totalCount,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  } = useMyRequestedAssets(search, filters, currentPage, itemsPerPage);

  const { clientDetails } = useCheckRole();

  const cancelRequest = (id) => {
    console.log("Cancel request for ID:", id);
    myRequestedAssetListRefetch();
  };

  const returnAsset = (id) => {
    axiosSecure
      .delete(`/return-asset/${id}`)
      .then((res) => {
        toast.success("Return successful")
      })
      .catch((error) => {
        console.error("Error while returning the asset:", error); // Handle errors
      });
  };

  const AssetPrintDocument = ({ asset }) => (
    <Document>
      <Page>
        <Text>Company Name: {clientDetails.companyName}</Text>
        <Text>Asset Name: {asset.AssetName}</Text>
        <Text>Asset Type: {asset.AssetType}</Text>
        <Text>Request Date: {asset.RequestedDate}</Text>
        <Text>Approval Date: {asset.ApprovalDate}</Text>
        <Text>Status: {asset.RequestStatus}</Text>
        <Text style={{ marginTop: "auto" }}>
          Printing Date: {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="max-w-screen-xl mx-auto pt-28 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Requested Assets - ProTracker</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold text-center pb-8 text-[#323232]">
        My Requested Assets
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by Asset Name"
          className="input input-bordered w-full sm:w-1/2"
        />
        <select
          className="select select-bordered w-full sm:w-1/4"
          value={filters}
          onChange={(e) => setFilters(e.target.value)}
        >
          <option value="">Filter by</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-Returnable</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-md shadow-lg">
        <table className="table w-full mx-auto">
          <thead className="bg-[#323232] text-white">
            <tr>
              <th className="text-center">Asset Name</th>
              <th className="text-center">Asset Type</th>
              <th className="text-center">Request Date</th>
              <th className="text-center">Approval Date</th>
              <th className="text-center">Request Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myRequestedAssetList.map((asset) => (
              <tr key={asset._id} className="hover:bg-gray-100">
                <td className="text-center py-2">{asset.AssetName}</td>
                <td className="text-center py-2">{asset.AssetType}</td>
                <td className="text-center py-2">{asset.RequestedDate}</td>
                <td className="text-center py-2">
                  {asset.ApprovalDate || "N/A"}
                </td>
                <td className="text-center py-2">{asset.RequestStatus}</td>
                <td className="text-center py-2 flex flex-wrap justify-center gap-2">
                  {asset.RequestStatus === "Pending" && (
                    <button
                      className="btn btn-xs bg-red-600 text-white"
                      onClick={() => cancelRequest(asset._id)}
                    >
                      Cancel Request
                    </button>
                  )}
                  {asset.RequestStatus === "Approved" && (
                    <>
                      <PDFDownloadLink
                        document={<AssetPrintDocument asset={asset} />}
                        fileName={`Asset-${asset._id}.pdf`}
                      >
                        <button className="btn btn-xs bg-[#323232] text-white">
                          Print Details
                        </button>
                      </PDFDownloadLink>
                      {asset.AssetType === "returnable" && (
                        <button
                          className="btn btn-xs bg-[#323232] text-white"
                          onClick={() => returnAsset(asset._id)}
                        >
                          Return
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center py-6">
        <div className="join">
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
    </div>
  );
};

export default MyRequestedAssets;
