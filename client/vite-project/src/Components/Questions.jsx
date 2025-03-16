import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Questions.css';
import DescriptionAlerts from './DescriptionAlerts';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [alertInfo, setAlertInfo] = useState({ severity: null, message: "" });

    useEffect(() => {
        axios.get('http://localhost:3000/questions')
            .then(result => setQuestions(result.data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer("");
            setAlertInfo({ severity: null, message: "" });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setSelectedAnswer("");
            setAlertInfo({ severity: null, message: "" });
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (selectedAnswer === questions[currentIndex].answer) {
            setAlertInfo({ severity: "success", message: "Correct! Great job!" });
            setScore(prev => prev + 1);
        } else {
            setAlertInfo({ severity: "error", message: `Incorrect! The correct answer is: ${questions[currentIndex].answer}` });
        }
        setTimeout(() => setAlertInfo({ severity: null, message: "" }), 3000);
    };

    if (questions.length === 0) {
        return <p className="loading">Loading questions...</p>;
    }

    const options = Array.isArray(questions[currentIndex].possibleAnswer) ? questions[currentIndex].possibleAnswer : [];

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Professional Quiz</h1>
            {alertInfo.severity && <DescriptionAlerts severity={alertInfo.severity} message={alertInfo.message} />}
            <div className="question-box">
                <p className="question-text"><strong>Q:</strong> {questions[currentIndex].question}</p>
                <form className="options-list">
                    {options.map((option, index) => (
                        <label key={index} className="option">
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => handleAnswerSelect(option)}
                            />
                            {option}
                        </label>
                    ))}
                </form>
                <div className="buttons">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="nav-button">Previous</button>
                    {currentIndex === questions.length - 1 ? (
                        <button onClick={() => alert(`Quiz completed! Your final score is ${score}`)} className="submit-button">
                            Finish
                        </button>
                    ) : (
                        <button onClick={handleNext} className="nav-button">Next</button>
                    )}
                    <button onClick={handleSubmit} disabled={!selectedAnswer} className="submit-button">Submit</button>
                </div>
            </div>
            <div className="score-container">
                <p className="score">Score: {score}</p>
            </div>
        </div>
    );
}

export default Quiz;