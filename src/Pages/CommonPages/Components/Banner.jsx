import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Banner = () => {
  const slides = [
    {
      title: "Join as HR Manager",
      description:
        "Take control of asset management with ease. Assign, track, and monitor company assets while keeping your employees productive and organized. Simplify your workflow and focus on what matters most.",
      buttonText: "Join Now",
      redirectPath: "/hr-manager-signup",
      to: "/join-as-hr",
      infoText:
        "Designed specifically for HR professionals to enhance productivity and accountability.",
    },
    {
      title: "Join as Employee",
      description:
        "Stay updated and accountable with the assets assigned to you. Gain access to essential tools and resources while maintaining transparency with your HR team. Enjoy an effortless tracking experience.",
      buttonText: "Join Now",
      redirectPath: "/employee-signup",
      to: "join-as-employee",
      infoText:
        "Empowering employees to efficiently manage and access their assigned resources.",
    },
  ];

  return (
    <swiper-container class="mySwiper" navigation="true">
      {slides.map((slide, index) => (
        <swiper-slide key={index}>
          <div className="w-full bg-white text-center py-16 px-6 mx-auto max-w-screen-md min-h-[600px] flex items-center justify-center md:pt-48">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-4">
                {slide.infoText}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {slide.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">{slide.description}</p>
              <div className="flex justify-center gap-4">
                <Link
                  to={slide.to}
                  className="btn px-6 py-3 bg-black text-white rounded-md md:w-40"
                >
                  {slide.buttonText}
                </Link>
                <button className="px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-md hover:bg-gray-200 btn">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default Banner;
