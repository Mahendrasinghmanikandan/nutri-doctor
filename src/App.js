import React from "react";
import Register from "./pages/auth/Register";
import "./Styles/auth.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import _ from "lodash";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Weight from "./pages/Weight";
const App = () => {
  return (
    <div>
      <div className="home">
        <video preload="auto" autoplay={"autoplay"} loop muted>
          <source src="./video/home.mp4"></source>
        </video>
        <div className="content">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/weight" element={<Weight />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
