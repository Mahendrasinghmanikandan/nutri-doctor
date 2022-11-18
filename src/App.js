import React from "react";
import Register from "./pages/auth/Register";
import "./Styles/auth.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
const App = () => {
  return (
    <div>
      <div className="home">
        <video preload="auto" autoplay={"autoplay"} loop muted>
          <source src="./video/home2.mp4"></source>
        </video>
        <div className="content">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
