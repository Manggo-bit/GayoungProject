import React from 'react';
import RpgButton from './RpgButton';

const QuizScreen = ({ question, onAnswer1, onAnswer2 }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-between p-8 z-20">
      {/* Question Bubble */}
      <div className="relative max-w-2xl mx-auto mt-16">
        <div className="bg-white text-black p-6 rounded-lg border-4 border-black shadow-lg">
          <p className="text-center text-2xl font-bold">{question || "Which path will you choose?"}</p>
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
      <div className="w-full max-w-3xl mb-16">
        <div className="bg-blue-500 text-white font-bold rounded-lg shadow-md border-b-4 border-blue-700 p-4">
          <div className="flex justify-center items-center gap-4">
            <RpgButton onClick={onAnswer1}>Choice 1</RpgButton>
            <RpgButton onClick={onAnswer2}>Choice 2</RpgButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
