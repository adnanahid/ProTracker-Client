import React, { useState } from "react";
import useAllEmployee from "../../CustomHooks/useAllEmployee";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import useMyEmployeeList from "../../CustomHooks/useMyEmployeeList";

const AddEmployeeToTeam = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {
    allEmployees,
    totalCount,
    RefetchEmployee,
    employeeLoading,
    ErrorEmployee,
  } = useAllEmployee(currentPage, itemsPerPage);
  const axiosSecure = useAxiosSecure();
  const { clientDetails, isReloading, isError, error, clientDetailsRefetch } =
    useCheckRole();
  const {
    myEmployeeList,
    MyEmployeeLoading,
    RefetchMyEmployeeList,
    MyEmployeeError,
  } = useMyEmployeeList();

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
        RefetchEmployee();
        clientDetailsRefetch();
        RefetchMyEmployeeList();
      })
      .catch((err) => {
        alert("Error adding employee to the team. Please try again.");
      });
  };

  // Handling loading state
  if (employeeLoading || MyEmployeeLoading || isReloading) {
    return <div>Loading...</div>;
  }

  // Error handling
  if (isError || ErrorEmployee || MyEmployeeError) {
    return <div>Error: {error?.message || "Something went wrong!"}</div>;
  }
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

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
        {allEmployees.map((employee) => (
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
              {clientDetails?.packageLimit <= myEmployeeList?.length
                ? "Limit Reached"
                : "Add to the Team"}
            </button>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="text-center">
        <div className="join p-10 text-center">
          <button
            className="btn btn-sm mx-1"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`btn btn-sm mx-1 ${
                currentPage === page + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-sm mx-1"
            onClick={() => {
              if (currentPage < pages.length) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </button>
        </div>

        <label htmlFor="itemsPerPage">Items Per Page</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="p-1 border rounded-xl mx-1"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default AddEmployeeToTeam;
