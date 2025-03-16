import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBookOpen, FaTrophy, FaShoppingBag, FaUsers, FaUserCircle, FaClipboardList, FaTelegramPlane, FaExclamationCircle } from "react-icons/fa";
import "../Styles/Sidebar.css"; // Import styles

const SideBar = () => {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Courses", icon: <FaBookOpen />, path: "/courses" },
    { name: "Question Bank", icon: <FaClipboardList />, path: "/Questions" },
    { name: "Leaderboard", icon: <FaTrophy />, path: "/leaderboard" },
    { name: "Shop", icon: <FaShoppingBag />, path: "/shop" },
    { name: "Account", icon: <FaUserCircle />, path: "/account" },
  ];

  return (
    <div className="sidebar">
      <div className="logo">🟨 <strong>Aquinas</strong></div>

      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.name} className={active === item.name ? "active" : ""} onClick={() => setActive(item.name)}>
            <Link to={item.path} className="menu-item">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="more">
        <h4>MORE</h4>
        <button className="more-btn">
          <FaClipboardList /> View Public Quizzes
        </button>
        <button className="more-btn">
          <FaExclamationCircle /> Report an Issue
        </button>
        <button className="more-btn telegram">
          <FaTelegramPlane /> Use on Telegram
        </button>
      </div>
    </div>
  );
};

export default SideBar;
