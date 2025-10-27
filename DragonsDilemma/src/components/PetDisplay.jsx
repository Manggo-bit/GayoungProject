import React from 'react';

const PetDisplay = ({ pet }) => {
  if (!pet) {
    return null; // Or a placeholder
  }

  const getPetImageUrl = (pet) => {
    if (pet.phase === 1) {
      return `/assets/pets/phase1/${pet.type}_p1.png`;
    }
    // Add logic for other phases later
    return null;
  };

  const imageUrl = getPetImageUrl(pet);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {imageUrl ? (
        <img src={imageUrl} alt={`A ${pet.type} egg`} className="max-w-full max-h-full object-contain" />
      ) : (
        <p className="text-2xl">Pet image not available for this phase.</p>
      )}
    </div>
  );
};

export default PetDisplay;
