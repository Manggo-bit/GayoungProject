
// 1. Vite의 `glob` 기능을 사용하여 모든 이미지 파일을 동적으로 가져옵니다.
const petImageModules = import.meta.glob('/src/assets/pets/**/*.png', { eager: true, as: 'url' });

// 2. 가져온 이미지 경로를 사용하기 쉬운 형식으로 변환합니다.
// 예: '/src/assets/pets/phase1/fire_p1.png' -> 'phase1/fire_p1': '.../assets/fire_p1.H4s1a.png'
const petImages = Object.entries(petImageModules).reduce((acc, [path, url]) => {
  const key = path.replace('/src/assets/pets/', '').replace('.png', '');
  acc[key] = url;
  return acc;
}, {});

/**
 * 펫의 진화 단계와 스탯에 따라 적절한 이미지 URL을 반환합니다.
 * Vite에 의해 해시 처리된 최종 URL을 반환합니다.
 *
 * @param {object} pet - 펫 객체
 * @returns {string} 펫 이미지의 URL
 */
const getPetImageUrl = (pet) => {
  if (!pet || !pet.type || !pet.phase || !pet.stats) {
    console.warn('Invalid pet object provided to getPetImageUrl');
    return '';
  }

  const { type, phase, stats } = pet;
  let imageKey;

  if (phase < 4) {
    imageKey = `phase${phase}/${type}_p${phase}`;
  } else {
    const finalEvolutionType = stats.wisdom > stats.aggression ? 'w' : 'a';
    imageKey = `phase4/${type}_p4_${finalEvolutionType}`;
  }

  // 3. 미리 생성된 객체에서 최종 이미지 URL을 찾습니다.
  const imageUrl = petImages[imageKey];

  if (!imageUrl) {
    console.warn(`Image not found for key: ${imageKey}`);
    return '';
  }

  return imageUrl;
};

export default getPetImageUrl;
