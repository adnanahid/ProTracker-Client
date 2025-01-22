import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const IncreaseMemberLimit = () => {
  const navigate = useNavigate();
  const packageData = [
    { membersLimit: 5, price: 5 },
    { membersLimit: 10, price: 8 },
    { membersLimit: 20, price: 15 },
  ];

  const handleMakePurchase = (pkg) => {
    navigate("/paymentForIncreaseLimit", {
      state: { pkg },
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto py-28">
      <Helmet>
        <title>Increase Member - ProTracker</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-12">Our Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {packageData.map((pkg, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-center mb-4">
              {pkg.membersLimit} Members
            </h2>
            <p className="text-gray-700 text-center text-lg mb-4">
              Perfect for teams of {pkg.membersLimit}.
            </p>
            <div className="text-center">
              <span className="text-3xl font-bold">${pkg.price}</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <button
              onClick={() => handleMakePurchase(pkg)}
              className="mt-6 w-full bg-black text-white py-2 rounded-md transition duration-300"
            >
              Make Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncreaseMemberLimit;
