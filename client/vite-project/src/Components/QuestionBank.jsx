import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { FaRegStickyNote, FaRocket } from "react-icons/fa";
import "../Styles/QuestionBank.css"; // Import CSS file

// Reusable QuestionBank component
function QuestionBank({ title, category, date, questions, games, progress, link }) {
  const navigate = useNavigate(); // Enables navigation

  return (
    <div className="question-bank" onClick={() => navigate(link)}>
      {/* Progress Circle */}
      <div className="progress-circle">
        <svg className="progress-svg" viewBox="0 0 36 36">
          <circle className="progress-bg" cx="18" cy="18" r="16" fill="none" />
          <circle
            className="progress-bar"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
          />
        </svg>
        <span className="progress-text">{progress}%</span>
      </div>

      {/* Quiz Info */}
      <div className="quiz-info">
        <h3>{title}</h3>
        <span className="quiz-category">{category}</span>
        <p className="quiz-date">{date}</p>

        {/* Questions & Games */}
        <div className="quiz-stats">
          <div><FaRegStickyNote /> <span>{questions} questions</span></div>
          <div><FaRocket /> <span>{games} games</span></div>
        </div>
      </div>
    </div>
  );
}

// Main Component to Render Multiple Quizzes
function QuizDashboard() {
  const quizzes = [
    { title: "Mathematics Quiz", category: "Algebra & Calculus", date: "Wed, 05 Mar 25", questions: 120, games: 3, progress: 45, link: "/Mathematics" },
    { title: "Biology Quiz", category: "Genetics & Evolution", date: "Sat, 12 Apr 25", questions: 180, games: 2, progress: 30, link: "/Biology" },
    { title: "Chemistry Quiz", category: "Organic Chemistry", date: "Tue, 20 May 25", questions: 90, games: 1, progress: 60, link: "/Chemistry" },
    { title: "Physics Quiz", category: "Quantum Mechanics", date: "Fri, 15 Jun 25", questions: 200, games: 4, progress: 75, link: "/Physics" }
  ];

  return (
    <div className="quiz-dashboard">
      {quizzes.map((quiz, index) => (
        <QuestionBank key={index} {...quiz} />
      ))}
    </div>
  );
}

export default QuizDashboard;
