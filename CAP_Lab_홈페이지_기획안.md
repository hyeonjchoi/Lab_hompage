# CAP Lab 홈페이지 제작 기획안

> **Consumer Advertising Psychology Lab** — Kwangwoon University  
> 작성일: 2025년 5월 | 버전: 1.0

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [사이트맵 및 페이지 구성](#2-사이트맵-및-페이지-구성)
3. [페이지별 콘텐츠 명세](#3-페이지별-콘텐츠-명세)
4. [로고 시안 분석](#4-로고-시안-분석)
5. [디자인 방향](#5-디자인-방향)
6. [기술 스택 및 파일 구조](#6-기술-스택-및-파일-구조)
7. [컴포넌트 설계](#7-컴포넌트-설계)
8. [개발 순서 및 일정](#8-개발-순서-및-일정)
9. [Action Items](#9-action-items)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **연구실명** | Consumer Advertising Psychology Lab (CAP Lab) |
| **소속** | 광운대학교 (Kwangwoon University) |
| **목적** | 연구실 대외 홍보, 구성원 소개, 논문 아카이빙, 대학원생 모집 |
| **타겟** | 잠재 대학원생, 공동 연구자, 학계 관계자, 일반 방문자 |
| **언어** | 영문 기본 (한국어 병기 또는 전환 옵션 검토) |
| **참고 사이트** | tessawestlab.com, CMU SHERLab, NYU Knowles Lab, UChicago MCN Lab, Yale MoD Lab, Rutledge Lab 등 |

---

## 2. 사이트맵 및 페이지 구성

```
CAP Lab Website
├── HOME          (랩 소개 · 히어로 배너)
├── PEOPLE        (구성원 소개)
├── RESEARCH      (진행 중인 연구)
├── PUBLICATION   (게재 논문 리스트)
├── NEWS          (소식지)
└── JOIN US       (지원 안내 · 연락처)
```

---

## 3. 페이지별 콘텐츠 명세

### 3-1. HOME
- **Hero Section**: 랩 이름, 한 줄 미션 문장, CTA 버튼 (Meet the Team / Our Research)
- **About Section**: 연구실 소개 3~4문단, 핵심 연구 키워드 태그 (AI services, Consumer Behavior, Regulatory Focus, Construal Level Theory, Attribution Theory 등)
- **Highlights Section**: 최신 논문 1~2편, 최신 뉴스 1~2건 카드 형태로 노출
- **Affiliations**: 광운대학교 로고, 소속 학과 표기

### 3-2. PEOPLE
- **지도교수** 프로필 (사진, 이름, 직함, 약력, 연구 관심사, 이메일, Google Scholar 링크)
- **구성원 카드** 그리드: 박사과정 / 석사과정 / 학부연구생 섹션 구분
  - 각 카드: 사진, 이름, 과정, 연구 관심사 (1~2줄)
- **Alumni** 섹션 (졸업생 간략 목록)

### 3-3. RESEARCH
- **주요 연구 주제** 카드 형태 나열
  - AI 서비스와 소비자 행동
  - 예방 초점 및 조절 초점(Regulatory Focus)
  - 해석 수준 이론(Construal Level Theory)
  - 서비스 실패와 회복 (사과 vs. 보상, AI vs. 인간 상담원)
  - 귀인 이론(Attribution Theory)
  - 알고리즘 혐오(Algorithm Aversion)
  - 의인화(Anthropomorphism)
- **연구 방법론** 섹션: 실험 설계, ANOVA, 매개·조절 매개 분석
- **게재 목표 저널** 목록: JCR, JMR, JBR, CHB, JSR, JSM, JRCS

### 3-4. PUBLICATION
- **논문 리스트** (역연도순 정렬)
  - 형식: 저자, 연도, 제목, 저널명 (볼드), 권(호), 페이지
  - 태그: 연도 필터 / 키워드 필터
  - 링크: PDF · DOI · Google Scholar
- **Working Papers** 섹션 (투고 중 또는 준비 중 논문)

### 3-5. NEWS
- **카드 리스트** 형태 (역연도순)
  - RA 모집 공고
  - 수상 내역
  - 학회 참가 (발표 제목, 학회명, 날짜)
  - 미디어 등장
  - 연구실 이벤트

### 3-6. JOIN US (CONTACT)
- **지원 안내**
  - 박사과정 / 석사과정 / 학부연구생(RA) 섹션별 지원 조건 및 절차
  - 지원 시 준비 서류 안내
- **지도교수 연락처**
  - 이름, 직함, 이메일, 연구실 전화번호
- **연구실 위치**
  - 주소 (광운대학교 건물명, 호수)
  - 지도 임베드 (Google Maps)
- **참고 레이아웃**: Rutledge Lab 스타일 (건물 사진 + 연락처 2단), NYU Knowles Lab 스타일 (Join the Lab 섹션)

---

## 4. 로고 시안 분석

### 시안 비교표

| 번호 | 스타일 | 특징 | 평가 |
|------|--------|------|------|
| **1번** | 심볼형 (선 드로잉) | 뇌(원)·잎·컵+빨대·느낌표·물결선 조합. 소비자 인지·윤리적 소비·광고 임팩트 상징 | 독창성 ★★★★ / 가독성 ★★★ |
| **2번** | 심볼형 (AI 렌더링) | 1번과 동일 심볼, 텍스트 배치 변형 (KWANGWOON UNIVERSITY 상단) | 1번 개선안. 텍스트 계층 정리 필요 |
| **3번** | 인물+심볼형 | 꽃/토템 형태 + 인물 실루엣 행. 연구 집단·커뮤니티 이미지 강조 | 집단성 강함. 학문적 엄밀성 균형 필요 |
| **4번** | 비마상 활용형 | 광운대 상징물(비마) 메인. 레드 배경. 대학 아이덴티티 강조 | 소속 명확. 독립 브랜딩 제약 있음 |
| **5번** | 워드마크형 (CAP) | C·A·P 이니셜 격자 박스. 레드 테두리. 모던하고 구조적 | 가독성 ★★★★★ / 브랜딩 최적 |

### 로고 확정 방향 (권장)

- **추천**: 5번 CAP 워드마크형 — 학술 홈페이지 가독성·브랜딩 모두 최적
- **색상 검토**: 레드(광운대 컬러 `#C53030`) 유지 OR 네이비(`#1A365D`) 전환
- **추가 발전 아이디어**: 사람 이미지 + C·P 이니셜 조합 (Notion 메모 기반)
- **납품 포맷**: SVG(벡터) + PNG(2x) — 웹 파비콘, 네비게이션 바, OG 이미지 적용용

---

## 5. 디자인 방향

### 5-1. 레퍼런스 사이트 분석

| 사이트 | 참고 포인트 |
|--------|------------|
| [tessawestlab.com](https://tessawestlab.com/) | 미니멀 레이아웃, 연구 중심 내러티브, 깔끔한 타이포그래피 |
| [CMU SHERLab](https://www.cmu.edu/dietrich/psychology/sherlab/index.html) | Contact 카드형 레이아웃, 명확한 연락처 구성 |
| [NYU Knowles Lab](https://wp.nyu.edu/knowleslab/) | Join the Lab 섹션, 대학원 과정별 지원 안내 방식 |
| [UChicago MCN Lab](https://mcnlab.uchicago.edu/) | 전체 네비게이션 구조, 연구 소개 방식 |
| [Yale MoD Lab](https://modlab.yale.edu/) | 심플하고 학술적인 전체 톤 |
| [Rutledge Lab](https://rutledgelab.org/) | Contact 레이아웃 (건물 사진 + 연락처 2단) |
| [UCLA Clewett Lab](https://clewettlab.psych.ucla.edu/publications/) | Publications 페이지 구성 방식 |
| [Yale CCS Lab](https://ccslab.yale.edu/photos) | Photos 섹션 구성 참고 |

### 5-2. 디자인 원칙

1. **학술적 신뢰성** — 과도한 장식 없이 전문적이고 신뢰감 있는 인상
2. **가독성 우선** — 본문 16px 이상, 충분한 줄간격(1.7), 고대비 텍스트
3. **반응형 설계** — 데스크탑 · 태블릿 · 모바일 모두 대응 (Mobile-first)
4. **접근성** — WCAG 2.1 AA 색상 대비 준수, alt 텍스트, 키보드 탐색
5. **빠른 로딩** — 이미지 최적화(WebP), Lazy loading, 최소한의 JS

### 5-3. 컬러 팔레트

```css
:root {
  /* Primary */
  --color-navy:       #1A365D;  /* 네비게이션, 헤딩, 로고 */
  --color-navy-light: #2C5282;  /* 서브 헤딩, 링크 hover */

  /* Accent */
  --color-red:        #C53030;  /* 광운대 레드, CTA, 하이라이트 */
  --color-red-light:  #FC8181;  /* 태그, 배지 */

  /* Neutral */
  --color-bg:         #F7FAFC;  /* 페이지 배경 */
  --color-surface:    #FFFFFF;  /* 카드, 섹션 배경 */
  --color-border:     #E2E8F0;  /* 구분선, 테두리 */
  --color-text:       #1A202C;  /* 본문 */
  --color-text-muted: #718096;  /* 보조 텍스트, 날짜 */

  /* Blue accent (선택) */
  --color-blue-bg:    #EBF4FF;  /* 카드 배경 강조 */
}
```

### 5-4. 타이포그래피

```css
/* 헤딩: 개성 있는 세리프 또는 모던 산세리프 */
--font-heading: 'Playfair Display', Georgia, serif;
/* 또는 대안: 'DM Sans', 'IBM Plex Sans' */

/* 본문: 가독성 높은 산세리프 */
--font-body: 'Source Sans 3', 'Noto Sans KR', sans-serif;

/* 코드/DOI */
--font-mono: 'JetBrains Mono', monospace;

/* 크기 스케일 */
--text-xs:   0.75rem;   /* 12px - 태그, 캡션 */
--text-sm:   0.875rem;  /* 14px - 보조 텍스트 */
--text-base: 1rem;      /* 16px - 본문 */
--text-lg:   1.125rem;  /* 18px - 강조 본문 */
--text-xl:   1.25rem;   /* 20px - 소제목 */
--text-2xl:  1.5rem;    /* 24px - 섹션 제목 */
--text-3xl:  1.875rem;  /* 30px - 페이지 제목 */
--text-4xl:  2.25rem;   /* 36px - Hero 제목 */
--text-5xl:  3rem;      /* 48px - 메인 Hero */
```

---

## 6. 기술 스택 및 파일 구조

### 6-1. 기술 스택 선택지

| 옵션 | 스택 | 적합 상황 | 비고 |
|------|------|-----------|------|
| **A (권장)** | HTML + CSS + Vanilla JS | 빠른 시작, 유지보수 용이 | GitHub Pages 무료 배포 |
| **B** | Hugo (Static Site Generator) | 콘텐츠 관리 용이, 블로그형 | Go 설치 필요 |
| **C** | Next.js + Vercel | 동적 기능, 최신 스택 | React 지식 필요 |

> **현재 코드 직접 작성 방향 → 옵션 A (HTML/CSS/JS) 우선 권장**  
> 이후 Hugo 템플릿으로 마이그레이션 가능한 구조로 설계

### 6-2. 파일 구조 (옵션 A 기준)

```
cap-lab/
├── index.html              # HOME
├── people.html             # PEOPLE
├── research.html           # RESEARCH
├── publication.html        # PUBLICATION
├── news.html               # NEWS
├── join.html               # JOIN US
│
├── assets/
│   ├── css/
│   │   ├── main.css        # 전역 스타일 (CSS 변수, reset)
│   │   ├── nav.css         # 네비게이션
│   │   ├── components.css  # 카드, 버튼, 태그 등 공통 컴포넌트
│   │   └── pages/
│   │       ├── home.css
│   │       ├── people.css
│   │       ├── research.css
│   │       ├── publication.css
│   │       ├── news.css
│   │       └── join.css
│   │
│   ├── js/
│   │   ├── main.js         # 공통 (nav toggle, smooth scroll)
│   │   └── publication.js  # 논문 필터링
│   │
│   └── img/
│       ├── logo/
│       │   ├── cap-logo.svg
│       │   └── cap-logo.png
│       ├── people/         # 구성원 프로필 사진
│       ├── og-image.png    # SNS 공유 썸네일
│       └── favicon.ico
│
└── README.md
```

### 6-3. 공통 HTML 구조 템플릿

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="CAP Lab — Consumer Advertising Psychology Lab at Kwangwoon University">
  <meta property="og:title" content="CAP Lab | Kwangwoon University">
  <meta property="og:image" content="assets/img/og-image.png">
  <title>CAP Lab | [Page Name]</title>
  <link rel="icon" href="assets/img/favicon.ico">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/nav.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/pages/[page].css">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Navigation -->
  <nav class="nav" id="nav">
    <div class="nav__container">
      <a href="index.html" class="nav__logo">
        <img src="assets/img/logo/cap-logo.svg" alt="CAP Lab" height="40">
      </a>
      <button class="nav__toggle" aria-label="메뉴 열기" id="nav-toggle">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__menu" id="nav-menu">
        <li><a href="index.html" class="nav__link">Home</a></li>
        <li><a href="people.html" class="nav__link">People</a></li>
        <li><a href="research.html" class="nav__link">Research</a></li>
        <li><a href="publication.html" class="nav__link">Publication</a></li>
        <li><a href="news.html" class="nav__link">News</a></li>
        <li><a href="join.html" class="nav__link nav__link--cta">Join Us</a></li>
      </ul>
    </div>
  </nav>

  <!-- Main Content -->
  <main id="main">
    <!-- Page-specific content -->
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__logo">
        <img src="assets/img/logo/cap-logo.svg" alt="CAP Lab" height="32">
      </div>
      <p class="footer__text">
        Consumer Advertising Psychology Lab<br>
        Kwangwoon University, Seoul, Korea
      </p>
      <p class="footer__copy">© 2025 CAP Lab. All rights reserved.</p>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

---

## 7. 컴포넌트 설계

### 7-1. 공통 컴포넌트

#### 네비게이션 (nav)
- 고정 상단 (sticky)
- 스크롤 시 배경 불투명도 변화
- 모바일: 햄버거 메뉴
- 현재 페이지 active 표시

#### 카드 (card)
```html
<article class="card">
  <div class="card__img">
    <img src="..." alt="...">
  </div>
  <div class="card__body">
    <span class="tag">Research</span>
    <h3 class="card__title">...</h3>
    <p class="card__desc">...</p>
    <a href="..." class="card__link">Read more →</a>
  </div>
</article>
```

#### 태그 (tag)
```html
<span class="tag tag--blue">AI Services</span>
<span class="tag tag--red">Consumer Behavior</span>
<span class="tag tag--gray">2024</span>
```

#### 섹션 헤더
```html
<div class="section-header">
  <p class="section-header__label">Our Work</p>
  <h2 class="section-header__title">Research Areas</h2>
</div>
```

### 7-2. 페이지별 주요 컴포넌트

| 페이지 | 핵심 컴포넌트 |
|--------|-------------|
| HOME | Hero banner, Research keyword cloud, Highlights grid |
| PEOPLE | Profile card (photo + info), Role section divider |
| RESEARCH | Research topic card (icon + title + desc), Methodology badge |
| PUBLICATION | Publication list item (APA format + links), Year filter tabs |
| NEWS | News card with date badge, Category filter |
| JOIN US | Info card, Contact info block, Google Maps embed |

---

## 8. 개발 순서 및 일정

### 8-1. 개발 단계

```
Week 1 — 기반 작업
  ✅ 로고 파일 확정 (SVG)
  ✅ 파일 구조 생성
  ✅ main.css — CSS 변수, Reset, 기본 타이포그래피
  ✅ nav.css + main.js — 네비게이션 (공통)
  ✅ components.css — 카드, 버튼, 태그, 섹션 헤더

Week 2 — 핵심 페이지
  ✅ index.html + home.css — HOME (Hero, About, Highlights)
  ✅ people.html + people.css — PEOPLE

Week 3 — 콘텐츠 페이지
  ✅ research.html + research.css — RESEARCH
  ✅ publication.html + publication.css + publication.js — PUBLICATION

Week 4 — 보조 페이지 + 반응형
  ✅ news.html + news.css — NEWS
  ✅ join.html + join.css — JOIN US
  ✅ 전체 반응형 검수 (mobile breakpoint: 768px)

Week 5 — 배포
  ✅ 콘텐츠 입력 완료
  ✅ SEO 메타태그 최적화
  ✅ GitHub 저장소 생성 + GitHub Pages 배포
  ✅ 도메인 연결 (선택)
```

### 8-2. 반응형 Breakpoints

```css
/* Mobile first */
/* base       : ~767px  */
/* Tablet     : 768px~  */
/* Desktop    : 1024px~ */
/* Wide       : 1280px~ */

@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
@media (min-width: 1280px) { ... }
```

---

## 9. Action Items

### 즉시 결정 필요

- [ ] **로고 최종 확정** — 5번 CAP 워드마크 기준, 색상(레드 or 네이비) 결정
- [ ] **플랫폼 확정** — HTML/CSS/JS (옵션 A) 우선 진행 여부 확인
- [ ] **도메인 결정** — 예: `caplab.kwangwoon.ac.kr` 또는 별도 도메인 구매

### 콘텐츠 준비 (개발 시작 전)

- [ ] 지도교수 프로필 사진 (고해상도 JPG/PNG)
- [ ] 지도교수 약력 · 연구 관심사 영문 텍스트
- [ ] 구성원 목록 + 각자 연구 관심사
- [ ] 논문 리스트 (APA 형식 + DOI)
- [ ] 연구실 주소 · 연락처 · 이메일

### Claude로 할 수 있는 것 (지금 바로)

- [ ] `main.css` — CSS 변수 + Reset + 타이포그래피 기반 코드 생성
- [ ] `nav` — 반응형 네비게이션 HTML/CSS/JS 생성
- [ ] `index.html` — HOME 페이지 풀 코드 생성
- [ ] `people.html` — PEOPLE 페이지 풀 코드 생성
- [ ] 각 페이지 순차 생성 → GitHub 업로드

---

*CAP Lab — Consumer Advertising Psychology Lab, Kwangwoon University*  
*기획안 버전 1.0 · 2025년 5월*
