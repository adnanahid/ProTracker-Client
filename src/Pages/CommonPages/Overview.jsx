import React from "react";
import HrOverview from "../PagesofHR/HrOverview";
import useCheckRole from "../../CustomHooks/useCheckRole";

const Overview = () => {
  const { clientDetails } = useCheckRole();
  console.log(clientDetails);
  return <div>{clientDetails?.role === "hr" && <HrOverview></HrOverview>}</div>;
};

export default Overview;
