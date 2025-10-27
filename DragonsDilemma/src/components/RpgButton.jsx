import React from 'react';

const RpgButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2 
        bg-blue-500 
        text-white 
        font-bold 
        rounded-lg 
        shadow-md 
        border-b-4 border-blue-700 
        hover:bg-blue-600 
        active:bg-blue-700 
        active:border-b-0 
        active:translate-y-1 
        transform 
        transition-transform 
        duration-150 
        ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );
};

export default RpgButton;
