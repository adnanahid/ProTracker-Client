import React, { useState } from "react";
import useAllEmployee from "../../CustomHooks/useAllEmployee";

const AddEmployeeToTeam = () => {
  const { employees } = useAllEmployee();
  const [teamCount, setTeamCount] = useState(0);
  // const { clientDetails, isReloading, isError, error, refetch } = useCheckRole();

  // Filter employees not affiliated with any company
  const unAffiliatedEmployees = employees.filter((emp) => !emp.company);

  // Handle adding an employee to the team
  const handleAddToTeam = (employeeId) => {
    // Increment team count
    setTeamCount((prevCount) => prevCount + 1);

    // Add logic to update the employee's affiliation if needed (e.g., API call)
    console.log(`Employee with ID ${employeeId} added to the team.`);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-center pt-28">Add an Employee</h1>
      <p className="text-center mt-4 text-lg">
        Team Members Count: <span className="font-semibold">{teamCount}</span>
      </p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {unAffiliatedEmployees.map((employee) => (
          <div
            key={employee._id}
            className="max-w-[200px] border p-4 rounded shadow hover:shadow-lg transition"
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
            <label htmlFor={`employee-${employee.id}`} className="font-medium">
              {employee.name}
            </label>
            <button
              onClick={() => handleAddToTeam(employee._id)}
              className="bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-800"
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
