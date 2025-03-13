import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Questions.css'; // Import the CSS file

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/questions')
            .then(result => setQuestions(result.data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer("");
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnswer("");
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (selectedAnswer === questions[currentIndex].answer) {
            alert("✅ Correct answer!");
        } else {
            alert("❌ Wrong answer! Try again.");
        }
    };

    if (questions.length === 0) {
        return <p className="loading">Loading questions...</p>;
    }

    // Convert possibleAnswer string into an array
    const options = questions[currentIndex].possibleAnswer.split(',').map(opt => opt.trim());

    return (
        <div className="quiz-container">
            <h2>Quiz App</h2>
            <div className="question-box">
                <p className="question-text"><strong>Q:</strong> {questions[currentIndex].question}</p>

                {/* Render options as radio buttons */}
                <form className="options-list">
                    {options.map((option, index) => (
                        <div key={index} className="option">
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => handleAnswerSelect(option)}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                </form>

                <div className="buttons">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="nav-button">Previous</button>
                    <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="nav-button">Next</button>
                    <button onClick={handleSubmit} disabled={!selectedAnswer} className="submit-button">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
