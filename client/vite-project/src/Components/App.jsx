import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Home from "./Home";
import Courses from "./Courses";
import Questions from "./Questions";
import Leaderboard from "./Leaderboard";
import Shop from "./Shop";
import Account from "./Account";
import "../Styles/App.css"; // Ensure styles are included

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <SideBar />   {/* Sidebar on the left */}
        <div className="content">
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
