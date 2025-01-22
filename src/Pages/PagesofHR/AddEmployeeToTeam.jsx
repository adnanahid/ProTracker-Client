import React, { useState } from "react";
import useAllEmployee from "../../CustomHooks/useAllEmployee";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
import useMyEmployeeList from "../../CustomHooks/useMyEmployeeList";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddEmployeeToTeam = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    allEmployees,
    totalCount,
    RefetchEmployee,
    employeeLoading,
    ErrorEmployee,
  } = useAllEmployee(currentPage, itemsPerPage);

  const { clientDetails, isReloading, isError, error, clientDetailsRefetch } =
    useCheckRole();

  const handleAddToTeam = async (employee = null) => {
    if (clientDetails.teamMembersLength >= clientDetails.packageLimit) {
      toast.error("Team limit reached to add member please buy package");
      return;
    }

    if (selectedEmployees.length > clientDetails.packageLimit) {
      toast.error(
        `you can add only ${clientDetails.packageLimit} members in your team`
      );
      return;
    }

    const employeesToAdd = employee
      ? [...selectedEmployees, employee]
      : selectedEmployees;

    if (employeesToAdd.length === 0) {
      toast.error("Please select at least one employee.");
      return;
    }

    try {
      await axiosSecure.patch(`/add-selected-to-team`, {
        employees: employeesToAdd.map((e) => ({
          email: e.email,
          role: "employee",
          hrEmail: clientDetails.email,
          companyName: clientDetails.companyName,
          companyLogo: clientDetails.companyLogo,
        })),
      });

      toast.success(
        employee
          ? `${employee.name} has been added to the team.`
          : "Selected employees have been added to the team."
      );

      setSelectedEmployees([]);
      RefetchEmployee();
      clientDetailsRefetch();
    } catch (err) {
      toast.error("Error adding employees to the team. Please try again.");
      console.error(err);
    }
  };

  // Handle checkbox toggle
  const handleCheckboxToggle = (employee) => {
    setSelectedEmployees((prev) =>
      prev.some((selected) => selected._id === employee._id)
        ? prev.filter((selected) => selected._id !== employee._id)
        : [...prev, employee]
    );
  };

  // Handle loading and error states
  if (employeeLoading || isReloading) {
    return <div>Loading...</div>;
  }

  if (isError || ErrorEmployee) {
    return <div>Error: {error?.message || "Something went wrong!"}</div>;
  }

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center pt-28">Add Employees</h1>
      <div className="flex justify-around my-12">
        <p className="text-center mt-4 text-lg">
          Team Members Count:
          <span className="font-semibold">
            {clientDetails.teamMembersLength || 0}
          </span>
        </p>
        <p className="text-center mt-4 text-lg">
          Team Members Limit:
          <span className="font-semibold">{clientDetails.packageLimit}</span>
        </p>
        <Link to="/increaseLimit">
          <button className="btn text-white bg-black">
            Increase Member Limit
          </button>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {allEmployees.map((employee) => (
          <div
            key={employee._id}
            className="w-[220px] border p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="mt-4">
              <img
                src={employee.photo || "https://via.placeholder.com/150"}
                alt={employee.name}
                className="w-20 h-20 rounded-full mx-auto"
              />
            </div>
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedEmployees.some(
                (selected) => selected._id === employee._id
              )}
              onChange={() => handleCheckboxToggle(employee)}
            />
            <p className="font-medium">{employee.name}</p>
            <p className="font-medium">{employee.email}</p>
            <button
              onClick={() => handleAddToTeam(employee)}
              className="bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-800"
              // disabled={
              //   clientDetails.packageLimit <= clientDetails.teamMembersLength
              // }
            >
              Add to Team
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => handleAddToTeam()}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          // disabled={
          //   clientDetails.packageLimit <= clientDetails.teamMembersLength ||
          //   selectedEmployees.length === 0
          // }
        >
          Add Selected Members to the Team
        </button>
      </div>

      {/* Pagination */}
      <div className="text-center mt-12">
        <div className="join">
          <button
            className="btn btn-sm mx-1"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
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
            onClick={() =>
              currentPage < pages.length && setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>
        </div>

        <label htmlFor="itemsPerPage" className="mt-4">
          Items Per Page
        </label>
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
