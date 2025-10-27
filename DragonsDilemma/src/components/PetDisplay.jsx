import React from 'react';
import getPetImageUrl from '../utils/getPetImageUrl';

const PetDisplay = ({ pet }) => {
  if (!pet) {
    return null; // Or a placeholder
  }

  const imageUrl = getPetImageUrl(pet);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {imageUrl ? (
        <img src={imageUrl} alt={`A ${pet.type} in phase ${pet.phase}`} className="max-w-full max-h-full object-contain" />
      ) : (
        <p className="text-2xl">Pet image not available for this phase.</p>
      )}
    </div>
  );
};

export default PetDisplay;
