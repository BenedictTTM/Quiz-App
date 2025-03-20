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
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer("");
            setIsSubmitted(false);
        }
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
                            onClick={() => {
                                handleSubmit();
                                setIsSubmitted(true);
                            }}
                            disabled={!selectedAnswer} 
                            className="submit-button"
                        >
                            Submit
                        </button>
                    ) : (
                        <>
                            {currentIndex < questions.length - 1 ? ( 
                                <button 
                                    onClick={handleNext} 
                                    className="next-button"
                                >
                                    Next
                                </button>
                            ) : (
                                <button 
                                    onClick={() => alert(`Quiz completed! Your final score is ${score}/${questions.length}`)} 
                                    className="submit-button"
                                >
                                    Finish
                                </button>
                            )}
                             <div className='Explanation-containner '> 
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
