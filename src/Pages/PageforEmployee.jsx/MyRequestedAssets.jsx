import React, { useState, useEffect, useContext } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import useCheckRole from "../../CustomHooks/useCheckRole";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyRequestedAssets = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {
    myRequestedAssetList,
    totalCount,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  } = useMyRequestedAssets(search, filters, currentPage, itemsPerPage);

  const { clientDetails } = useCheckRole();

  const cancelRequest = (id) => {
    // Logic to cancel the request (update backend and refetch data)
    console.log("Cancel request for ID:", id);
    myRequestedAssetListRefetch();
  };

  const returnAsset = (id) => {
    // Logic to return the asset (update backend and refetch data)
    console.log("Return asset for ID:", id);
    myRequestedAssetListRefetch();
  };

  // //! loading holo problem
  // if (loading || isMyRequestedAssetListLoading) {
  //   return <div>loading....</div>;
  // }

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
    <div className="max-w-screen-xl mx-auto pt-28">
      <Helmet><title>My Requested Assets - ProTracker</title></Helmet>
      <h1 className="text-4xl font-bold text-center pb-12">
        My Requested Assets
      </h1>
      <div className="flex justify-center gap-4 mb-6 w-6/12 mx-auto">
        <input
          defaultValue={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          name="search"
          placeholder="Search by Assets Name"
          className="input input-bordered w-full"
        />
        <select
          className="select select-bordered"
          defaultValue={filters}
          onChange={(e) => setFilters(e.target.value)}
        >
          <option value="">Filter by</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>
      <table className="table md:w-10/12 mx-auto">
        <thead>
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
            <tr key={asset._id}>
              <td className="text-center">{asset.AssetName}</td>
              <td className="text-center">{asset.AssetType}</td>
              <td className="text-center">{asset.RequestedDate}</td>
              <td className="text-center">{asset.ApprovalDate || "N/A"}</td>
              <td className="text-center">{asset.RequestStatus}</td>
              <td className="text-center">
                {asset.RequestStatus === "Pending" && (
                  <button
                    className="btn btn-xs rounded-3xl bg-red-600 text-white"
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
                      <button className="btn btn-xs bg-blue-600 text-white">
                        Print Details
                      </button>
                    </PDFDownloadLink>
                    {asset.AssetType === "Returnable" && (
                      <button
                        className="btn btn-xs bg-green-600 text-white"
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
  );
};

export default MyRequestedAssets;
