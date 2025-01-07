import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/images/slider images/Treadmill.png";
import image2 from "../../assets/images/slider images/Recumbent Bike.png";
import image3 from "../../assets/images/slider images/Leg Curl Trainer.png";
import image4 from "../../assets/images/slider images/Chest Press.png";
import image5 from "../../assets/images/slider images/Push up Handle.png";
import image6 from "../../assets/images/slider images/Creatine.png";
import image7 from "../../assets/images/slider images/Whey Protein Isolate.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomArrow = ({ className, style, onClick, isNext }) => (
  <div
    className={`${className} !w-12 !h-12 !bg-customPurple hover:!bg-opacity-80 transition-all duration-300 rounded-full flex items-center justify-center before:!content-[''] z-10`}
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onClick={onClick}
  >
    <svg
      className={`w-6 h-6 text-white ${isNext ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

const Slide = ({ image, alt, title }) => (
  <div className="slide p-4">
    <div className="slide-content relative group overflow-hidden rounded-xl h-[400px] transition-all duration-300 transform hover:scale-105">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end items-center pb-8">
        <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
        <button className="bg-customPurple text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2">
          <span>View Details</span>
          <svg
            className="w-5 h-5"
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
);

const images = [
  { src: image1, alt: "Treadmill", title: "Treadmill" },
  { src: image2, alt: "Recumbent Bike", title: "Recumbent Bike" },
  { src: image3, alt: "Leg Curl Trainer", title: "Leg Curl Trainer" },
  { src: image4, alt: "Chest Press", title: "Chest Press" },
  { src: image5, alt: "Push up Handle", title: "Push up Handle" },
  { src: image6, alt: "Creatine", title: "Creatine" },
  { src: image7, alt: "Whey Protein", title: "Whey Protein" },
];

function CustomArrows() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow isNext={true} />,
    prevArrow: <CustomArrow isNext={false} />,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-customNavbar py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-customPurple tracking-wider uppercase">
            Our Products
          </span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-4">
            Featured Equipment
          </h2>
          <div className="w-24 h-1 bg-customPurple mx-auto rounded-full"></div>
        </div>

        <div className="px-4">
          <Slider {...settings}>
            {images.map((image, index) => (
              <Slide
                key={index}
                image={image.src}
                alt={image.alt}
                title={image.title}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default CustomArrows;
