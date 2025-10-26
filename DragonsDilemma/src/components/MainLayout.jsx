import React from 'react';
import RpgButton from './RpgButton';

const MainLayout = () => {
  return (
    <div className="flex w-screen h-screen bg-gray-800 text-white">
      {/* Pet Area (60%) */}
      <div className="w-[60%] h-full bg-gray-700 flex items-center justify-center">
        <p className="text-2xl">Pet Area</p>
      </div>

      {/* UI Menu Area (40%) */}
      <div className="w-[40%] h-full bg-gray-600 flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl mb-4">UI Menu</p>
        <RpgButton onClick={() => alert('Button Clicked!')}>
          Start Quiz
        </RpgButton>
      </div>
    </div>
  );
};

export default MainLayout;
