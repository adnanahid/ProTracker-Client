import React from "react";

const PackagesSection = () => {
  const packages = [
    {
      title: "Maximum 5 Employees",
      price: "$5",
      description: "Perfect for small teams looking to manage their resources efficiently.",
    },
    {
      title: "Maximum 10 Employees",
      price: "$8",
      description: "Ideal for growing teams that need more flexibility and control.",
    },
    {
      title: "Maximum 20 Employees",
      price: "$15",
      description: "Designed for larger teams to ensure seamless management of resources.",
    },
  ];

  return (
    <section className="w-full py-12 bg-white text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Our Packages</h2>
          <p className="text-lg text-gray-600">
            Choose the package that best fits your team's needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 justify-center gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="w-full bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-500">
                {pkg.title}
              </h3>
              <p className="text-lg text-gray-700 mb-6">{pkg.description}</p>
              <p className="text-xl font-semibold text-gray-800">{pkg.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
