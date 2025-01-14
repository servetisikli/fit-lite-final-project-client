import React from "react";
import dumbbellImage from "../../assets/images/background images/Gym equipment.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-gray-900 to-purple-900 text-white flex flex-col items-center  mx-auto px-4 py-8 mt-20 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40">
      <header className="bg-gray-900 w-full py-5 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
      </header>
      <section className="flex flex-col md:flex-row justify-around items-center w-4/5 my-10 bg-purple-800 rounded-lg p-10">
        <div className="md:w-1/2 mb-5 md:mb-0 md:pr-10">
          <h2 className="text-3xl font-semibold mb-5">
            Welcome to Fitlite Online Store
          </h2>
          <p className="text-lg leading-relaxed mb-5">
            At Fitlite, we believe that fitness is a journey, not a destination.
            We provide top-quality fitness equipment designed to help you
            achieve your health goals and live your best life. From beginners to
            seasoned athletes, our range of products caters to all fitness
            levels.
          </p>
          <p className="text-lg leading-relaxed">
            With a commitment to quality and customer satisfaction, we bring the
            best fitness solutions right to your doorstep. Let us be part of
            your fitness story.
          </p>
        </div>
        <div className="md:w-1/2 text-center">
          <img
            src={dumbbellImage}
            alt="Dumbbell"
            className="max-w-full rounded-lg border-4 border-purple-200"
          />
        </div>
      </section>
      <footer className="bg-gray-900 w-full py-3 text-center">
        <p className="text-sm">
          &copy; 2025 Fitlite Online Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
