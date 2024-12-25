import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Company</h2>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Customer Service</h2>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Order Status
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Follow Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 "
                  style={{ color: "#0077B5" }}
                >
                  <LinkedInIcon className="hover:lg:scale-125" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  style={{ color: "#1877F2" }}
                >
                  <FacebookIcon className="hover:lg:scale-125 " />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  style={{
                    color: "#ac5c38",
                  }}
                >
                  <InstagramIcon className="hover:lg:scale-125" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 "
                  style={{ color: "#d3a3a3" }}
                >
                  <XIcon className="hover:lg:scale-125" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
