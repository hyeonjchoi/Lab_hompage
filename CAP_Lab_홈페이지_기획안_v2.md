# CAP Lab 홈페이지 제작 기획안 v2

> Consumer Advertising Psychology Lab — Kwangwoon University  
> 작성일: 2026년 6월 1일 | 문서 목적: 기존 초안 검토 및 제작 실행용 기획안 정리

---

## 1. 기존 기획안 검토 요약

기존 기획안은 연구실 홈페이지의 기본 골격, 페이지 구성, 로고 후보, 디자인 방향, 기술 스택까지 폭넓게 정리되어 있어 실제 제작으로 이어가기 좋은 상태다. 다만 현재 문서는 기획서, 디자인 가이드, 개발 명세, 작업 체크리스트가 한 문서 안에 섞여 있어 의사결정자가 봐야 할 내용과 개발자가 바로 실행해야 할 내용이 조금 혼재되어 있다.

이번 v2에서는 다음 방향으로 보완한다.

- 방문자 관점의 핵심 메시지를 먼저 정리한다.
- 페이지별 목적과 필수 콘텐츠를 더 명확히 구분한다.
- 연구실의 학술적 신뢰성과 지원자 친화성을 동시에 강화한다.
- 로고와 디자인은 “개성”보다 “반복 사용 가능한 브랜드 시스템” 중심으로 정리한다.
- 개발 일정은 실제 콘텐츠 수급, 검수, 배포까지 포함한 실행 계획으로 다듬는다.

---

## 2. 수정하면 좋은 부분

### 2-1. 사이트 목적을 우선순위로 재정리

기존 목적은 “홍보, 구성원 소개, 논문 아카이빙, 대학원생 모집”으로 잘 잡혀 있다. 다만 홈페이지 첫 화면과 메뉴 구조에서는 우선순위를 더 분명히 드러내는 것이 좋다.

권장 우선순위는 다음과 같다.

1. 연구실이 무엇을 연구하는지 빠르게 이해시키기
2. 지도교수와 구성원의 신뢰도 보여주기
3. 논문과 연구 성과를 구조적으로 제시하기
4. 예비 대학원생과 RA가 지원 방법을 쉽게 파악하게 하기
5. 공동 연구자나 외부 방문자가 연락 경로를 찾게 하기

### 2-2. HOME의 메시지 보강

현재 HOME은 구성 요소가 잘 잡혀 있지만, 첫 문장인 미션 문장이 아직 비어 있다. 연구실의 정체성을 가장 잘 보여주는 문장이 필요하다.

예시:

> We study how consumers perceive, evaluate, and respond to advertising, services, and AI-mediated experiences.

또는 조금 더 학술적인 톤:

> CAP Lab investigates the psychological mechanisms underlying consumer judgment, advertising response, and human-AI service interactions.

### 2-3. RESEARCH는 키워드 나열보다 연구 축으로 묶기

현재 연구 주제가 풍부하지만 키워드가 많아 방문자에게 다소 산만하게 보일 수 있다. 다음처럼 3~4개의 큰 연구 축으로 묶는 편이 좋다.

- Consumer Judgment & Advertising Response
- Human-AI Service Interaction
- Service Failure, Recovery & Attribution
- Motivation, Construal & Decision Processes

각 축 아래에 Regulatory Focus, Construal Level Theory, Attribution Theory, Algorithm Aversion, Anthropomorphism 같은 이론 키워드를 연결하면 학술적 깊이와 가독성이 동시에 살아난다.

### 2-4. PUBLICATION 페이지 명칭 정리

메뉴는 `Publications`가 자연스럽다. 논문이 한 편 이상 누적되는 페이지이므로 복수형이 더 표준적이다. 페이지 안에는 `Journal Articles`, `Working Papers`, `Conference Presentations`를 구분하는 것을 권장한다.

### 2-5. NEWS와 JOIN US의 역할 분리

NEWS는 업데이트 아카이브이고, JOIN US는 모집 전환 페이지다. RA 모집 공고는 NEWS에도 올라갈 수 있지만, JOIN US에서는 상시 안내를 제공하는 것이 좋다.

권장 구조:

- NEWS: 수상, 학회 발표, 논문 게재, 연구실 소식, 모집 공고 게시
- JOIN US: 석사/박사/RA 지원 안내, 기대 역량, 지원 절차, 문의 방법

### 2-6. 로고는 “홈페이지 사용성” 기준으로 최종 판단

5번 CAP 워드마크형이 가장 적합하다는 기존 판단은 타당하다. 다만 최종 선택 전 다음 항목을 테스트해야 한다.

- 32px 높이의 네비게이션 바에서 읽히는가
- 모바일 화면에서 축소되어도 식별되는가
- 흑백 버전으로도 작동하는가
- 파비콘 또는 SNS 썸네일에 응용 가능한가
- 광운대학교 공식 상징 사용 시 권리나 가이드라인 문제가 없는가

### 2-7. 기술 스택은 “정적 사이트 + 데이터 분리”를 권장

HTML/CSS/Vanilla JS 선택은 타당하다. 다만 논문, 뉴스, 구성원 데이터는 나중에 수정이 자주 발생하므로 HTML에 직접 하드코딩하기보다 JSON 파일로 분리하는 방식도 검토할 만하다.

권장:

- 첫 버전: HTML/CSS/JS로 빠르게 제작
- 데이터: `assets/data/publications.json`, `assets/data/news.json`, `assets/data/people.json` 분리
- 배포: GitHub Pages
- 향후 확장: Hugo 또는 Astro로 이전 가능

---

## 3. 추가 검토가 필요한 부분

| 항목 | 검토 질문 | 권장 결정 |
|------|-----------|-----------|
| 언어 정책 | 영문만 운영할지, 한영 병기할지 | 1차는 영문 중심, 핵심 지원 안내만 국문 보조 |
| 공식 명칭 | CAP Lab의 풀네임과 약칭을 어떻게 표기할지 | 첫 화면에는 풀네임 + CAP Lab 병기 |
| 소속 표기 | 학과명, 대학원명, 광운대 영문 표기를 어디까지 넣을지 | Footer와 About에 공식 표기 사용 |
| 로고 권리 | 광운대 비마상 또는 공식 심볼 사용 가능 여부 | 학교 공식 가이드 확인 후 사용 |
| 지도교수 정보 | 영문 약력, 연구 관심사, 링크 공개 범위 | Google Scholar, email, office 정도 우선 |
| 구성원 정보 | 사진 공개 동의, 영문 이름 표기, 관심사 공개 범위 | 공개 동의 후 최소 정보부터 게시 |
| 논문 데이터 | DOI, PDF 업로드 가능 여부, 저작권 | DOI 링크 우선, PDF는 공개 가능 자료만 |
| 모집 문구 | 공식 입학 절차와 연구실 개별 문의의 관계 | 학교 입학 링크 + 연구실 문의 분리 |
| 지도 임베드 | Google Maps 사용 가능 여부 | 정적 주소 + 지도 링크, 임베드는 선택 |
| 유지보수 담당 | 뉴스와 논문 업데이트 담당자 | 월 1회 업데이트 루틴 지정 |

---

## 4. 업그레이드된 사이트 기획안

## 4-1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | CAP Lab 공식 홈페이지 제작 |
| 연구실명 | Consumer Advertising Psychology Lab |
| 약칭 | CAP Lab |
| 소속 | Kwangwoon University |
| 주요 목적 | 연구 소개, 구성원 소개, 연구 성과 아카이빙, 대학원생 및 RA 모집, 외부 협업 문의 |
| 핵심 방문자 | 예비 대학원생, 학부 연구참여 희망자, 공동 연구자, 학계 관계자, 일반 방문자 |
| 기본 언어 | English |
| 보조 언어 | Korean, 특히 Join Us와 Contact 일부 |
| 제작 방식 | 정적 웹사이트 기반, GitHub Pages 배포 |

---

## 4-2. 핵심 메시지

### Primary Tagline

> Understanding how consumers think, feel, and act in advertising, service, and AI-mediated contexts.

### Short Mission

> CAP Lab studies the psychological mechanisms that shape consumer judgment, advertising response, service experiences, and human-AI interactions.

### Korean Supporting Copy

> CAP Lab은 소비자가 광고, 서비스, AI 기반 상호작용을 어떻게 지각하고 평가하며 행동으로 이어가는지 연구하는 소비자 광고 심리 연구실입니다.

---

## 4-3. 정보 구조

```
CAP Lab Website
├── Home
├── People
├── Research
├── Publications
├── News
└── Join Us
```

권장 메뉴명은 모두 영문으로 통일한다. 페이지 내부에서 필요한 경우 국문 보조 설명을 제공한다.

---

## 4-4. 페이지별 기획

### Home

목적: 방문자가 10초 안에 연구실의 정체성, 소속, 연구 방향을 이해하도록 한다.

필수 구성:

- Hero: 연구실명, 미션 문장, 대표 이미지 또는 로고, CTA 버튼
- Research Snapshot: 3~4개의 연구 축 요약
- Latest Publications: 최신 논문 2~3개
- Latest News: 최신 소식 2~3개
- About CAP Lab: 연구실 소개 문단
- Affiliation: Kwangwoon University 및 학과 표기

추천 CTA:

- `Explore Research`
- `Meet Our People`
- `Join the Lab`

### People

목적: 연구실의 전문성, 인적 구성, 학문적 네트워크를 보여준다.

필수 구성:

- Principal Investigator 프로필
- Graduate Students
- Undergraduate Research Assistants
- Alumni

각 프로필 카드 권장 정보:

- 사진
- 이름
- 역할 또는 과정
- 연구 관심사 1~2줄
- 이메일 또는 링크, 공개 가능한 경우

주의:

- 구성원 사진과 이메일 공개 동의를 먼저 받아야 한다.
- 사진이 없는 경우 임시 실루엣보다 통일된 기본 아바타를 사용하는 편이 좋다.

### Research

목적: 연구실의 연구 주제를 단순 키워드가 아니라 체계적인 연구 프로그램으로 전달한다.

권장 연구 축:

1. Consumer Judgment & Advertising Response  
   광고 메시지, 브랜드 단서, 설득 커뮤니케이션이 소비자 판단과 태도에 미치는 영향을 연구한다.

2. Human-AI Service Interaction  
   AI 상담원, 알고리즘 추천, 자동화 서비스 상황에서 소비자의 신뢰, 불편감, 수용 반응을 분석한다.

3. Service Failure, Recovery & Attribution  
   서비스 실패 이후 사과, 보상, 책임 귀인, 상담원 유형이 소비자 반응에 미치는 영향을 연구한다.

4. Motivation, Construal & Decision Processes  
   조절초점, 해석수준, 심리적 거리, 의사결정 프레이밍이 소비자 선택에 미치는 영향을 다룬다.

보조 섹션:

- Theoretical Foundations: Regulatory Focus, Construal Level Theory, Attribution Theory, Anthropomorphism, Algorithm Aversion
- Methods: experiments, survey research, ANOVA, mediation, moderation, moderated mediation
- Selected Projects: 현재 진행 중인 프로젝트를 공개 가능한 범위에서 소개

### Publications

목적: 연구 성과를 신뢰감 있게 정리하고 검색 가능하게 제공한다.

권장 구조:

- Journal Articles
- Working Papers
- Conference Presentations

논문 표기 형식:

```text
Author, A. A., Author, B. B., & Author, C. C. (Year). Title of the article. Journal Name, volume(issue), pages. https://doi.org/...
```

기능:

- 연도 필터
- 연구 주제 태그
- DOI 링크
- PDF 링크, 저작권상 공개 가능한 경우만
- Google Scholar 링크

### News

목적: 연구실의 활동성과 최신성을 보여준다.

카테고리:

- Publications
- Awards
- Conferences
- Recruitment
- Lab Events
- Media

각 뉴스 항목:

- 날짜
- 카테고리
- 제목
- 1~2문장 요약
- 관련 링크 또는 이미지, 있는 경우

### Join Us

목적: 예비 지원자가 지원 가능성, 준비사항, 문의 방법을 명확히 알게 한다.

권장 구성:

- Join CAP Lab 소개 문구
- Graduate Students: 석사/박사 과정 관심자 안내
- Undergraduate RAs: 학부연구생 또는 RA 안내
- What We Look For: 관심 분야, 기본 역량, 연구 태도
- How to Contact: 이메일, 포함하면 좋은 정보
- Location: 연구실 주소 및 지도 링크

지원 문의 이메일에 포함할 정보:

- 자기소개
- 관심 연구 주제
- CV 또는 이력 요약
- 성적표 또는 연구 경험, 요구 시
- 지원 희망 과정과 시기

---

## 5. 디자인 방향

## 5-1. 디자인 키워드

- Academic
- Clear
- Warm
- Research-driven
- Professional
- Approachable

학술 홈페이지이므로 과도한 장식, 강한 애니메이션, 마케팅식 히어로는 피한다. 대신 충분한 여백, 명확한 정보 계층, 신뢰감 있는 타이포그래피를 우선한다.

## 5-2. 로고 방향

권장안:

- 5번 CAP 워드마크형을 1순위로 발전
- 네비게이션, 파비콘, 모바일 환경에서의 축소 테스트 필수
- 공식 광운대 로고나 비마상은 보조 소속 표기 영역에서만 신중히 사용

권장 색상:

- Primary Navy: `#183A5A`
- Kwangwoon Accent Red: `#B51F2B`
- Text: `#1F2933`
- Muted Text: `#667085`
- Background: `#F6F8FA`
- Surface: `#FFFFFF`
- Border: `#D9E2EC`

레드는 CTA와 강조 요소에 제한적으로 사용하고, 전체 인상은 네이비와 화이트 중심으로 정리하는 것이 좋다.

## 5-3. 타이포그래피

권장:

- 영문 본문: `Source Sans 3`, `Inter`, `IBM Plex Sans`
- 영문 헤딩: `IBM Plex Sans` 또는 `Source Sans 3`
- 국문 보조 텍스트: `Noto Sans KR`

기존의 `Playfair Display`는 우아하지만 연구실 홈페이지에서는 다소 editorial한 인상이 강할 수 있다. CAP Lab의 성격상 산세리프 기반의 정돈된 타이포그래피가 더 안정적이다.

---

## 6. 기술 및 운영 계획

## 6-1. 권장 기술 스택

1차 버전:

- HTML
- CSS
- Vanilla JavaScript
- JSON data files
- GitHub Pages

향후 확장:

- 콘텐츠 업데이트가 잦아지면 Astro 또는 Hugo 검토
- 다국어 운영이 본격화되면 정적 사이트 생성기 도입 검토

## 6-2. 권장 파일 구조

```text
cap-lab/
├── index.html
├── people.html
├── research.html
├── publications.html
├── news.html
├── join.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── pages/
│   ├── js/
│   │   ├── main.js
│   │   └── publications.js
│   ├── data/
│   │   ├── people.json
│   │   ├── publications.json
│   │   └── news.json
│   └── img/
│       ├── logo/
│       ├── people/
│       ├── campus/
│       └── og-image.png
└── README.md
```

---

## 7. 콘텐츠 준비 체크리스트

### 필수

- [ ] CAP Lab 공식 영문명 최종 확인
- [ ] 소속 학과 영문 표기 확인
- [ ] 지도교수 영문 프로필
- [ ] 지도교수 사진
- [ ] 구성원 명단 및 공개 동의
- [ ] 논문 리스트와 DOI
- [ ] 연구실 주소, 이메일, 전화번호
- [ ] 로고 최종 파일, SVG/PNG

### 있으면 좋은 자료

- [ ] 연구실 단체 사진
- [ ] 연구실 공간 또는 캠퍼스 사진
- [ ] 학회 발표 사진
- [ ] 대표 논문 2~3편의 쉬운 요약
- [ ] 모집 FAQ
- [ ] Google Scholar 또는 ORCID 링크

---

## 8. 개발 일정

### Week 1: 기획 확정 및 콘텐츠 수급

- 로고 최종안 확정
- 사이트 언어 정책 확정
- 메뉴 구조 확정
- 지도교수/구성원/논문 데이터 수집
- 와이어프레임 작성

### Week 2: 디자인 시스템 및 공통 구조

- 색상, 타이포그래피, 버튼, 카드, 태그 정의
- 공통 네비게이션과 푸터 구현
- 반응형 레이아웃 기준 구현
- 데이터 파일 구조 생성

### Week 3: 핵심 페이지 제작

- Home 제작
- People 제작
- Research 제작
- 모바일 화면 1차 검수

### Week 4: 성과 및 모집 페이지 제작

- Publications 제작
- News 제작
- Join Us 제작
- 논문 필터링 기능 구현

### Week 5: 검수 및 배포

- 콘텐츠 오탈자 검수
- 이미지 최적화
- 접근성 점검
- SEO 및 Open Graph 메타태그 적용
- GitHub Pages 배포
- 최종 링크 공유

---

## 9. 제작 우선순위

가장 먼저 만들 페이지:

1. Home
2. People
3. Research
4. Publications
5. Join Us
6. News

이유:

- Home, People, Research는 연구실 신뢰도를 가장 먼저 형성한다.
- Publications는 학술적 근거를 제공한다.
- Join Us는 모집 목적에 직접 연결된다.
- News는 초기 콘텐츠가 적으면 비어 보일 수 있으므로 마지막에 제작해도 된다.

---

## 10. 최종 권장 방향

CAP Lab 홈페이지는 “화려한 연구실 소개 사이트”보다 “잘 정리된 학술 브랜드 아카이브”에 가깝게 만드는 것이 좋다. 첫 버전에서는 모든 기능을 많이 넣기보다, 연구실 정체성, 지도교수와 구성원, 연구 주제, 논문, 지원 안내를 명확하고 신뢰감 있게 보여주는 데 집중한다.

핵심 결정안:

- 메뉴는 `Home / People / Research / Publications / News / Join Us`
- 언어는 영문 중심, 지원 안내 일부 국문 보조
- 로고는 5번 CAP 워드마크형 기반으로 발전
- 색상은 네이비 중심, 광운대 레드는 제한적 강조로 사용
- 기술은 HTML/CSS/JS 기반으로 시작하되 콘텐츠 데이터는 JSON 분리
- 첫 배포 목표는 “작지만 완성도 있는 정적 홈페이지”

---

## 11. 다음 액션

바로 진행할 작업:

- [ ] 로고 5번 기준으로 최종 SVG 정리
- [ ] Home 페이지 영문 문구 확정
- [ ] People 페이지에 들어갈 구성원 정보 수집
- [ ] Publications 데이터 정리
- [ ] 정적 사이트 파일 구조 생성
- [ ] Home, People, Research 순서로 1차 구현

*CAP Lab — Consumer Advertising Psychology Lab, Kwangwoon University*
