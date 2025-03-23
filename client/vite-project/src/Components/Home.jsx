import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      <h1 className="title">The National Science And Maths Quiz🎯</h1>
      <p className="description">
      This Is where Champions Are Made🎯
      </p>

      <div className="buttons">

        <button className="register-button" onClick={() => navigate("/Register")}>
          📝 Register
        </button>
      </div>
      
      <div className="signInBox">
      

      </div>
    </div>
  );
}

export default Home;
