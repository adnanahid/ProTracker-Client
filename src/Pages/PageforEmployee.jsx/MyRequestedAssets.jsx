import React, { useState, useEffect } from "react";
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";

const MyRequestedAssets = () => {
  const {
    myRequestedAssetList,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  } = useMyRequestedAssets();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [filteredAssets, setFilteredAssets] = useState([]);

  // Filter and search logic
  // useEffect(() => {
  //   // Perform the filtering logic here
  //   const filtered = myRequestedAssetList.filter((asset) => {
  //     const matchesSearch = asset.AssetName.toLowerCase().includes(
  //       searchQuery.toLowerCase()
  //     );
  //     const matchesStatus =
  //       filters.status === "" || asset.RequestStatus === filters.status;
  //     const matchesType =
  //       filters.type === "" || asset.AssetType === filters.type;

  //     return matchesSearch && matchesStatus && matchesType;
  //   });

  //   // Set the filtered assets
  //   setFilteredAssets(filtered);
  // }, [myRequestedAssetList, searchQuery, filters]);
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

    // শুধুমাত্র যদি স্টেট পরিবর্তন প্রয়োজন হয় তখন সেট করুন
    if (JSON.stringify(filtered) !== JSON.stringify(filteredAssets)) {
      setFilteredAssets(filtered);
    }
  }, [myRequestedAssetList, searchQuery, filters]);

  return (
    <div className="max-w-screen-xl mx-auto pt-28">
      <h1 className="text-4xl font-bold text-center pb-12">
        My Requested Assets
      </h1>

      {/* Search Section */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input input-bordered w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Section */}
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

      {/* Asset List Section */}
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
