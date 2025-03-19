import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Questions.css';
import Time from './Time';
import Explanation from './Explanation';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);   
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/questions')
            .then(result => setQuestions(result.data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleAnswerSelect = (answer) => {
        if (!isSubmitted) {
            setSelectedAnswer(answer);
        }
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;
        setIsSubmitted(true);

        if (selectedAnswer === questions[currentIndex].answer) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedAnswer("");
                setIsSubmitted(false);
            }
        }, 2000); // Move to the next question after 1.5 seconds
    };

    if (questions.length === 0) {
        return <p className="loading">Loading questions...</p>;
    }

    const options = Array.isArray(questions[currentIndex].possibleAnswer) ? questions[currentIndex].possibleAnswer : [];
    const correctAnswer = questions[currentIndex].answer;

    return (
        <div className="quiz-container">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
            </div>

            <h1 className="quiz-title">Quiz</h1>

            <div className="score-bar">
                <p><strong>{currentIndex + 1} / {questions.length}</strong></p>
                <p>Score: {Math.round((score / questions.length) * 100)}%</p>
            </div>

            <div className="question-box">
                <p className="question-text">{questions[currentIndex].question}</p>
                <form className="options-list">
                    {options.map((option, index) => {
                        let optionClass = "";
                        if (isSubmitted) {
                            if (option === correctAnswer) {
                                optionClass = "correct-answer"; // Green highlight
                            } else if (option === selectedAnswer) {
                                optionClass = "wrong-answer"; // Red highlight
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
                                    disabled={isSubmitted} // Prevent changes after submission
                                />
                                {option}
                            </label>
                        );
                    })}
                </form>

                <div className="buttons">
                    <button onClick={handleSubmit} disabled={!selectedAnswer || isSubmitted} className="submit-button">Submit</button>
                    {currentIndex === questions.length - 1 && isSubmitted ? (
                        <button onClick={() => alert(`Quiz completed! Your final score is ${score}/${questions.length}`)} className="submit-button">
                            Finish
                        </button>
                    ) : null}
              
                </div>
                
            </div>

            <div className="score-container">
                <Explanation question={ questions[currentIndex]}/>
            </div>
        </div>
    );
}

export default Quiz;
