import React from "react";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import "../Styles/TopNavBar.css";

function TopNavBar() {
  const [darkmode, setDarkmode] = React.useState(false);
  
  const toggleDarkmode = () => {
    setDarkmode(!darkmode);
  };
   
 

  return (
    <div className="top-nav">
      <button className="nav-button home-button">
        <FaHome className="icon" />
      </button>
      <button className="nav-button darkmode-button" onClick={toggleDarkmode}>
        {darkmode ? <FaMoon className="icon" /> : <FaSun className="icon" />}
      </button>
    </div>
  );
}

export default TopNavBar;


