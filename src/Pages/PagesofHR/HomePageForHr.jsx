import React from "react";

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAllAssets from "../../CustomHooks/useAllAssets";

const HomePageForHr = () => {
  const { assetRequests } = useAssetRequests(1, 10, "");
  const { assets } = useAllAssets(1, 10, "", "", "");
  console.log(assetRequests);
  console.log(assets);
  const PendingAssets = assetRequests
    ?.filter((asset) => asset.RequestStatus === "Pending")
    .slice(-5);

  const limitedStock = assets?.filter((asset) => asset.productQuantity < 10);

  const returnableCount =
    assetRequests?.filter((asset) => asset.AssetType === "Returnable").length ||
    0;

  const nonReturnableCount =
    assetRequests?.filter((asset) => asset.AssetType === "Non-returnable")
      .length || 0;

  const data01 = [
    { name: "Returnable", value: returnableCount },
    { name: "Non-Returnable", value: nonReturnableCount },
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="pt-28 text-4xl font-bold text-center">
        Pending Asset Requests
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
        {PendingAssets?.map((asset, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold mb-2">{asset.AssetName}</h2>
            <p className="text-gray-700">
              <strong>Requested By:</strong> {asset.RequestedBy}
            </p>
            <p className="text-gray-700">
              <strong>Date:</strong> {asset.RequestDate}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {asset.RequestStatus}
            </p>
          </div>
        ))}
      </section>

      <h1 className="pt-28 text-4xl font-bold text-center">Limited Stock</h1>
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
        {limitedStock?.map((asset, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-4 bg-white flex-col"
          >
            <h2 className="text-xl font-semibold mb-2 flex-grow">
              {asset.productName}
            </h2>
            <h2 className="text-lg font-semibold mb-2">
              AvailAble: {asset.productQuantity}
            </h2>
          </div>
        ))}
      </section>

      <h1 className="pt-28 text-4xl font-bold text-center">
        Asset Type Distribution
      </h1>
      <div className="flex justify-center p-6">
        <div style={{ width: "50%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#000000"
                label={(entry) => `${entry.name}: ${entry.value}`}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomePageForHr;
