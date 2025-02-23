import React, { useState } from "react";
import useMyEmployeeList from "../../CustomHooks/useMyEmployeeList";
import useCheckRole from "../../CustomHooks/useCheckRole";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {
    myEmployeeList,
    totalCount,
    MyEmployeeLoading,
    RefetchMyEmployeeList,
    MyEmployeeError,
  } = useMyEmployeeList();
  const { clientDetails } = useCheckRole();
  const handleRemoveEmployee = (myEmployee) => {
    axiosSecure
      .patch(`/remove-employee/${myEmployee._id}`, myEmployee)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          toast.success("Employee removed successfully");
          RefetchMyEmployeeList();
        } else {
          console.log(res.data);
          toast.error("Failed to remove employee");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while removing the employee");
      });
  };

  if (MyEmployeeLoading) {
    return <div>loading...</div>;
  }

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="employee-list pt-28 min-h-screen">
      <Helmet>
        <title>My Employee List- ProTracker</title>
      </Helmet>
      <h2 className="text-4xl font-bold mb-4 text-center pb-12">
        Team Members
      </h2>
      <div className="my-24 max-w-screen-lg mx-auto">
        <div
          key={clientDetails._id}
          className="relative flex flex-col items-center p-4 rounded-lg shadow-md w-48 mb-36 mx-auto pt-16 h-[220px]"
        >
          <div className="absolute -top-20  w-36 h-36 rounded-full border-4 overflow-hidden">
            <img
              src={clientDetails?.userPhoto}
              alt={clientDetails?.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-black text-lg font-bold mt-4">
            {clientDetails?.fullName}
          </h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">HR</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {myEmployeeList.map((employee) => (
            <div
              key={employee._id}
              className="relative h-[220px] flex flex-col items-center p-4 rounded-lg shadow-md w-48 mb-36 mx-auto pt-16"
            >
              <div className="absolute -top-20 w-36 h-36 rounded-full border-4 overflow-hidden">
                <img
                  src={employee?.photo}
                  alt={employee?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-black text-lg font-bold mt-4">
                {employee?.name}
              </h2>
              <h3 className="text-gray-500 text-sm mb-5">{employee?.role}</h3>
              <button
                onClick={() => handleRemoveEmployee(employee)}
                className="w-full mt-auto btn text-xs bg-[#191919] btn-sm text-white hover:text-black rounded-b-lg"
              >
                Remove From Team
              </button>
            </div>
          ))}
        </div>

        {/*pagination */}
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
                  currentPage === page + 1 ? "bg-[#191919] text-white" : ""
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
          <label htmlFor="itemsPerPage">Item Per Page</label>
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
    </div>
  );
};

export default MyEmployeeList;
