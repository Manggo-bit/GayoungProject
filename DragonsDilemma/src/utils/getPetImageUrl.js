/**
 * 펫의 진화 단계와 스탯에 따라 적절한 이미지 URL을 반환합니다.
 *
 * @param {object} pet - 펫 객체
 * @returns {string} 펫 이미지의 URL
 */
const getPetImageUrl = (pet) => {
  if (!pet || !pet.type || !pet.phase) {
    console.warn('Invalid pet object provided to getPetImageUrl');
    return '';
  }

  const { type, phase, stats } = pet;
  let imageName;

  if (phase < 4) {
    imageName = `${type}_p${phase}.png`;
  } else {
    // For phase 4, the image depends on stats
    if (!stats) {
        console.warn('Stats are required for phase 4 pets');
        return '';
    }
    const finalEvolutionType = stats.wisdom > stats.aggression ? 'w' : 'a';
    imageName = `${type}_p4_${finalEvolutionType}.png`;
  }

  return `${import.meta.env.BASE_URL}assets/pets/phase${phase}/${imageName}`;
};

export default getPetImageUrl;