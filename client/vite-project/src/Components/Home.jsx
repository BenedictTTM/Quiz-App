import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import RightBar from "./RightBar";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
    
      <h1 className="title">The National Science And Maths Quiz🎯</h1>
      <p className="description" style={{color:"red"}}>
      This Is where Champions Are Made🎯
      </p>

      <div className="buttons">

        <button className="register-button" onClick={() => navigate("/Register")}>
          📝 
        </button>
      </div>
      
      <div className="signInBox">
      

      </div>
    </div>
  );
}

export default Home;
