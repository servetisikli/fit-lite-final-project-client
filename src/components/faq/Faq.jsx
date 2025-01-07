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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
