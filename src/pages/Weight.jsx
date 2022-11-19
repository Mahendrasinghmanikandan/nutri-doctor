/* eslint-disable jsx-a11y/alt-text */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Animated } from "react-animated-css";
import "../Styles/dashboard.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
const Weight = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div style={{ padding: "10px" }}>
        <Typography
          sx={{ textAlign: "left", padding: "20px" }}
          className="display-products"
          variant="h4"
        ></Typography>
        <Stack spacing={4}>
          <Animated
            animationIn="zoomIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="display-products">
                  Weight Loss Tips
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {[
                  "Do not skip breakfast. Skipping breakfast will not help you lose weight",
                  "Eat regular meals. ...",
                  "Eat plenty of fruit and veg. ...",
                  "Get more active. ...",
                  "Drink plenty of water. ...",
                  "Eat high fibre foods. ...",
                  "Read food labels. ...",
                  "Use a smaller plate.",
                ].map((res) => {
                  return (
                    <Animated
                      animationIn="zoomIn"
                      animationOut="fadeOut"
                      isVisible={true}
                    >
                      <Typography
                        sx={{ textAlign: "left", padding: "20px" }}
                        className="display-products"
                        variant="h4"
                      >
                        {res}
                      </Typography>
                    </Animated>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Animated>
          <Animated
            animationIn="zoomIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="display-products">
                  Why i'm not losing weight
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {[
                  "You’re way overestimating your muscle weight.",
                  "You’re eating less, but still picking unhealthy foods.",
                  "You’re not keeping track of what you’re eating.",
                  " You’re not eating enough plant-based protein.",
                  "You’re not looking at the big picture.",
                  "You’re not eating whole foods.",
                  "You’re eating too many “healthy” foods.",
                  "Your cardio isn’t intense enough.",
                ].map((res) => {
                  return (
                    <Animated
                      animationIn="zoomIn"
                      animationOut="fadeOut"
                      isVisible={true}
                    >
                      <Typography
                        sx={{ textAlign: "left", padding: "20px" }}
                        className="display-products"
                        variant="h4"
                      >
                        {res}
                      </Typography>
                    </Animated>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Animated>
        </Stack>
      </div>
    </div>
  );
};

export default Weight;
