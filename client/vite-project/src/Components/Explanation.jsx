import React, { useEffect, useState } from 'react';

function Explanation({ question }) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (!question) return; // Prevent fetching if there's no question

    async function fetchAnswer() {
      try {
        const response = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: question.question }) // Ensure we send the actual text
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
      <h2>AI Generated Answer:</h2>
      <p>{answer || "Loading..."}</p>
    </div>
  );
}

export default Explanation;
