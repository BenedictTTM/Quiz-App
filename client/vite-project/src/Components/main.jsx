import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../Styles/Styles.css";
import "../Styles/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Login from "./LogIn";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Main App Component */}
        <Route path="/*" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>
);
