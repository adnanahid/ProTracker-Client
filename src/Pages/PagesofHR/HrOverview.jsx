import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Rectangle,
} from "recharts";
import useAssetRequests from "../../CustomHooks/useAssetRequest";
import useAllAssets from "../../CustomHooks/useAllAssets";

const HrOverview = () => {
  const { assetRequests } = useAssetRequests(1, 100, "");
  const { assets } = useAllAssets(1, 100, "", "", "");

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

  const formattedData = assets?.map((asset) => ({
    name: asset.productName, // Using product name as the label
    product_quantity: asset.productQuantity, // Using product quantity for the bar height
  }));

  return (
    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:mt-0 mt-20">
      {/* BarChart Section */}
      <section className="w-full md:w-7/12 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="product_quantity"
              fill="#191919"
              activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* PieChart Section */}
      <section className="w-full md:w-5/12">
        <h1 className="pt-28 text-3xl font-semibold text-center">
          Asset Type Distribution
        </h1>
        <div className="flex justify-center p-6">
          {data01.length > 0 && (data01[0].value > 0 || data01[1].value > 0) ? (
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
                    fill="#191919"
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
      </section>
    </div>
  );
};

export default HrOverview;
