import React, { useState } from "react";
import useAllEmployee from "../../CustomHooks/useAllEmployee";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCheckRole from "../../CustomHooks/useCheckRole";
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
    if (clientDetails.packageLimit - clientDetails.teamMembersLength <= 0) {
      toast.error(
        "Team limit reached. Please upgrade your package to add more members."
      );
      return;
    }

    if (
      selectedEmployees.length >
      clientDetails.packageLimit - clientDetails.teamMembersLength
    ) {
      toast.error(
        `you can add only ${
          clientDetails.packageLimit - clientDetails.teamMembersLength
        } members in your team`
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
          hrName: clientDetails.fullName,
          hrEmail: clientDetails.email,
          hrPhoto: clientDetails.userPhoto,
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
    <div className="container mx-auto min-h-[calc(100vh-72px)] px-2">
      <h1 className="text-2xl md:text-4xl font-bold text-center pt-28">
        Add Employees
      </h1>
      <div className="flex justify-around items-center my-12">
        <div className="md:flex">
          <p className="text-sm md:text-base text-center mt-4">
            Team Members:
            <span className="font-semibold">
              {clientDetails.teamMembersLength || 0}
            </span>
          </p>
          <p className="text-center mt-4 text-sm md:text-base ">
            Package Limit:
            <span className="font-semibold">{clientDetails.packageLimit}</span>
          </p>
        </div>
        <Link to="/increaseLimit">
          <button className="btn btn-sm md:btn text-white bg-[#191919]">
            Increase Member Limit
          </button>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
        {allEmployees.map((employee) => (
          <div
            key={employee._id}
            className="w-[200px] md:w-[220px] h-[280px] border p-2 rounded shadow hover:shadow-lg transition"
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
            <p className="font-medium overflow-hidden">{employee.name}</p>
            <p className="font-medium text-xs overflow-hidden">
              {employee.email}
            </p>
            <button
              onClick={() => handleAddToTeam(employee)}
              className="bg-[#191919] btn btn-sm w-full text-white py-2 px-4 rounded mt-4 hover:bg-gray-800"
            >
              Add to Team
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => handleAddToTeam()}
          className="bg-[#191919] btn text-white py-2 px-6 rounded hover:bg-gray-700"
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
                currentPage === page + 1 ? "bg-[#191919] text-white" : ""
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
