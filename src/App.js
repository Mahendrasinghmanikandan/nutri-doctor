import React from "react";
import Register from "./pages/auth/Register";
import "./Styles/auth.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Weight from "./pages/Weight";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/weight" element={<Weight />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
