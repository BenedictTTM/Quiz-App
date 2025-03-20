import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Home from "./Home";
import Courses from "./Courses";
import Questions from "./Questions";
import Leaderboard from "./Leaderboard";

import Shop from "./Shop";
import Account from "./Account";
import TopNavBar from "./TopNavBar"; // Import the top navbar
import "../Styles/App.css"; // Ensure styles are included

import {
 FaBars, FaTimes
} from "react-icons/fa";




const App = () => {
  const[slide,setSlide]=useState(true)
  function toggleSide(){
    setSlide(!slide)
  }
  return (
      <Router>
<button className="toggle-btn" onClick={toggleSide}>
  {slide ? <FaTimes /> : <FaBars />}
</button>

        <div className="app-container">
          {slide? <SideBar />:null}
          <div className="content">
            <TopNavBar /> {/* Add the TopNavBar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/Questions" element={<Questions />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
