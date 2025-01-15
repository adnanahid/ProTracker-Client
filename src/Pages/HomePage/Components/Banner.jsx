import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import hrBanner from "../../../assets/images/hr2.jpg";
import employeeBanner from "../../../assets/images/employee2.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const slides = [
    {
      title: "Join as HR Manager",
      description: "Manage assets and employees effortlessly.",
      buttonText: "Join Now",
      redirectPath: "/hr-manager-signup",
      bgImage: hrBanner,
      to: "/join-as-hr",
    },
    {
      title: "Join as Employee",
      description: "Access and track company assets easily.",
      buttonText: "Join Now",
      redirectPath: "/employee-signup",
      bgImage: employeeBanner,
      to: "join-as-employee",
    },
  ];

  return (
    <swiper-container class="mySwiper" navigation="true">
      {slides.map((slide, index) => (
        <swiper-slide key={index}>
          <div
            className="w-full min-h-screen text-gray-100"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-center w-full min-h-screen ">
              <div className="md:w-6/12 mx-auto opacity-80 py-16 rounded-3xl bg-black bg-opacity-80 p-6 text-center">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.description}</p>
                <Link
                  to={slide.to}
                  className="btn px-6 py-3 bg-black text-white rounded-md md:w-40"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default Banner;
