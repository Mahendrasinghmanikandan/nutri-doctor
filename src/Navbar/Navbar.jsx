import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { change } from "../Features/authSlice";
import { Button } from "@mui/material";
import { Animated } from "react-animated-css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((data) => data.auth.values.user);
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="left-header">
          <Animated
            animationIn="zoomIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <h4>
              <span>N</span>utri <span>D</span>octor
            </h4>
          </Animated>
        </div>
      </div>
      <div className="navbar">
        <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
          <Link to="/dashboard">Home</Link>
        </Animated>
        <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
          <Link to="/chat">Message</Link>
        </Animated>
        {currentUser.status === "customer" ? (
          <Animated
            animationIn="zoomIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <Link to="/weight">Weight Loss</Link>
          </Animated>
        ) : (
          ""
        )}

        <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
          <Button
            onClick={() => {
              dispatch(change({ user: {} }));
              navigation("/login");
            }}
            className="buttons2"
          >
            logout
          </Button>
        </Animated>
      </div>
    </div>
  );
};

export default Navbar;
