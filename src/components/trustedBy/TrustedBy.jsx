import React from "react";

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
              src="https://via.placeholder.com/100"
              alt="Logo 1"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src="https://via.placeholder.com/100"
              alt="Logo 2"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src="https://via.placeholder.com/100"
              alt="Logo 3"
              className="h-20 md:h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110">
            <img
              src="https://via.placeholder.com/100"
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
