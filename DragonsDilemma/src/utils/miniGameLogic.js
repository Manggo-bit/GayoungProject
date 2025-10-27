/**
 * 가위바위보 미니게임 로직
 * 펫의 'aggression' 능력치에 따라 승률이 변동됩니다.
 *
 * @param {number} aggression - 펫의 공격성 수치 (1-100 범위로 가정)
 * @returns {'Win' | 'Lose' | 'Draw'} - 게임 결과
 */
export const playRockPaperScissors = (aggression) => {
  // aggression 수치가 1-100 범위를 벗어나는 경우를 대비한 예외 처리
  const normalizedAggression = Math.max(1, Math.min(100, aggression));

  // 기본 승률(33%)에 aggression 수치에 따른 보너스 확률을 추가합니다.
  // aggression이 100일 때 최대 30%의 보너스를 받아 승률이 63%가 됩니다.
  const winChance = 0.25 + (normalizedAggression / 100) * 0.3;

  // 남은 확률을 패배와 무승부에 균등하게 분배합니다.
  const remainingChance = 1 - winChance;
  const loseChance = remainingChance / 2;

  const random = Math.random();

  if (random < winChance) {
    return 'Win';
  } else if (random < winChance + loseChance) {
    return 'Lose';
  } else {
    return 'Draw';
  }
};
