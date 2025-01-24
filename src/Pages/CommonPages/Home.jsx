import React, { useContext } from "react";
import Banner from "./Components/Banner";
import AboutSection from "./Components/AboutSection";
import PackagesSection from "./Components/PackagesSection";
import { AuthContext } from "../../Provider/AuthProvider";
import useCheckRole from "../../CustomHooks/useCheckRole";
import HomePageForEmployee from "../PageforEmployee.jsx/HomePageForEmployee";
import HomePageForHr from "../PagesofHR/HomePageForHr";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();

  return (
    <div>
      <Helmet>
        <title>ProTracker</title>
      </Helmet>
      {!user && (
        <>
          <Banner></Banner>
          <AboutSection></AboutSection>
          <PackagesSection></PackagesSection>
        </>
      )}
      {user && clientDetails?.role === "n/a" && (
        <div className="min-h-screen pt-28 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold text-center mb-6">
            Get in Touch with Your HR to join the Team
          </h1>
        </div>
      )}

      {clientDetails?.role === "employee" && (
        <HomePageForEmployee></HomePageForEmployee>
      )}

      {clientDetails?.role === "hr" && <HomePageForHr></HomePageForHr>}
    </div>
  );
};

export default Home;
