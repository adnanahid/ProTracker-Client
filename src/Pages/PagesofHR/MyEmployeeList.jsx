import React from "react";
import useMyEmployeeList from "../../CustomHooks/useMyEmployeeList";
import useCheckRole from "../../CustomHooks/useCheckRole";

const MyEmployeeList = () => {
  const { myEmployeeList } = useMyEmployeeList();
  console.log(myEmployeeList);

  const handleRemoveEmployee = (id) => {
    console.log(id);
  };

  return (
    <div className="employee-list pt-28">
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
              <tr>
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
                  <button className="btn btn-ghost btn-xs bg-red-600 text-white">Remove</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
