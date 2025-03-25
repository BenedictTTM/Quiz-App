import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Questions.css"; 

import Explanation from "../Explanation";
import Score from "../Score";
import Skelet from "../Skelet";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [allWrongAnswers, setAllWrongAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [dragging, setDragging] = useState(false);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    
    console.log("API URL:", apiUrl);
    
    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`${apiUrl}/questions/biology`)
                .then((result) => {
                    const shuffledQuestions = shuffleArray(result.data).slice(0, 10); // Get only 10 questions
                    setQuestions(shuffledQuestions);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching theee questions:", error);
                    setLoading(false);
                });
        }, 3000);
    }, []);
    

    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled
    };

    const handleAnswerSelect = (answer) => {
        if (!isSubmitted) {
            setSelectedAnswer(answer);
        }
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;
        setIsSubmitted(true);
        const currentQuestion = questions[currentIndex];

        if (selectedAnswer === currentQuestion.answer) {
            setScore((prev) => prev + 1);
        } else {
            setAllWrongAnswers((prev) => [
                ...prev,
                { ...currentQuestion, userAnswer: selectedAnswer }
            ]);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer("");
            setIsSubmitted(false);
        } else {
            setQuizCompleted(true);
        }
    };

    if (loading) {
        return <Skelet />;
    }

    if (quizCompleted) {
        return (
            <div className="score-container">
                <Score 
                    finalScore={score} 
                    totalQuestions={questions.length} 
                    wrongAnswers={allWrongAnswers} 
                />
            </div>
        );
    }

    const options = Array.isArray(questions[currentIndex]?.possibleAnswer)
        ? questions[currentIndex].possibleAnswer
        : [];

    const correctAnswer = questions[currentIndex]?.answer;

    const handleDragStart = (e) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleDrag = (e) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });
    };

    const handleDragEnd = () => {
        setDragging(false);
    };

    return (
        <div className="quiz-container" onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: questions.length > 0 ? `${((currentIndex + 1) / questions.length) * 100}%` : "0%" }}
                ></div>
            </div>

            <h1 className="quiz-title">Biology Quiz</h1>

            <div className="score-bar">
                <p>
                    <strong>
                        {currentIndex + 1} / {questions.length}
                    </strong>
                </p>
                <p>Score: {questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%</p>
            </div>

            <div className="question-box">
                <p className="question-text">
                    {questions.length > 0 ? questions[currentIndex].question : "Loading question..."}
                </p>
                <form className="options-list">
                    {options.map((option, index) => {
                        let optionClass = "";
                        if (isSubmitted) {
                            if (option === correctAnswer) {
                                optionClass = "correct-answer";
                            } else if (option === selectedAnswer) {
                                optionClass = "wrong-answer";
                            }
                        }
                        return (
                            <label key={index} className={`option ${optionClass}`}>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => handleAnswerSelect(option)}
                                    disabled={isSubmitted}
                                />
                                {option}
                            </label>
                        );
                    })}
                </form>

                <div className="buttons">
                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedAnswer}
                            className="submit-button"
                        >
                            Submit
                        </button>
                    ) : (
                        <>
                            <button onClick={handleNext} className="next-button">
                                {currentIndex < questions.length - 1 ? "Next" : "Finish"}
                            </button>

                            <div
                                className="explanation-container"
                                style={{ top: `${position.y}px`, left: `${position.x}px` }}
                                onMouseDown={handleDragStart}
                            >
                                <Explanation question={questions[currentIndex]} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
