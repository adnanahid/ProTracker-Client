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
  console.log(requestedAssets);

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
        name: asset.productName, // Correctly accessing productName from each asset
        product_quantity: asset.productQuantity, // Correctly accessing productQuantity
      }))
    : [];

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 place-items-center">
      <div className="w-full col-span-2">
        <h1 className="pt-28 text-3xl font-semibold text-center">
          My Requested Asset List Type
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
                    label={(entry) => `${entry.value} ${entry.name}`}
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

      <div className="col-span-3 w-full h-[500px]">
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
      </div>
    </section>
  );
};

export default EmployeeOverview;
