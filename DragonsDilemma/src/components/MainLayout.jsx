import React, { useState, useEffect, useCallback } from 'react';
import RpgButton from './RpgButton';
import { initDB, getPet, savePet } from '../data/db';
import { useQuizLimit } from '../hooks/useQuizLimit';
import QuizScreen from './QuizScreen'; // 퀴즈 화면 컴포넌트 임포트
import PetDisplay from './PetDisplay';
import MiniGameScreen from './MiniGameScreen'; // 미니게임 화면 컴포넌트 임포트
import grasslandBg from '../../public/assets/ui/bg_grassland.png';

const PET_ID = 1; // 앱에서는 단일 펫을 관리하므로 ID를 상수로 고정

const MainLayout = () => {
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [isMiniGameVisible, setIsMiniGameVisible] = useState(false); // 미니게임 화면 상태

  // 펫이 존재할 때만 useQuizLimit 훅을 활성화합니다.
  const {
    isLoading: isQuizLimitLoading,
    hasRemainingAttempts,
    quizCountToday,
    quizLimit,
    incrementQuizCount,
    refresh: refreshQuizLimit,
  } = useQuizLimit(pet ? PET_ID : null);

  // 게임 데이터(펫 정보)를 로드하는 함수
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

  // 컴포넌트 마운트 시 게임 데이터를 로드합니다.
  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  // 새로운 펫을 생성하는 함수
  const createNewPet = async () => {
    const petTypes = ['cat', 'owl', 'platypus', 'unicorn', 'penguin', 'turtle'];
    const randomPetType = petTypes[Math.floor(Math.random() * petTypes.length)];

    const newPet = {
      pet_id: PET_ID,
      type: randomPetType, // 초기 타입
      phase: 1,       // 초기 진화 단계
      stats: { wisdom: 10, aggression: 10 }, // 초기 스탯
      quiz_count_total: 0,
      quiz_count_today: 0,
      last_quiz_date: new Date().toISOString().slice(0, 10),
    };
    try {
      await savePet(newPet);
      setPet(newPet);
      // 새 펫 생성 후 퀴즈 제한 상태를 즉시 갱신합니다.
      await refreshQuizLimit();
    } catch (error) {
      console.error("Failed to create new pet:", error);
    }
  };

  // 퀴즈 완료 시 호출될 함수
  const handleQuizComplete = async (newStats) => {
    if (!pet) return;

    // 1. 퀴즈 횟수 증가
    await incrementQuizCount();

    // 2. 최신 펫 정보 다시 가져오기
    const currentPet = await getPet(PET_ID);

    // 3. 펫 상태 업데이트 (스탯, 전체 퀴즈 횟수)
    const updatedPet = {
      ...currentPet,
      quiz_count_total: (currentPet.quiz_count_total || 0) + 1,
      stats: {
        wisdom: currentPet.stats.wisdom + newStats.wisdom,
        aggression: currentPet.stats.aggression + newStats.aggression,
      },
    };

    // 4. 진화 로직 체크
    const { phase, quiz_count_total } = updatedPet;
    if (phase === 1 && quiz_count_total >= 3) {
      updatedPet.phase = 2;
    } else if (phase === 2 && quiz_count_total >= 7) {
      updatedPet.phase = 3;
    } else if (phase === 3 && quiz_count_total >= 12) {
      updatedPet.phase = 4;
    }

    // 5. 업데이트된 펫 정보 저장
    await savePet(updatedPet);
    setPet(updatedPet); // UI 상태 업데이트

    // 6. 퀴즈 화면 숨기기
    setIsQuizVisible(false);
  };
  // 로딩 중 화면
  if (isLoading) {
    return (
      <div className="flex w-screen h-screen bg-gray-900 text-white items-center justify-center">
        <p className="text-3xl">게임 데이터 로딩 중...</p>
      </div>
    );
  }

  // 퀴즈 화면이 활성화된 경우
  if (isQuizVisible) {
    return <QuizScreen pet={pet} onQuizComplete={handleQuizComplete} />;
  }

  // 펫이 없을 때 (초기 상태)
  if (!pet) {
    return (
      <div
        className="flex w-screen h-screen text-white items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${grasslandBg})` }}
      >
        <RpgButton onClick={createNewPet}>
          첫 번째 펫 생성하기
        </RpgButton>
      </div>
    );
  }

  // 펫이 있을 때 (메인 화면)
  return (
    <div
      className="flex w-screen h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${grasslandBg})` }}
    >
      {/* 펫 표시 영역 */}
      <div className="w-[60%] h-full flex items-center justify-center">
        <PetDisplay pet={pet} />
      </div>

      {/* UI 메뉴 영역 */}
      <div className="w-[40%] h-full bg-gray-600 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold mb-4">펫 능력치</h2>
          <div className="text-xl">
            <p>지혜: {pet.stats.wisdom}</p>
            <p>공격성: {pet.stats.aggression}</p>
          </div>
          <div className="mt-6 text-xl">
            <h3 className="text-2xl font-bold mb-2">딜레마 퀴즈</h3>
            {isQuizLimitLoading ? (
              <p>퀴즈 횟수 확인 중...</p>
            ) : (
              <p>오늘의 퀴즈 횟수: {quizCountToday} / {quizLimit}</p>
            )}
          </div>
          <div className="mt-6">
            <RpgButton onClick={() => setIsQuizVisible(true)} disabled={!hasRemainingAttempts}>
              {hasRemainingAttempts ? '퀴즈 시작' : '오늘 횟수 소진'}
            </RpgButton>
          </div>
          <div className="mt-6">
            <RpgButton onClick={() => setIsMiniGameVisible(true)}>
              미니게임
            </RpgButton>
          </div>
        </div>
      </div>

      {/* 미니게임 모달 */}
      {isMiniGameVisible && <MiniGameScreen pet={pet} onClose={() => setIsMiniGameVisible(false)} />}
    </div>
  );
};

export default MainLayout;