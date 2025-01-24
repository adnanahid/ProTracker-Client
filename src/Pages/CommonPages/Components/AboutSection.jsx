import Lottie from "lottie-react";
import React from "react";
import aboutAnimation from "../../../../public/animation/aboutAnimation.json";

const AboutSection = () => {
  return (
    <section className="py-12 my-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Animation */}
          <div className="hidden md:flex flex-1 mb-6 lg:mb-0">
            <Lottie
              animationData={aboutAnimation}
              className="w-full h-72 lg:w-96 lg:h-auto mx-auto"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-6 border-b-4 border-gray-600 pb-3">
              About Us
            </h2>
            <p className="text-lg leading-relaxed shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              Welcome to our platform! This website is designed to streamline
              and enhance the management of assets and employees. Whether you're
              an HR manager or an employee, our user-friendly tools and features
              ensure a seamless experience.
            </p>
            <p className="text-lg leading-relaxed shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              As an HR manager, you'll have access to tools that help you
              efficiently manage your team, track assets, and stay organized.
              Employees can easily access and track company resources, ensuring
              transparency and ease of use.
            </p>
            <p className="text-lg leading-relaxed shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              Join us today and discover how we can simplify your workflow and
              make management effortless!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
