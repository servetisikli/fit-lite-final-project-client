import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibleEye, setVisibleEye] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fit-lite-final-project-server.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data) {
        const { token, ...user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser({ ...user, token });
        navigate("/"); // Redirect to home or any other page
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-customLightPurple flex items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto bg-customNavbar rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-5/12 bg-gradient-to-br from-customPurple to-customNavbar p-12 text-white flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg opacity-90">
            To keep connected with us, please login into your personal account.
          </p>
          <div className="mt-8 text-sm opacity-70">
            <p>Current Date and Time (UTC):</p>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-7/12 bg-customNavbar p-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Login</h2>
            <CancelPresentationOutlinedIcon
              className="text-customPurple hover:text-white transition-colors duration-300 cursor-pointer text-3xl"
              onClick={() => navigate("/")}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={loginSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-customPurple transition-colors duration-300"
                required
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
                required
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="#"
                className="text-sm text-white/70 hover:text-customPurple transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-customPurple text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-white/70">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-customPurple hover:text-white transition-colors duration-300"
              >
                Sign up
              </Link>
            </div>
          </form>

          {/* Login Info */}
          <div className="mt-8 text-center text-white/50 text-sm">
            <p>
              Current User:{" "}
              {localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).email
                : "Not logged in"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
