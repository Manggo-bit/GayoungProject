
import React, { useState } from 'react';
import RpgButton from './RpgButton';
import { playRockPaperScissors } from '../utils/miniGameLogic';

const MiniGameScreen = ({ pet, onClose }) => {
  const [result, setResult] = useState(null);

  const handleIntrusionAttempt = () => {
    const gameResult = playRockPaperScissors(pet.stats.aggression);
    let message = '';
    switch (gameResult) {
      case 'Win':
        message = '침투 성공! 보상을 획득했습니다!';
        // TODO: 보상 로직 추가
        break;
      case 'Lose':
        message = '침투 실패... 다음 기회에...';
        break;
      case 'Draw':
        message = '아슬아슬하게 무승부!';
        break;
      default:
        message = '알 수 없는 결과.';
    }
    setResult(message);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex flex-col items-center justify-center text-white">
          <div className="w-full max-w-md mb-4">
            <h2 className="text-2xl font-bold text-center mb-2">미니 게임: 침투 시도</h2>
            <div className="bg-gray-800/70 p-4 rounded-lg shadow-inner">
              <p className="text-lg">
                <span className="font-bold text-red-400">공격성 (Aggression):</span> 
                <span className="text-xl ml-2">{pet.stats.aggression}</span>
              </p>
              <p className="text-sm mt-2 text-gray-400">
                공격성이 높을수록 침투 성공 확률이 높아집니다.
              </p>
            </div>
          </div>

          <div className="my-8">
            <RpgButton onClick={handleIntrusionAttempt}>
              침투 시도
            </RpgButton>
          </div>

          {result && (
            <div 
              className="
                w-full max-w-md 
                p-4 
                bg-gray-900 
                border-4 border-double border-gray-600 
                rounded-md 
                shadow-lg
                font-mono text-lg text-center text-green-400
                "
              style={{
                imageRendering: 'pixelated',
                boxShadow: 'inset 0 0 10px #000',
              }}
            >
              <p>{result}</p>
            </div>
          )}

          <div className="mt-8">
            <RpgButton onClick={onClose}>
              돌아가기
            </RpgButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGameScreen;
