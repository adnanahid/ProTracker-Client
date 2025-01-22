import React, { useContext } from "react";
import Banner from "./Components/Banner";
import AboutSection from "./Components/AboutSection";
import PackagesSection from "./Components/PackagesSection";
import { AuthContext } from "../../Provider/AuthProvider";
import useCheckRole from "../../CustomHooks/useCheckRole";
import HomePageForEmployee from "../PageforEmployee.jsx/HomePageForEmployee";
import HomePageForHr from "../PagesofHR/HomePageForHr";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import contactAnimation from "../../../public/animation/Animation - contactwith.json";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { clientDetails } = useCheckRole();
  console.log(clientDetails);
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
        <div className="min-h-screen pt-28">
          <h1 className="text-4xl font-bold text-center">contact with your hr</h1>
          <Lottie className="max-w-[800px] mx-auto" animationData={contactAnimation}></Lottie>
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
