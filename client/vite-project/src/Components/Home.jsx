import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Welcome to the Ultimate Quiz Challenge! 🎯</h1>
      <p className="description">
        Test your knowledge across various topics and climb the leaderboard!  
        Are you ready to prove yourself?
      </p>

      <div className="buttons">
        <button className="start-button" onClick={() => navigate("/Questions")}>
          🏆 Start Quiz
        </button>
        <button className="leaderboard-button" onClick={() => navigate("/leaderboard")}>
          📊 View Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Home;
