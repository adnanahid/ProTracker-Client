import React from "react";
import Banner from "./Components/Banner";
import AboutSection from "./Components/AboutSection";
import PackagesSection from "./Components/PackagesSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutSection></AboutSection>
      <PackagesSection></PackagesSection>
    </div>
  );
};

export default Home;
