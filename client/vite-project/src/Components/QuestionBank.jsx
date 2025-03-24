import React from "react";
import { FaRegStickyNote, FaRocket } from "react-icons/fa";
import "../Styles/QuestionBank.css"; // Import CSS file

// Reusable QuestionBank component
function QuestionBank({ title, category, date, questions, games, progress }) {
  return (
    <div className="question-bank">
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
    { title: "CBAS 210 Trial Quiz", category: "Academic Writing", date: "Mon, 03 Feb 25", questions: 250, games: 0, progress: 16 },
    { title: "Mathematics Quiz", category: "Algebra & Calculus", date: "Wed, 05 Mar 25", questions: 120, games: 3, progress: 45 },
    { title: "Biology Quiz", category: "Genetics & Evolution", date: "Sat, 12 Apr 25", questions: 180, games: 2, progress: 30 },
    { title: "Chemistry Quiz", category: "Organic Chemistry", date: "Tue, 20 May 25", questions: 90, games: 1, progress: 60 },
    { title: "Physics Quiz", category: "Quantum Mechanics", date: "Fri, 15 Jun 25", questions: 200, games: 4, progress: 75 }
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
