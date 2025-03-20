import React, { useEffect, useState } from "react";
import "../Styles/Explanation.css";

function Explanation({ question }) {
  const [answer, setAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!question) return; // Prevent fetching if there's no question

    async function fetchAnswer() {
      try {
        const response = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: question.question }), // Send the actual text
        });

        const data = await response.json();
        setAnswer(data.answer || "No explanation available.");
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAnswer("Error loading answer.");
      }
    }

    fetchAnswer();
  }, [question]); // ✅ Re-fetch whenever the question changes

  return (
    <div className="explanation-container">
      {/* Show explanation when button is clicked */}
      {showExplanation && (
        <div className="explanation-box">
          <h2 className="explanation">Explanation:</h2>
          <p className="ai-explanation">{answer || "Loading..."}</p>
        </div>
      )}

      {/* Button to show explanation */}
      {!showExplanation && (
        <button 
          className="show-explanation-btn" 
          onClick={() => setShowExplanation(true)}
        >
          View explanation
        </button>
      )}
    </div>
  );
}

export default Explanation;
