import React from "react";
import HrOverview from "../PagesofHR/HrOverview";
import useCheckRole from "../../CustomHooks/useCheckRole";
import EmployeeOverview from "../PageforEmployee.jsx/EmployeeOverview";

const Overview = () => {
  const { clientDetails } = useCheckRole();
  console.log(clientDetails);
  return (
    <div>
      <div>{clientDetails?.role === "hr" && <HrOverview></HrOverview>}</div>
      <div>{clientDetails?.role === "employee" && <EmployeeOverview></EmployeeOverview>}</div>
    </div>
  );
};

export default Overview;
