import React, { useState, useEffect } from 'react';
import getPetImageUrl from '../utils/getPetImageUrl';

const PetDisplay = ({ pet }) => {
  if (!pet) {
    return null; // Or a placeholder
  }

  // 1. `getPetImageUrl`을 호출하여 기본 이미지 URL을 가져옵니다.
  const imageUrl = getPetImageUrl(pet);

  // 2. 이미지 로딩 실패 시 대체 이미지를 표시하기 위한 상태 관리
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const fallbackImage = '/assets/fallback/default.png'; // 대체 이미지 경로

  // 3. pet prop이 변경될 때마다 이미지 소스를 업데이트합니다.
  useEffect(() => {
    let finalImageUrl = getPetImageUrl(pet);

    // **새로운 파일명(pet_new.png) 사용 예시**
    // 만약 특정 펫(예: 1단계 고양이)의 새 이미지를 사용하고 싶다면,
    // 아래와 같이 경로를 직접 수정할 수 있습니다.
    // if (pet.type === 'cat' && pet.phase === 1) {
    //   finalImageUrl = '/assets/pets/phase1/cat_p1_new.png';
    // }

    setImageSrc(finalImageUrl);
  }, [pet]);

  const handleError = () => {
    // 이미지 로드 실패 시, 대체 이미지로 교체
    setImageSrc(fallbackImage);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`A ${pet.type} in phase ${pet.phase}`}
          className="max-w-full max-h-full object-contain"
          onError={handleError} // 로드 실패 시 handleError 함수 호출
        />
      ) : (
        <p className="text-2xl">Pet image not available for this phase.</p>
      )}
    </div>
  );
};

export default PetDisplay;
