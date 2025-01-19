import React, { useState, useEffect } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import useCheckRole from "../../CustomHooks/useCheckRole";

const MyRequestedAssets = () => {
  const {
    myRequestedAssetList,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  } = useMyRequestedAssets();
  const { clientDetails } = useCheckRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const filtered = myRequestedAssetList.filter((asset) => {
      const matchesSearch = asset.AssetName.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const matchesStatus =
        filters.status === "" || asset.RequestStatus === filters.status;
      const matchesType =
        filters.type === "" || asset.AssetType === filters.type;

      return matchesSearch && matchesStatus && matchesType;
    });

    if (JSON.stringify(filtered) !== JSON.stringify(filteredAssets)) {
      setFilteredAssets(filtered);
    }
  }, [myRequestedAssetList, searchQuery, filters]);

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

  return (
    <div className="max-w-screen-xl mx-auto pt-28">
      <h1 className="text-4xl font-bold text-center pb-12">
        My Requested Assets
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input input-bordered w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <select
          className="select select-bordered"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Returned">Returned</option>
        </select>
        <select
          className="select select-bordered"
          value={filters.type}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, type: e.target.value }))
          }
        >
          <option value="">Filter by Type</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-Returnable</option>
        </select>
      </div>

      {isMyRequestedAssetListLoading ? (
        <div className="text-center">Loading...</div>
      ) : filteredAssets.length > 0 ? (
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
            {filteredAssets.map((asset) => (
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
      ) : (
        <p className="text-center text-xl">No assets found.</p>
      )}
    </div>
  );
};

export default MyRequestedAssets;
