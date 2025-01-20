import React, { useState } from "react";
import useAllEmployee from "../../CustomHooks/useAllEmployee";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import useMyEmployeeList from "../../CustomHooks/useMyEmployeeList";

const AddEmployeeToTeam = () => {
  const { employees, refetch } = useAllEmployee();
  const axiosSecure = useAxiosSecure();
  const { clientDetails, isReloading, isError, error, clientDetailsRefetch } =
    useCheckRole();
  const { myEmployeeList, RefetchMyEmployee } = useMyEmployeeList();

  // Handle adding an employee to the team
  const handleAddToTeam = (employee) => {
    axiosSecure
      .patch(`/add-to-team`, {
        ...employee,
        hrEmail: clientDetails.email,
        companyName: clientDetails.companyName,
        companyLogo: clientDetails.companyLogo,
        role: "employee",
      })
      .then((res) => {
        refetch();
        clientDetailsRefetch();
        RefetchMyEmployee();
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-center pt-28">Add an Employee</h1>
      <div className="flex justify-around">
        <p className="text-center mt-4 text-lg">
          Team Members Count:
          <span className="font-semibold">{myEmployeeList.length}</span>
        </p>
        <p className="text-center mt-4 text-lg">
          Team Members Limit:
          <span className="font-semibold">{clientDetails.packageLimit}</span>
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="w-[220px] border p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="mt-4">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-20 h-20 rounded-full mx-auto"
              />
            </div>
            <input
              type="checkbox"
              id={`employee-${employee._id}`}
              className="mr-2"
            />
            <p className="font-medium">{employee.name}</p>
            <p className="font-medium">{employee.email}</p>
            <button
              onClick={() => handleAddToTeam(employee)}
              className="bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-800"
              disabled={clientDetails?.packageLimit <= myEmployeeList?.length}
            >
              Add to the Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEmployeeToTeam;
