import React from "react";
import "../Styles/Score.css";
import Explanation from "./Explanation";

function Score({ finalScore, totalQuestions, wrongAnswers }) {
  const percentage = Math.round((finalScore / totalQuestions) * 100);

  return (
    <div className="score-container">
      <h2 className="congrats">🎉 Congratulations!!! 🎉</h2>
      <p className="completion-time">You completed the quiz!</p>
      <p className="xp-points">Enjoy an additional <span className="highlight">3 XP pts</span> 🎉</p>

      <div className="score-card">
        <h3 className="score-title">Score</h3>
        <p className="score-text">{finalScore} out of {totalQuestions} questions answered correctly</p>
      </div>

      {/* Wrong Answers Section */}
      {wrongAnswers.length > 0 && (
        <div className="wrong-answers">
          <h3>Incorrect Answers & Solutions</h3>
          <ul>
            {wrongAnswers.map((question, index) => (
             
              <li key={index} className="wrong-answer-item">
                <p><strong>Question:</strong> {question.question}</p>
                <p className="wrong-answer">❌ Your Answer: {question.userAnswer}</p>
                <p className="correct-answer">✅ Correct Answer: {question.answer}</p>
                <p className="solution">
                 
                <div className="solution">
                </div>

                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Score;
