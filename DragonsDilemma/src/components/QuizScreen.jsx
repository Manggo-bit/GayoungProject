import React, { useState, useEffect } from 'react';
import RpgButton from './RpgButton';
import quizData from '../data/dilemmaContent.json';
import dialogFrame from '../assets/ui/ui_dialog_frame.png';

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
      <div
        className="relative max-w-2xl mx-auto p-6 bg-cover bg-center text-black flex items-center justify-center"
        style={{ backgroundImage: `url(${dialogFrame})`, minHeight: '150px' }}
      >
        <p className="text-center text-2xl font-bold">{question}</p>
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
