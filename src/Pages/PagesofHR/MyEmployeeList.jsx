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
    <div className="employee-list pt-28">
      <Helmet>
        <title>My Employee List- ProTracker</title>
      </Helmet>
      <h2 className="text-4xl font-bold mb-4 text-center pb-12">
        Team Members
      </h2>
      <div className="overflow-x-auto">
        <table className="table max-w-screen-lg mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>index</th>
              <th>Photo</th>
              <th>Name</th>
              <th>role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myEmployeeList.map((myEmployee, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={myEmployee?.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <p>{myEmployee?.name}</p>
                </td>
                <td>{myEmployee?.role}</td>
                <th>
                  <button
                    onClick={() => handleRemoveEmployee(myEmployee)}
                    className="btn btn-ghost btn-xs bg-red-600 text-white"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
