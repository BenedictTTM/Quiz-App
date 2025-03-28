import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Home from "./Home";
import Courses from "./Courses";
import Questions from "./Subjects/Biology";
import Leaderboard from "./Leaderboard";
import Shop from "./Shop";
import Account from "./Account";
import Register from "./Register";
import Login from "./LogIn";
import TopNavBar from "./TopNavBar"; // Import the top navbar
import Chemistry from "./Subjects/Chemistry";
import Physics from "./Subjects/Physics";
import Mathematics from "./Subjects/Mathematics";
import Hom from "./Hom"
import QuestionBank from "./QuestionBank";

import "../Styles/App.css"; 
import { FaBars, FaTimes } from "react-icons/fa";

const App = () => {
  const [slide, setSlide] = useState(true);
  const location = useLocation(); // Get current route

  function toggleSide() {
    setSlide(!slide);
  }

  // Define routes where sidebar should be hidden
  const hideSidebarRoutes = ["/", "/register", "/login"];

  return (
    <>
      {/* Toggle button for sidebar (Only show if sidebar is allowed) */}
      {!hideSidebarRoutes.includes(location.pathname) && (
        <button className="toggle-btn" onClick={toggleSide}>
          {slide ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div className="app-container">
        {/* Conditionally render Sidebar */}
        {!hideSidebarRoutes.includes(location.pathname) && slide ? <SideBar /> : null}
        
        <div className="content">
        <TopNavBar /> {/* Add the TopNavBar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hom" element={<Hom />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/biology" element={<Questions />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/account" element={<Account />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chemistry" element={<Chemistry />} />
            <Route path="/mathematics" element={<Mathematics />} />
            <Route path="/physics" element={<Physics />} />
            <Route path="/Questions" element={<QuestionBank />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
