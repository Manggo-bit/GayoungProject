import React from 'react';
import defaultBtn from '../../public/assets/ui/btn_rpg_default.png';
import clickedBtn from '../../public/assets/ui/btn_rpg_clicked.png';

const RpgButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-6 py-2 
        text-white 
        font-bold 
        rounded-lg 
        shadow-md 
        border-b-4 border-transparent 
        hover:brightness-110 
        active:border-b-0 
        active:translate-y-1 
        transform 
        transition-transform 
        duration-150 
        ease-in-out
        bg-cover bg-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{
        backgroundImage: `url(${defaultBtn})`,
        ...(disabled ? {} : { 
          '--active-bg-image': `url(${clickedBtn})` 
        })
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundImage = `var(--active-bg-image)`;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundImage = `url(${defaultBtn})`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundImage = `url(${defaultBtn})`;
        }
      }}
    >
      {children}
    </button>
  );
};

export default RpgButton;
