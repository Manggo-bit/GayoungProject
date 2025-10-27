cat << EOF > README.md
# 프로젝트: 드래곤즈 딜레마 (Dragon's Dilemma)

> **'딜레마를 선택하라. 그것이 너의 운명을 결정할지니.'**

Gemini CLI와 협업하여 개발한 개인 맞춤형 펫 육성 웹 애플리케이션입니다. 사용자의 논리적/윤리적 딜레마 퀴즈 선택이 펫의 성격(Stats)을 형성하고 최종 진화 형태를 결정하는 것이 핵심입니다.

---

## 1. 프로젝트 개요 및 기술적 도전성 (10점 항목)

### 핵심 로직 및 목표

| 구분 | 내용 | 기술적 도전성 |
|:---:|:---|:---|
| **Stats 로직** | 지혜(Wisdom), 공격성(Aggression)의 두 가지 Stats 비율로 펫의 성격 형성 및 진화 분기 결정. | 복잡한 조건부 진화 분기 로직(4단계) 구현. |
| **데이터 관리** | 펫 객체(Stats, 퀴즈 횟수, Phase)를 IndexedDB에 저장/수정/삭제(CRUD)하여 관리. | 사용자 데이터의 영속성 및 복잡한 객체 저장 처리. |
| **UI/UX** | iPad Pro 11인치 가로 모드 최적화 및 클래식 RPG 픽셀 아트 스타일 적용. | Tailwind CSS를 활용한 반응형 Grid/Flex 레이아웃 및 커스텀 UI 컴포넌트 구현. |

### 핵심 기능 (3가지)

1.  **Stats 기반 분기 진화:** 누적 퀴즈 횟수(3회, 6회, 11회)에 따른 4단계 진화 로직과, 최종 단계에서 `Stats` 비율에 따른 **지혜형/공격형 이미지 로드** 로직 구현.
2.  **AI 딜레마 콘텐츠 및 조언 시스템:** 펫의 현재 성격 Stats를 기반으로 **성격에 맞는 조언**을 요청하고, **기술/윤리 기반 딜레마 퀴즈 콘텐츠**를 AI로부터 생성하여 제공.
3.  **Stats 연동 미니 게임:** 펫의 **Aggression Stats**를 활용하여 승률이 결정되는 **'상대방 시스템 침투 성공률'** 미니 게임 구현.

---

## 2. 개발 과정에서의 AI 활용 방법 (Gemini CLI 협업, 30점 항목)

| 활용 유형 | Day별 사용 사례 | 코드/결과물 |
|:---:|:---:|:---|
| **핵심 백엔드 로직 생성** | Day 6 | **IndexedDB CRUD 모듈** 및 **일일 퀴즈 제한 Custom Hook**의 뼈대 코드를 요청하여 기술적 안정성 확보. |
| **복잡한 로직 구현** | Day 7 | 펫의 Stats 비율을 비교하여 최종 이미지 URL을 결정하는 **조건부 진화 함수 (`getPetImageUrl.js`)** 구현. |
| **AI 콘텐츠 제작** | Day 7 | '초보 코더가 겪을 수 있는 윤리적/논리적 딜레마 퀴즈 JSON 데이터'를 요청하여 **AI를 콘텐츠 생산 도구**로 활용함. |
| **UI 컴포넌트 생성** | Day 6, Day 7, Day 8 | **RpgButton 컴포넌트**, **QuizScreen 말풍선 UI**, **MiniGameScreen UI 및 통합 로직** 등 모든 UI 레이아웃 및 스타일링 코드를 Gemini에게 요청. |
| **문제 해결 및 조언** | Day 1 | **WSL/GitHub 환경 설정 문제** 발생 시 Git 저장소 위치 결정 및 GitHub 명칭 규칙에 대한 조언을 AI에게 받음. |

---

## 3. 버전 관리 전략 (Git/GitHub, 20점 항목)

본 프로젝트는 **체계적인 개발 이력 관리**를 위해 다음과 같은 전략을 사용했습니다.

1.  **컨벤션 준수:** Angular 커밋 컨벤션(`feat:`, `chore:`, `docs:`)을 엄격히 준수하여 이력의 가독성을 높였습니다.
2.  **브랜치 분리:** $\text{Day 8}$부터 **`main` 브랜치**는 개발일지(`DEVELOPMENT_LOG.md`) 및 최종 통합에 사용하고, **`feature/minigame-ui`**와 같은 **기능별 브랜치**에서 코딩 작업을 분리하여 진행했습니다.
3.  **문서 이동 해결:** 기능 브랜치에서 작성된 개발일지(`DEVELOPMENT_LOG.md`)를 `main` 브랜치에 기록하기 위해 **`git stash push` → `git checkout main` → `git stash pop`** 명령을 활용하여 브랜치 간 파일 이동 문제를 해결하고 이력을 명확히 했습니다.

---

## 4. 기술 스택 및 설치 방법

### 기술 스택
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS, PostCSS
- **Data Storage**: IndexedDB (Local Storage)

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone [GitHub 저장소 URL]
cd Dragon's Dilemma

# 2. 종속성 설치 (npm 또는 yarn 사용)
npm install
# 또는
yarn install

# 3. 개발 서버 실행
npm run dev
# 또는
yarn dev