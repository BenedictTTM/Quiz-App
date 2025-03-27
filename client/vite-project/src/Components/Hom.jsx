import React, { useState, useEffect } from "react";
import RightBar from "./RightBar";
import "../Styles/Hom.css";


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
    "Equipped with his five senses, man explores the universe around him and calls the adventure Science. — Edwin Hubble",
    "The important thing is to never stop questioning. — Albert Einstein",
    "Nature composes some of her loveliest poems for the microscope and the telescope. — Theodore Roszak",
    "The scientist is not a person who gives the right answers, but one who asks the right questions. — Claude Lévi-Strauss",
    "Science knows no country, because knowledge belongs to humanity, and is the torch which illuminates the world. — Louis Pasteur",
    "Everything is theoretically impossible until it is done. — Robert A. Heinlein",
    "If I have seen further, it is by standing on the shoulders of giants. — Isaac Newton",
    "Science is the great antidote to the poison of enthusiasm and superstition. — Adam Smith",
    "The universe is under no obligation to make sense to you. — Neil deGrasse Tyson",
    "Not only is the Universe stranger than we think, it is stranger than we can think. — Werner Heisenberg",
    "Science is a way of thinking much more than it is a body of knowledge. — Carl Sagan",
    "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom. — Isaac Asimov",
    "The only way to discover the limits of the possible is to go beyond them into the impossible. — Arthur C. Clarke",
    "Somewhere, something incredible is waiting to be known. — Carl Sagan",
    "We cannot solve our problems with the same thinking we used when we created them. — Albert Einstein",
    "Science and technology revolutionize our lives, but memory, tradition, and myth frame our response. — Arthur M. Schlesinger Jr.",
    "Dream big. Start small. Act now. — Robin Sharma"
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
