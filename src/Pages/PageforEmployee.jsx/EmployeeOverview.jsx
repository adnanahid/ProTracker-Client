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
import useMyRequestedAssets from "../../CustomHooks/useMyRequestedAssets";

const EmployeeOverview = () => {
  const { myRequestedAssetList } = useMyRequestedAssets("", "", 1, 10);
  console.log(myRequestedAssetList);
  //   const returnableCount =
  //     assetRequests?.filter((asset) => asset.AssetType === "returnable").length ||
  //     0;

  //   const nonReturnableCount =
  //     assetRequests?.filter((asset) => asset.AssetType === "non-returnable")
  //       .length || 0;

  //   const data01 = [
  //     { name: "Returnable", value: returnableCount },
  //     { name: "Non-Returnable", value: nonReturnableCount },
  //   ];

  const formattedData = myRequestedAssetList?.map((asset) => ({
    name: asset.productName, // Using product name as the label
    product_quantity: asset.productQuantity, // Using product quantity for the bar height
  }));

  return (
    <div>
      <div className="flex items-center">
        <section className="w-7/12 h-[300px]">
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

        {/* <section className="w-5/12">
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
        </section> */}
      </div>
    </div>
  );
};

export default EmployeeOverview;
