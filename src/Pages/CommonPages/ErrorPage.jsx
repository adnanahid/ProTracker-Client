import Lottie from "lottie-react";
import React from "react";
import error from "../../../public/animation/404-Animation.json";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className="min-h-screen container mx-auto">
      <Helmet>
        <title>error - ProTracker</title>
      </Helmet>
      <Lottie animationData={error} loop={true} />
    </div>
  );
};

export default ErrorPage;
