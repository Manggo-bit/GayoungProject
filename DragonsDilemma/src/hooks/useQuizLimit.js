import { useState, useEffect, useCallback } from 'react';
import { getPet, savePet } from '../data/db';

const getQuizLimitByPhase = (phase) => {
  if (phase === 1) return 3;
  if (phase === 2) return 4;
  return 5;
};

export const useQuizLimit = (pet_id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizCountToday, setQuizCountToday] = useState(0);
  const [hasRemainingAttempts, setHasRemainingAttempts] = useState(false);
  const [quizLimit, setQuizLimit] = useState(getQuizLimitByPhase(1));

  const checkQuizLimit = useCallback(async () => {
    if (!pet_id) return;

    setIsLoading(true);
    try {
      let pet = await getPet(pet_id);
      if (pet) {
        const today = new Date().toISOString().slice(0, 10);
        const limit = getQuizLimitByPhase(pet.phase);
        setQuizLimit(limit);

        if (pet.last_quiz_date !== today) {
          pet.last_quiz_date = today;
          pet.quiz_count_today = 0;
          await savePet(pet);
        }

        const count = pet.quiz_count_today || 0;
        setQuizCountToday(count);
        setHasRemainingAttempts(count < limit);
      }
    } catch (error) {
      console.error("Error checking quiz limit:", error);
    }
    setIsLoading(false);
  }, [pet_id]);

  useEffect(() => {
    checkQuizLimit();
  }, [checkQuizLimit]);

  const incrementQuizCount = async () => {
    if (!pet_id) return;

    try {
      let pet = await getPet(pet_id);
      if (pet) {
        const limit = getQuizLimitByPhase(pet.phase);
        if (pet.quiz_count_today < limit) {
          pet.quiz_count_today += 1;
          await savePet(pet);
          setQuizCountToday(pet.quiz_count_today);
          setHasRemainingAttempts(pet.quiz_count_today < limit);
        }
      }
    } catch (error) {
      console.error("Error incrementing quiz count:", error);
    }
  };

  return { isLoading, hasRemainingAttempts, quizCountToday, quizLimit, incrementQuizCount, refresh: checkQuizLimit };
};
