import React, { useEffect, useState } from "react";
import "../Styles/Explanation.css";

function Explanation({ question }) {
  const [answer, setAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!question || !showExplanation) return;

    async function fetchAnswer() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: question.question }),
        });

        const data = await response.json();
        setAnswer(data.answer || "No explanation available.");
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAnswer("Error loading answer.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnswer();
  }, [question, showExplanation]); 

  return (
    <div className="explanation-container">
      {showExplanation ? (
        <div className="explanation-box">
          <h2 className="explanation">Explanation:</h2>
          <p className="ai-explanation">
            {isLoading ? "Loading..." : answer}
          </p>
        </div>
      ) : (
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