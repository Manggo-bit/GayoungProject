import React, { useState, useEffect, useCallback } from 'react';
import RpgButton from './RpgButton';
import { initDB, getPet, savePet } from '../data/db';
import { useQuizLimit } from '../hooks/useQuizLimit';

const PET_ID = 1;
const MAX_QUIZ_ATTEMPTS = 5;

const MainLayout = () => {
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useQuizLimit hook is now conditional
  const { 
    isLoading: isQuizLimitLoading, 
    hasRemainingAttempts, 
    quizCountToday 
  } = useQuizLimit(pet ? PET_ID : null);

  const loadGameData = useCallback(async () => {
    try {
      await initDB();
      const existingPet = await getPet(PET_ID);
      if (existingPet) {
        setPet(existingPet);
      }
    } catch (error) {
      console.error("Failed to load game data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  const createNewPet = async () => {
    const newPet = {
      pet_id: PET_ID,
      type: 'dragon',
      phase: 1,
      stats: { wisdom: 10, aggression: 10 },
      quiz_count_total: 0,
      quiz_count_today: 0,
      last_quiz_date: new Date().toISOString().slice(0, 10),
    };
    try {
      await savePet(newPet);
      setPet(newPet);
    } catch (error) {
      console.error("Failed to create new pet:", error);
    }
  };

  if (isLoading) {
    return <div className="flex w-screen h-screen bg-gray-900 text-white items-center justify-center"><p className="text-3xl">Loading Game...</p></div>;
  }

  if (!pet) {
    return (
      <div className="flex w-screen h-screen bg-gray-800 text-white items-center justify-center">
        <RpgButton onClick={createNewPet}>
          Create Your First Pet
        </RpgButton>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen bg-gray-800 text-white">
      {/* Pet Area (60%) */}
      <div className="w-[60%] h-full bg-gray-700 flex items-center justify-center">
        <p className="text-2xl">Pet Area</p>
      </div>

      {/* UI Menu Area (40%) */}
      <div className="w-[40%] h-full bg-gray-600 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold mb-4">Pet Stats</h2>
          <div className="text-xl">
            <p>Wisdom: {pet.stats.wisdom}</p>
            <p>Aggression: {pet.stats.aggression}</p>
          </div>
          <div className="mt-6 text-xl">
            <h3 className="text-2xl font-bold mb-2">Dilemma Quiz</h3>
            {isQuizLimitLoading ? (
              <p>Loading quiz attempts...</p>
            ) : (
              <p>Today's Attempts: {quizCountToday} / {MAX_QUIZ_ATTEMPTS}</p>
            )}
          </div>
          <div className="mt-6">
            <RpgButton onClick={() => alert('Button Clicked!')} disabled={!hasRemainingAttempts}>
              {hasRemainingAttempts ? 'Start Quiz' : 'No Attempts Left'}
            </RpgButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
