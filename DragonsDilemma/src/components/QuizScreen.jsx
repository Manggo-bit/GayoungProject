import React, { useState, useEffect } from 'react';
import RpgButton from './RpgButton';
import quizData from '../data/dilemmaContent.json';

// To prevent showing the same quiz consecutively
let lastQuizIndex = -1;

const QuizScreen = ({ pet, onQuizComplete }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    let randomIndex;
    if (quizData.length > 1) {
      do {
        randomIndex = Math.floor(Math.random() * quizData.length);
      } while (randomIndex === lastQuizIndex);
    } else {
      randomIndex = 0;
    }

    lastQuizIndex = randomIndex;
    setCurrentQuiz(quizData[randomIndex]);
  }, []);

  if (!currentQuiz) {
    // You can render a loading state here
    return <div>Loading quiz...</div>;
  }

  const { question, options, results } = currentQuiz;

  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-around p-8 z-20">
      {/* Question Bubble */}
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white text-black p-6 rounded-lg border-4 border-black shadow-lg">
          <p className="text-center text-2xl font-bold">{question}</p>
        </div>
        {/* Bubble tail */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '20px solid black',
            bottom: '-20px'
          }}
        ></div>
      </div>

      {/* Answer Frame */}
      <div className="w-full max-w-3xl">
        <div className="bg-blue-500 text-white font-bold rounded-lg shadow-md border-b-4 border-blue-700 p-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {options.map((option, index) => (
              <RpgButton key={index} onClick={() => onQuizComplete(results[index])}>
                {option}
              </RpgButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
