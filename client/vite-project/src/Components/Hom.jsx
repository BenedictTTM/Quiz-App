import React, { useState, useEffect } from "react";
import RightBar from "./RightBar";
import "../Styles/Hom.css";
import Skelet from "./Skelet";

function Hom() {
  const [ranQuote, setRanQuote] = useState(0);
  const [rightbar, setRightBar] = useState(window.innerWidth >= 800);
  const [fade, setFade] = useState(false);

  const Books = [
    { name: "Campbell Biology", img: "/img1.png" },
    { name: "Mathematical Biology", img: "/img2.png" },
  ];

  const scienceQuotes = [
    "Science and everyday life cannot and should not be separated. — Rosalind Franklin",
    "Somewhere, something incredible is waiting to be known. — Carl Sagan",
    "The good thing about science is that it's true whether or not you believe in it. — Neil deGrasse Tyson",
  ];

  useEffect(() => {
    const getRandomNumber = () => Math.floor(Math.random() * scienceQuotes.length);

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setRanQuote(getRandomNumber());
        setFade(false);
      }, 2000); // Slow transition (2s)
    }, 7000); // Changes every 7 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setRightBar(window.innerWidth >= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="HomePage">
      <h3 className="welcome-message">👋 Welcome Back!</h3>
      {rightbar && <RightBar />}

      <div className="Box">
        <p className={`motiQuote ${fade ? "fade-out" : "fade-in"}`}>
          {scienceQuotes[ranQuote]}
        </p>

        
      </div>
    </div>
  );
}

export default Hom;
