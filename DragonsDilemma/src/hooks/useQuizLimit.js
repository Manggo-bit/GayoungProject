import { useState, useEffect, useCallback } from 'react';
import { getPet, savePet } from '../data/db';

const MAX_QUIZ_ATTEMPTS = 5;

export const useQuizLimit = (pet_id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizCountToday, setQuizCountToday] = useState(0);
  const [hasRemainingAttempts, setHasRemainingAttempts] = useState(false);

  const checkQuizLimit = useCallback(async () => {
    if (!pet_id) return;

    setIsLoading(true);
    try {
      let pet = await getPet(pet_id);
      if (pet) {
        const today = new Date().toISOString().slice(0, 10);

        if (pet.last_quiz_date !== today) {
          pet.last_quiz_date = today;
          pet.quiz_count_today = 0;
          await savePet(pet);
        }

        const count = pet.quiz_count_today || 0;
        setQuizCountToday(count);
        setHasRemainingAttempts(count < MAX_QUIZ_ATTEMPTS);
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
        pet.quiz_count_today += 1;
        await savePet(pet);
        setQuizCountToday(pet.quiz_count_today);
        setHasRemainingAttempts(pet.quiz_count_today < MAX_QUIZ_ATTEMPTS);
      }
    } catch (error) {
      console.error("Error incrementing quiz count:", error);
    }
  };

  return { isLoading, hasRemainingAttempts, quizCountToday, incrementQuizCount, refresh: checkQuizLimit };
};
