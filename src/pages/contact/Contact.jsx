import React, { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import logo from "../../assets/images/logo.png";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSuccessMessage("Your message was sent, thank you!");
      setErrorMessage("");
      setFormState({ name: "", email: "", subject: "", message: "" });
    } else {
      setErrorMessage("Please fill in all required fields.");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
      <div className=" w-full container mx-auto px-6 overflow-hidden ">
        <div className="text-center mb-28"></div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl flex flex-wrap bg-customNavbar shadow-lg rounded-lg overflow-hidden">
            {/* Contact Form */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Write us
              </h3>
              {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 mb-4">{successMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="6"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 text-white rounded shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="w-full md:w-1/2  bg-gradient-to-br from-customPurple to-customNavbar text-white p-6">
              <h3 className="text-lg font-semibold mb-4">
                Contact information
              </h3>
              <p className="mb-6">
                We're open for any suggestion or just to have a chat.
              </p>
              <div className="mb-6 flex items-start">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                  <span className="text-orange-500 fas fa-map-marker-alt"></span>
                </div>
                <p className="ml-4 mt-3">
                  Address:{" "}
                  <span className="ml-2 text-orange-500">
                    Königstr.11, 78050 Berlin
                  </span>
                </p>
              </div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <PermPhoneMsgIcon></PermPhoneMsgIcon>
                  <span className="text-orange-500 fas fa-phone"></span>
                </div>
                <p className="ml-4">
                  Phone:{" "}
                  <a href="tel://1234567920" className="text-orange-500 ml-2">
                    +49 123456789
                  </a>
                </p>
              </div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <EmailIcon></EmailIcon>
                  <span className="text-orange-500 fas fa-paper-plane"></span>
                </div>
                <p className="ml-4">
                  Email:{" "}
                  <a
                    href="mailto:info@yoursite.com"
                    className="text-orange-500 ml-2"
                  >
                    fitlite@web-test.de
                  </a>
                </p>
              </div>
              <div className="mb-4 flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <LanguageIcon></LanguageIcon>
                  <span className="text-orange-500 fas fa-globe"></span>
                </div>
                <p className="ml-4">
                  Website:{" "}
                  <a href="#" className="text-orange-500 ml-2">
                    www.fitLite.com
                  </a>
                </p>
              </div>
              <img src={logo} className="w-48 mx-auto mt-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
