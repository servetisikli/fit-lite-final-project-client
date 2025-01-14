import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibleEye, setVisibleEye] = useState(false);
  const navigate = useNavigate();

  const userData = { username: name, email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fit-lite-final-project-server.onrender.com/api/auth/register",
        userData
      );
      if (response.data) {
        navigate("/login");
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-customLightPurple flex items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto bg-customNavbar rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-5/12 bg-gradient-to-br from-customPurple to-customNavbar p-12 text-white flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-6">Hello!</h1>
          <p className="text-lg opacity-90">
            Enter your personal details and start your training with us.
          </p>
        </div>

        <div className="md:w-7/12 bg-customNavbar p-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Sign Up</h2>
            <CancelPresentationOutlinedIcon
              className="text-customPurple hover:text-white transition-colors duration-300 cursor-pointer text-3xl"
              onClick={() => navigate("/")}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                name="Username"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-customPurple transition-colors duration-300"
              />
              <PersonIcon className="absolute right-4 top-3.5 text-customPurple" />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-customPurple transition-colors duration-300"
              />
              <MailOutlineOutlinedIcon className="absolute right-4 top-3.5 text-customPurple" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={visibleEye ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-customPurple transition-colors duration-300"
              />
              <span
                onClick={() => setVisibleEye(!visibleEye)}
                className="absolute right-4 top-3.5 text-customPurple cursor-pointer"
              >
                {visibleEye ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-customPurple text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center text-white/70">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-customPurple hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
