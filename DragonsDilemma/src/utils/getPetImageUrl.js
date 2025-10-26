/**
 * 펫의 진화 단계와 스탯에 따라 적절한 이미지 URL을 반환합니다.
 *
 * @param {object} pet - 펫 객체. `type`, `phase`, `stats` 속성을 포함해야 합니다.
 * @param {string} pet.type - 펫의 타입 (예: 'fire', 'water').
 * @param {number} pet.phase - 펫의 진화 단계 (1-4).
 * @param {object} pet.stats - 펫의 스탯 객체. `wisdom`과 `aggression`을 포함해야 합니다.
 * @param {number} pet.stats.wisdom - 펫의 지혜 스탯.
 * @param {number} pet.stats.aggression - 펫의 공격성 스탯.
 * @returns {string} 펫 이미지의 URL. 유효하지 않은 경우 빈 문자열을 반환합니다.
 */
const getPetImageUrl = (pet) => {
  // 펫 객체 또는 필수 속성이 없는 경우 빈 문자열 반환
  if (!pet || !pet.type || !pet.phase || !pet.stats) {
    console.warn('Invalid pet object provided to getPetImageUrl');
    return '';
  }

  const { type, phase, stats } = pet;
  const basePath = '/assets/pets';

  // 1-3단계 진화: 고정된 이미지 경로 반환
  if (phase < 4) {
    return `${basePath}/phase${phase}/${type}_p${phase}.png`;
  }

  // 4단계 진화: 지혜와 공격성 스탯 비율에 따라 이미지 결정
  // 지혜가 공격성보다 높으면 'w' (wisdom), 그렇지 않으면 'a' (aggression) 타입으로 진화
  const finalEvolutionType = stats.wisdom > stats.aggression ? 'w' : 'a';

  return `${basePath}/phase4/${type}_p4_${finalEvolutionType}.png`;
};

export default getPetImageUrl;