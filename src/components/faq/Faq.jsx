import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Faq() {
  return (
    <div className="bg-customNavbar py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        {" "}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-customPurple tracking-wider uppercase">
            GOT QUESTION?
          </span>
          <h1 className="text-5xl font-bold text-white mt-2 mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-customPurple mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4">
          {" "}
          <Accordion
            sx={{
              backgroundColor: "#FFFFFF",
              color: "black",
              borderRadius: "0.75rem !important",
              "&:before": {
                display: "none",
              },
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#B433FF" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h2 className="text-lg font-semibold">Why FitLite?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-gray-600">
                At FitLite, our goal is to empower fitness enthusiasts by
                providing optimal equipment tailored to their needs. We believe
                everyone should have the opportunity to build their own training
                and fitness gym at home with ease and efficiency. Our carefully
                designed products are crafted to deliver the best experience,
                ensuring durability, functionality, and style. Whether you're
                starting your fitness journey or enhancing your setup, FitLite
                has the tools to help you succeed. We prioritize quality and
                innovation, making it easy for our customers to achieve their
                goals. With FitLite, you can transform any space into a personal
                gym that supports your health and well-being. Join us in
                creating a fitness lifestyle that fits your home, your goals,
                and your life.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              backgroundColor: "#FFFFFF",
              color: "black",
              borderRadius: "0.75rem !important",
              "&:before": {
                display: "none",
              },
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#B433FF" }} />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h2 className="text-lg font-semibold">
                How do I become a member?
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-gray-600">
                Becoming a FitLite member is quick and easy! Start by visiting
                our website and sign up. Once you've completed the sign-up
                process, then navigating to the "Membership" section. From
                there, fill out a simple registration form with your details,
                and choose the membership plan that best suits your needs.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              backgroundColor: "#FFFFFF",
              color: "black",
              borderRadius: "0.75rem !important",
              "&:before": {
                display: "none",
              },
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#B433FF" }} />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <h2 className="text-lg font-semibold">
                What are the benefits of being a member?
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-gray-600">
                You will gain access to exclusive perks, including member-only
                discounts, early access to new products, and personalized
                fitness tips. As a member, you'll be part of a community that is
                passionate about fitness and dedicated to achieving their goals.
                Whether you're setting up your first home gym or upgrading your
                equipment, we are here to support you every step of the way. Do
                nott wait—join today and unlock the full FitLite experience!
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
