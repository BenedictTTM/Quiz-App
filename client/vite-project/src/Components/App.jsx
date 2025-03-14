import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Questions from "./Questions";
import "../Styles/styles.css"; // Import external CSS file


function App() {
  return (
    
    <Router styles={{ backgroundColor: "black" }}>
      
      <div className="container">
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/about" className="nav-item">About</Link></li>
            <li><Link to="/questions" className="nav-item">Questions</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions" element={<Questions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

