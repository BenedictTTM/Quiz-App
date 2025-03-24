import React, { useState, useEffect } from "react";
import RightBar from "./RightBar";
import "../Styles/Hom.css"; // Import CSS file
import Skelet from "./Skelet";

function Hom() {
  const [ranQuote, setRanQuote] = useState(0);
  const [rightbar, setRightBar] = useState(true);

  const Books = [
    { name: "Campbell Biology", img: "/img1.png" },
    { name: "Mathematical Biology", img: "/img2.png" },
  ];

  const scienceQuotes = [
    "Science and everyday life cannot and should not be separated. — Rosalind Franklin",
    "Somewhere, something incredible is waiting to be known. — Carl Sagan",
    "The good thing about science is that it's true whether or not you believe in it. — Neil deGrasse Tyson",
  ];

  function getRandomNumber() {
    return Math.floor(Math.random() * scienceQuotes.length);
  }

  useEffect(() => {
    setRanQuote(getRandomNumber());
    const interval = setInterval(() => {
      setRanQuote(getRandomNumber());
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // Effect to toggle RightBar based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setRightBar(false); // Hide RightBar on small screens
      } else {
        setRightBar(true);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="HomePage">
      <Skelet></Skelet>
      {rightbar && <RightBar />} {/* Conditionally render RightBar */}
      
      <div className="Box">
        <p className="motiQuote">{scienceQuotes[ranQuote]}</p>
        <ul className="book-list">
          {Books.map((book, index) => (
            <li key={index} className="book-item">
              <img src={book.img} alt={book.name} width="100" />

              <p className="bookname">{book.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Hom;
