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