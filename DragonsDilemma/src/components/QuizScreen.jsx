import React from 'react';
import RpgButton from './RpgButton';

// A dummy quiz question. In a real app, this would come from a database or a service.
const quizData = {
  question: "A lost child is crying. What do you do?",
  choices: [
    {
      text: "Help the child find their parents.",
      stats: { wisdom: 1, aggression: 0 }
    },
    {
      text: "Ignore the child and continue on your way.",
      stats: { wisdom: -1, aggression: 1 }
    }
  ]
};

const QuizScreen = ({ pet, onQuizComplete }) => {
  const { question, choices } = quizData;

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
            {choices.map((choice, index) => (
              <RpgButton key={index} onClick={() => onQuizComplete(choice.stats)}>
                {choice.text}
              </RpgButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
