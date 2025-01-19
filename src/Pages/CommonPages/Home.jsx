import React, { useContext } from "react";
import Banner from "./Components/Banner";
import AboutSection from "./Components/AboutSection";
import PackagesSection from "./Components/PackagesSection";
import { AuthContext } from "../../Provider/AuthProvider";
import useCheckRole from "../../CustomHooks/useCheckRole";
import HomePageForEmployee from "../PageforEmployee.jsx/HomePageForEmployee";
import HomePageForHr from "../PagesofHR/HomePageForHr";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();
  return (
    <div>
      {!user && (
        <>
          <Banner></Banner>
          <AboutSection></AboutSection>
          <PackagesSection></PackagesSection>
        </>
      )}


      {clientDetails?.role === "employee" && (
        <HomePageForEmployee></HomePageForEmployee>
      )}


      {clientDetails?.role === "hr" && (
       <HomePageForHr></HomePageForHr>
      )}
    </div>
  );
};

export default Home;
