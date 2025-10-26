## 1. 프로젝트 개요

| 구분 | 내용 |
|:---:|:---|
| **프로젝트명** | 드래곤즈 딜레마 (Dragon's Dilemma) |
| **목표** | 논리적 딜레마 퀴즈를 통한 펫 성격 육성 및 Stats 기반 진화 분기 구현 |
| **핵심 로직** | 딜레마 선택 결과에 따라 Stats(지혜/공격성)가 변동되며, 이 Stats가 최종 진화를 결정함. |

## 2. 기술 스택 및 환경 설정

**Frontend**: React (컴포넌트 기반 개발) 
**Styling**: Tailwind CSS (iPad 최적화 및 클래식 RPG UI 구현)
**데이터 저장**: IndexedDB (복잡한 펫 객체 CRUD 및 기술적 도전성 확보) 
**최적화**: iPad Pro 11인치 가로 모드

## 3. 핵심 로직 및 데이터 구조

**A. 펫 객체 데이터 구조 (IndexedDB 저장)**

| 필드 | 데이터 타입 | 설명 |
|:---:|:---:|:---|
| `pet_id` | Number | 펫의 고유 ID (CRUD 키) |
| `type` | String | 펫 종류 (펭귄, 유니콘, 고양이 등 6종) |
| `phase` | Number | 현재 성장 단계 (1~4단계) |
| `current_image_url` | String | 현재 단계의 펫 이미지 파일 경로 (Stats에 따라 조건부 로드) |
| `stats` | Object | `{wisdom: Number, aggression: Number}` (핵심 능력치) |
| `quiz_count_today` | Number | 일일 퀴즈 풀이 횟수 (최대 5회 제한 로직에 사용) |
| `quiz_count_total` | Number | 누적 정답 수 (단계 진화 기준) |

**B. 성장 및 진화 로직**

* **일일 제한**: 하루 최대 퀴즈 풀이 횟수 **5회** 제한 로직 구현.
* **진화 기준 (누적 정답 수)**:
    * 알 → 유년기 (Phase 2): **3회**
    * 유년기 → 성장기 (Phase 3): **6회**
    * 성장기 → 성체 (Phase 4): **11회**
* **4단계 분기**: 4단계 진화 시, `stats.wisdom`이 `stats.aggression`보다 높으면 **'지혜형 이미지'**를 로드하고, 그렇지 않으면 **'공격형 이미지'**를 로드하는 조건부 로직 구현.

## 4. AI 협업 요청 사항 (주요 코드 및 콘텐츠 생성)

Gemini CLI는 다음 작업을 수행해야 합니다:

1.  **IndexedDB CRUD 모듈**: `pet` 객체의 저장, 조회, 수정, 삭제를 위한 **JavaScript/React Custom Hook** 형태의 IndexedDB 기본 코드 생성.
2.  **Stats 기반 조건부 로드 컴포넌트**: `stats` 값을 prop으로 받아 펫의 현재 이미지 $\text{URL}$을 조건부로 결정하는 $\text{React}$ 컴포넌트 코드 생성.
3.  **AI 콘텐츠 (고유 기능)**:
    * **딜레마 퀴즈**: 성장 단계(Phase)에 따른 난이도(하/중/상)별 딜레마 퀴즈 텍스트 및 **Stats 변화 결과** $\text{JSON}$ 생성.
    * **Gemini 조언 시스템**: 펫의 현재 $\text{Stats}$를 고려하여 **성격에 맞는 조언 텍스트**를 생성하는 프롬프트 제공.
4.  **UI 컴포넌트**: $\text{Tailwind CSS}$를 사용하여 **$\text{RPG}$ 스타일 입체 버튼 컴포넌트** (클릭 전/후 상태 반영) 및 $\text{iPad}$ 가로 모드에 최적화된 $\text{Grid/Flex}$ 레이아웃 $\text{React}$ 컴포넌트 생성.

##############################################################

### Day 7 - 핵심 기능 통합 및 AI 콘텐츠 생성 (최종 통합)

---

### 작업 내용

**문제:**  
Day 6까지 구현된 핵심 모듈(`IndexedDB CRUD`, `Stats` 로직, `UI` 컴포넌트`)을 통합하고,  
`AI` 콘텐츠를 생성하여 프로젝트의 핵심 기능(`Stats` 기반 진화, `Gemini` 조언, `CRUD`)을 완성해야 함.

**해결:**  
1. **Stats 기반 진화 로직 구현**  
   - `Stats`의 비율(`지혜`, `공격성`)에 따라 4단계 진화 로직을 구분함.  
   - `getPetImageUrl.js` 파일로 로직을 분리하여 모듈화하고, `MainLayout`에서 호출 구조로 통합함.

2. **UI 디테일 반영**  
   - `RPG` 스타일의 말풍선(`QuizScreen.jsx`)과 답변창 프레임(`RpgButton` 스타일 재활용) 구현.  
   - `Tailwind CSS`를 이용해 말풍선은 펫 이미지 위 중앙 상단에 겹쳐 표시하도록 구성함.

3. **AI 콘텐츠 생성**  
   - `Gemini` CLI를 활용하여 **‘기술/논리 기반 딜레마 퀴즈 JSON 데이터’**를 생성함.  
   - `AI 활용 (30점)`의 근거를 확보하고 실제 데이터 연동에 활용함.

4. **CRUD 통합**  
   - `MainLayout`에 모든 Hook 및 IndexedDB 로직을 통합함.  
   - 초기 펫 데이터를 로드해 Stats와 퀴즈 횟수를 표시하도록 함.  
   - 초기 데이터가 없을 경우, 새 펫을 생성(Create) 버튼을 표시하도록 구현함.

---

### Gemini CLI 사용 프롬프트

```bash
# Day 7 - 프롬프트 5: Stats 기반 4단계 진화 로직 구현
gemini ask "GEMINI.md의 4단계 진화 로직에 따라, 펫의 '지혜'와 '공격성' Stats 비율을 비교하여 최종 펫 이미지 URL을 결정하는 JavaScript 함수 (src/utils/getPetImageUrl.js) 코드를 작성해줘."

# Day 7 - 프롬프트 6: 딜레마 퀴즈 화면 컴포넌트 요청
gemini ask "src/components/QuizScreen.jsx 컴포넌트를 작성해줘. 이 컴포넌트는 배경 전환 없이 MainLayout 위에 겹쳐서 표시되며, 질문 말풍선은 검정색 테두리를 가진 RPG 스타일 말풍선 UI를 펫 이미지 위에 중앙 상단에 겹쳐 표시해야 해. 답변창 프레임은 RpgButton의 클릭 전 이미지 스타일을 재활용하여 구현하고, 이 프레임 내부에 RpgButton 컴포넌트 2개를 나란히 배치하여 선택지로 사용해야 해. Tailwind CSS를 활용해."

# Day 7 - 프롬프트 7 (수정): 기술/논리 기반 딜레마 콘텐츠 재요청
gemini ask "우리 프로젝트의 딜레마 퀴즈용 콘텐츠 3개를 생성해줘. 각 콘텐츠는 JSON 배열 형태로 반환해야 하며, 주제는 '초보 코더나 해커가 겪을 수 있는 윤리적/논리적 딜레마'로 설정해줘. 예: '버그를 악용할 것인가, 보고할 것인가' 같은 문제를 포함해야 해."

# Day 7 - 프롬프트 8: 초기 데이터 로딩 및 UI 통합
gemini ask "src/components/MainLayout.jsx 컴포넌트에 useQuizLimit 훅을 적용하고, IndexedDB에서 초기 펫 데이터를 로드하여 화면에 펫의 현재 Stats와 퀴즈 횟수를 표시하는 로직을 통합해줘. 초기 펫 데이터가 없으면, 새로운 펫을 생성(CRUD: Create)하는 버튼을 표시해야 해."
