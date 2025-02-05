import React, { useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAllAssets from "../../CustomHooks/useAllAssets";
import { Helmet } from "react-helmet-async";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HomePageForHr = () => {
  const { assetRequests } = useAssetRequests(1, 10, "");
  const { assets } = useAllAssets(1, 10, "", "", "");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const notices = [
    "Office will be closed on January 26, 2025, due to maintenance.",
    "Submit your project updates by January 28, 2025.",
    "Training session on 'Effective Communication' on February 1, 2025.",
  ];

  // PendingAssets
  const PendingAssets = assetRequests
    ?.filter((asset) => asset.RequestStatus === "Pending")
    .slice(-5);

  // Top requested assets logic
  const assetCounts = assetRequests.reduce((acc, asset) => {
    acc[asset.AssetName] = (acc[asset.AssetName] || 0) + 1;
    return acc;
  }, {});

  const sortedAssets = Object.entries(assetCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const topAssets = sortedAssets.slice(0, 4);

  // Limited Stock
  const limitedStock = assets?.filter((asset) => asset.productQuantity < 10);

  const returnableCount =
    assetRequests?.filter((asset) => asset.AssetType === "returnable").length ||
    0;

  const nonReturnableCount =
    assetRequests?.filter((asset) => asset.AssetType === "non-returnable")
      .length || 0;

  const data01 = [
    { name: "Returnable", value: returnableCount },
    { name: "Non-Returnable", value: nonReturnableCount },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Helmet>
        <title>Home - ProTracker</title>
      </Helmet>

      {/* Pending Asset Requests */}
      <h1 className="pt-28 text-3xl font-semibold text-center">
        Pending Asset Requests
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
        {PendingAssets && PendingAssets.length > 0 ? (
          PendingAssets.map((asset, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{asset.AssetName}</h2>
              <p className="text-gray-700">
                <strong>By:</strong> {asset.RequestedBy}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {asset.RequestedDate}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No pending asset requests.
          </p>
        )}
      </section>

      {/* Limited Stock Section */}
      <h1 className="pt-28 text-3xl font-semibold text-center">
        Limited Stock
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
        {limitedStock && limitedStock.length > 0 ? (
          limitedStock.map((asset, index) => (
            <div
              key={index}
              className="flex border rounded-lg shadow-md p-4 bg-white flex-col"
            >
              <h2 className="text-xl font-semibold mb-2 flex-grow">
                {asset.productName}
              </h2>
              <h2 className="text-lg font-semibold mb-2">
                Available:
                <span className="text-3xl font-semibold">
                  {asset.productQuantity}
                </span>
              </h2>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No assets with limited stock.
          </p>
        )}
      </section>

      {/* Top Requested Assets Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
        {/* Notices Section */}
        <div className="md:col-span-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Notices
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {notices.map((notice, index) => (
                <li key={index}>{notice}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-8">
          <h1 className="text-3xl font-semibold text-center">
            Top Requested Assets
          </h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {topAssets && topAssets.length > 0 ? (
              topAssets.map((asset, index) => (
                <div
                  key={index}
                  className="flex flex-col border rounded-lg shadow-md p-4 bg-white"
                >
                  <h2 className="flex-grow text-xl font-semibold mb-2">
                    {asset.name}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Requests:</strong>{" "}
                    <span className="text-4xl font-bold">{asset.count}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No top requested assets available.
              </p>
            )}
          </section>
        </div>
      </div>

      {/* Asset Type Distribution */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="pt-28 text-3xl font-semibold text-center">
            Asset Type Distribution
          </h1>
          <div className="flex justify-center p-6">
            {data01.length > 0 &&
            (data01[0].value > 0 || data01[1].value > 0) ? (
              <div className="w-full max-w-[600px] h-[400px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive
                      data={data01}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#393E46"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No data available for asset type distribution.
              </p>
            )}
          </div>
        </div>

        {/* Calendar Section */}
        <div>
          <h1 className="pt-28 text-3xl font-semibold text-center">Calendar</h1>
          <div className="flex justify-center p-6">
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageForHr;
