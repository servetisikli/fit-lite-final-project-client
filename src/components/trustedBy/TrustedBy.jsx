import React from "react";
import Crossfit from "../../assets/logos/Crossfit.jpg";
import BodyMatters from "../../assets/logos/Body Matters.jpg";
import Odujelo from "../../assets/logos/ODUJEL0.jpg";
import Workout from "../../assets/logos/Workout.png";

const TrustedBy = () => {
  return (
    <div className="bg-white py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
            Our Partners
          </span>
          <h2 className="text-5xl font-bold text-black mt-2 mb-4">
            Trusted by Industry Leaders
          </h2>
          <div className="w-24 h-1 bg-black mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src={Crossfit}
              alt="Logo 1"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src={BodyMatters}
              alt="Logo 2"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src={Odujelo}
              alt="Logo 3"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src={Workout}
              alt="Logo 4"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
