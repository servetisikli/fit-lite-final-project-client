import React, { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Category 1",
    image: "https://res.cloudinary.com/dw5lopqza/image/upload/c_thumb,w_200,g_face/v1733251254/Star_Trainer_EAS10_h5rzdx.png",
  },
  {
    id: 2,
    name: "Category 2",
    image: "https://res.cloudinary.com/dw5lopqza/image/upload/c_thumb,w_200,g_face/v1733252257/Medicine_Ball_FTX_ec8uuy.png",
  },
  {
    id: 3,
    name: "Category 3",
    image: "https://res.cloudinary.com/dw5lopqza/image/upload/c_thumb,w_200,g_face/v1733252586/Weight_Plate_FEOEEL_tfnyeo.png",
  },
  {
    id: 4,
    name: "Category 4",
    image: "https://res.cloudinary.com/dw5lopqza/image/upload/c_thumb,w_200,g_face/v1733252578/Dumbell_ENDURENCE_hxvtx2.png",
  },
  {
    id: 5,
    name: "Category 5",
    image: "https://res.cloudinary.com/dw5lopqza/image/upload/c_thumb,w_200,g_face/v1733231586/Ergometer_Evo-1_r4mlvo.png",
  },
  {
    id: 6,
    name: "Category 6",
    image: "https://res.cloudinary.com/dw5lopqza/image/upload/c_thumb,w_200,g_face/v1733254945/healthy-1283793_1280_ghgky9.jpg",
  },
];

const CategoryList = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="bg-customLightPurple py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
            Discover Our Collection
          </span>
          <h1 className="text-5xl font-bold text-black mt-2 mb-4">
            Shop by Category
          </h1>
          <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-50 flex flex-col justify-center items-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {category.name}
                  </h2>
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-customPurple text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2 hover:scale-105">
                      <span>View Category</span>
                      <svg
                        className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
