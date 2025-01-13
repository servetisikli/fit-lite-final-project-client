import backgroundImage from "../../assets/images/background images/Gym equipment.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/shop");
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-white text-6xl font-bold mb-6 font-koho transform transition-all duration-700 hover:scale-105">
          FITlite WELCOMES YOU
        </h1>

        {/* Subheading */}
        <p className="text-3xl text-slate-30 font-semibold mb-12 tracking-wide bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          GEAR UP!WORK UP!GLOW UP!
          {/*  GEAR UP! <span className="text-yellow-500">WORK UP! </span>
          <span className="text-yellow-300">GLOW UP!</span> */}
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="group bg-customPurple text-white py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-opacity-90 hover:transform hover:scale-105 w-48 flex items-center justify-center space-x-2">
            <span onClick={handleNavigation}>Shop Now!</span>
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}

export default Header;
