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
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";
import useAssetsOfMyCompany from "../../CustomHooks/useAssetsOfMyCompany";

const EmployeeOverview = () => {
  const { myRequestedAssetList = [] } = useMyRequestedAssets("", "", 1, 100);
  const { requestedAssets } = useAssetsOfMyCompany(1, 100, "", "");

  const returnableCount =
    myRequestedAssetList?.filter((asset) => asset.AssetType === "returnable")
      .length || 0;

  const nonReturnableCount =
    myRequestedAssetList?.filter(
      (asset) => asset.AssetType === "non-returnable"
    ).length || 0;

  const data01 = [
    { name: "Returnable", value: returnableCount },
    { name: "Non-Returnable", value: nonReturnableCount },
  ];

  const formattedData = requestedAssets
    ? requestedAssets.map((asset) => ({
        name: asset.productName,
        product_quantity: asset.productQuantity,
      }))
    : [];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="w-full">
        <h1 className="pt-16 text-xl sm:text-2xl md:text-3xl font-semibold text-center">
          My Requested Asset List Type
        </h1>
        <div className="flex justify-center p-4">
          {data01.length > 0 && (data01[0].value > 0 || data01[1].value > 0) ? (
            <div className="w-full max-w-[400px] sm:h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#191919"
                    label={(entry) => `${entry.value} ${entry.name}`}
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xs">
              No data available for asset type distribution.
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={formattedData}>
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
      </div>
    </section>
  );
};

export default EmployeeOverview;
