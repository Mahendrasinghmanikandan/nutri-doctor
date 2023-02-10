import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authSlice from "./Features/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <div className="home">
        <video preload="auto" autoplay={"autoplay"} loop muted>
          <source src="./video/home.mp4"></source>
        </video>
        <div className="content">
          <Provider store={store}>
            <App />
          </Provider>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

