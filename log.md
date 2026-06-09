# KW CAP Lab 홈페이지 제작 로그

> 이 파일은 프로젝트 진행 상황과 결정사항을 이어받기 위한 작업 로그입니다.  
> 다음 업데이트나 구현 작업을 시작할 때는 먼저 이 파일을 검토한 뒤 진행합니다.

---

## 2026-06-01 진행 요약

### 1. 초기 기획안 검토

- 기존 파일 `CAP_Lab_홈페이지_기획안.md`를 검토함.
- 원 아이디어 파일 `랩 홈페이지 제작 아이디어 초안/랩 홈페이지 제작 아이디어 초안.md`도 함께 확인함.
- 기존 초안은 사이트 구조, 페이지 구성, 로고 후보, 디자인 방향, 기술 스택이 잘 잡혀 있었으나 기획/디자인/개발 명세가 다소 혼재되어 있었음.

생성 파일:

- `CAP_Lab_홈페이지_기획안_v2.md`

주요 보완 내용:

- 방문자별 목적과 우선순위 재정리
- 연구 주제를 키워드 나열이 아닌 연구 축으로 구조화
- `Publications`, `News`, `Join Us` 역할 분리
- 로고 선택 기준과 기술 스택 보완
- 콘텐츠 준비 체크리스트와 개발 일정 재작성

---

### 2. 언어 정책 및 세부 결정 검토용 HTML 제작

사용자 요청에 따라 홈페이지 기본 언어는 한국어로 하고, 영문을 병기하는 방향으로 결정함.

생성/수정 파일:

- `CAP_Lab_언어정책_및_세부결정_검토.html`

현재 반영된 확정/권장 사항:

- 기본 언어: 한국어
- 영문 병기 범위: 전체 번역이 아니라 핵심 문구, 연구 키워드, 메뉴, 논문 정보 중심 병기
- 연구실 공식명: `광운대학교 소비자광고심리 연구실`
- 영문 약칭: `KW CAP Lab`
- 영문 풀네임 후보: `Kwangwoon University Consumer Advertising Psychology Lab`
- 기본 색상: 네이비 - 화이트 - 레드

메뉴 구성:

- 홈 / Home
- 구성원 / People
- 진행 연구 / Research
- 연구 성과 / Publications
- 소식 / News
- 지원하기 / Join Us

연구 성과 페이지 구조:

- 논문
- 학술발표

연구 주제:

- 소비자 판단과 광고 반응 / Consumer Judgment & Advertising Response
- 인간-AI 서비스 상호작용 / Human-AI Service Interaction
- 식품 관련 연구 / Food-related Consumer Research
- 여성에 관한 연구 / Women, Gender & Consumer Psychology

세부 이론명은 영문 태그 형태로 병기하기로 함.

구성원 공개 정책:

- 기본 프로필은 사진 대신 제작형 이모지 아바타 사용
- 공개 정보: 국문 이름, 영문 이름, 과정, 연구 관심사
- 사진은 희망자만 업로드
- 이메일은 희망자만 공개

논문/연구 성과 링크 정책:

- DOI와 저널 링크 우선
- 가능한 경우 학교 도서관 사이트로 연동
- PDF 업로드는 우선순위에서 제외하고, 공개 가능 여부 확인 후 선택

지원 안내 정책:

- 대학원생과 학부연구생 RA 모집을 구분
- 석사/박사 과정은 대학원 홈페이지로 연결
- RA는 상시 모집으로 연구실 개별 문의 안내
- 학교 공식 입학 절차와 연구실 개별 문의를 분리해서 설명

로고 검토:

- 전달된 로고 후보 5개를 검토용 HTML에 모두 추가함.
- 사용자는 이후 최종 로고를 선택할 예정.
- 현재 임시 홈페이지 시안에서는 로고 후보 3을 적용함.

---

### 3. 로고 후보 3 적용 임시 홈페이지 시안 제작

사용자 요청에 따라 현재까지 결정된 사항을 바탕으로 임시 연구실 홈페이지 예시를 제작함.

생성 파일:

- `KW_CAP_Lab_home_logo3_preview.html`

적용 내용:

- 로고 후보 3 적용
- 연구실명: `광운대학교 소비자광고심리 연구실`
- 영문 표기: `KW CAP Lab`
- 메뉴: `홈 / 구성원 / 진행 연구 / 연구 성과 / 소식 / 지원하기`
- 히어로 문구 한국어 중심 + 영문 병기
- 연구 주제 4개 카드 구성
- 구성원 섹션은 이모지 아바타 기반 임시 프로필로 구성
- 연구 성과는 `논문`과 `학술발표`로 분리
- 지원하기 섹션은 대학원생 안내, RA 상시 모집, 연구실 문의로 구성
- 색상은 네이비 - 화이트 - 레드 적용

미리보기 주소:

- `http://localhost:8765/KW_CAP_Lab_home_logo3_preview.html`

서버 상태:

- `python3 -m http.server 8765`로 로컬 서버를 실행함.
- `curl -I http://localhost:8765/KW_CAP_Lab_home_logo3_preview.html` 결과 `HTTP/1.0 200 OK` 확인.
- 단, in-app browser가 기존 `file://` 탭 보안 정책 때문에 자동 이동/새로고침 제어가 차단됨.
- 사용자는 브라우저 주소창에 위 localhost 주소를 직접 입력하면 시안을 확인할 수 있음.

주의:

- 서버 세션이 끊기면 동일 폴더에서 다시 실행 필요:

```bash
python3 -m http.server 8765
```

---

## 현재 파일 목록 (2026-06-02 기준)

### 기획 문서
- `CAP_Lab_홈페이지_기획안.md`
- `CAP_Lab_홈페이지_기획안_v2.md`
- `CAP_Lab_언어정책_및_세부결정_검토.html`
- `KW_CAP_Lab_home_logo3_preview.html` (구버전 단일 HTML 시안 — 참고용 보존)
- `log.md`

### 멀티페이지 사이트 (현행 작업 파일)
| 파일 | 역할 |
|------|------|
| `style.css` | 공통 스타일시트 |
| `index.html` | Home |
| `people.html` | 구성원 (동적 렌더링) |
| `research.html` | 진행 연구 (동적 렌더링) |
| `publications.html` | 연구 성과 (동적 렌더링) |
| `news.html` | 소식 (동적 렌더링) |
| `join.html` | 지원하기 |
| `cap-data.js` | 데이터 레이어 (localStorage CRUD) |
| `cap-auth.js` | 인증·세션·nav 렌더링 유틸 |
| `login.html` | 로그인 페이지 |
| `member-dashboard.html` | 구성원 프로필 셀프 편집 |
| `admin.html` | 관리자 패널 (5탭) |

---

## 다음 진행 시 우선 확인할 사항

### 콘텐츠 입력 (admin.html에서 직접 작업 가능)
1. 초기 관리자 학번 변경 — `이병관 / ADMIN001`, `임혜빈 / ADMIN002` → 실제 학번으로 교체
2. 각 학생 구성원 학번 등록 (현재 공란)
3. 학생 영문 이름 및 연구 관심사 입력 (member-dashboard.html 또는 admin.html)
4. 실제 논문 목록 입력 (제목·저자·저널·DOI)
5. 실제 학술발표 목록 입력
6. 연구실 문의 이메일 주소 확정 → join.html 반영
7. 대학원 홈페이지 URL 확인 → join.html 반영

### 디자인 검토
8. 로고 최종 결정 (현재 로고 후보 3 적용 중)
9. 모바일 뷰 직접 확인 (640px 이하)
10. Hero 영역 및 전체 레이아웃 피드백 반영

### Lovable 이전 준비 (추후)
11. 각 HTML 페이지 → React 컴포넌트로 변환
12. localStorage → Supabase 또는 Firebase 백엔드 교체 (실서비스용 인증 필요)
13. 배포 환경 결정 (GitHub Pages / Vercel / 학교 서버)

---

---

## 2026-06-02 진행 요약

### 멀티페이지 구조로 전환

사용자 요청에 따라 단일 HTML 파일 → 탭마다 독립 페이지로 전환.

생성 파일:

- `style.css` — 공통 스타일 (기존 프로토타입 CSS 변수·레이아웃 추출, 반응형 포함)
- `index.html` — Home (Hero + 연구 스냅샷 + 최근 논문 + 소식 + Join 밴드)
- `people.html` — 구성원 (교수 2명, 박사 2명, 석사 3명, RA 3명 — 실제 성명 반영)
- `research.html` — 진행 연구 (4개 연구 축 상세 카드 + 이론 태그)
- `publications.html` — 연구 성과 (논문 / 학술발표 섹션, 플레이스홀더)
- `news.html` — 소식 (카테고리 배지 포함 뉴스 리스트)
- `join.html` — 지원하기 (대학원 / RA / 연구실 문의 — 주소·전화번호 반영)

반영된 확정 정보:

- 공식 영문명: Kwangwoon University Consumer Advertising Psychology Lab · KW CAP Lab
- 소속: Department of Industrial Psychology · Kwangwoon University
- 지도교수: 이병관 (Byung-kwan Lee), 임혜빈 (Hye Bin Rim)
- 구성원: 박사과정 박정은·최현정 / 석사과정 김재용·김민지·이수빈 / RA 김동욱·오현하·이규나
- 주소: 서울특별시 노원구 광운로 20, 광운대학교 (01897)
- 전화: 02)940-5420

추가 필요 정보 (placeholder 표시):

- 각 학생 영문 이름
- 각 구성원 연구 관심사
- 실제 논문 목록 (제목·저자·저널·DOI)
- 실제 학술발표 목록
- 대학원 홈페이지 URL
- 연구실 문의 이메일

로컬 서버:

- `python3 -m http.server 8765` (랩홈페이지 디렉터리)
- `http://localhost:8765/index.html` 접속 확인 완료

---

---

## 2026-06-02 (2차) — UI 수정 및 로그인/관리자 시스템 추가

### 수정 사항

1. **브랜드 서브타이틀** — 전체 6개 HTML에서 "KW CAP Lab" → "Kwangwoon University Consumer Advertising Psychology Lab"
2. **로고 통합** — hero-logo-wrap을 네이비 배경 패널로 변환, fact 카드도 투명/화이트 배색
3. **Hero h1 크기 축소** — `clamp(2.2rem, 5vw, 4.85rem)` → `clamp(1.7rem, 3.2vw, 3rem)`
4. **로그인 시스템** — 이름 + 학번으로 로그인, sessionStorage 기반 세션
5. **구성원 프로필 편집** — 로그인 후 구성원 페이지에서 "편집" 버튼 → member-dashboard.html
6. **관리자 패널** — admin.html: 구성원·홈 문구·연구 축·논문·소식 5탭 관리
7. **동적 렌더링** — people/research/publications/news/index 페이지가 localStorage 데이터를 읽어 렌더링

### 신규 파일

- `cap-data.js` — 데이터 모델 (기본값 포함), localStorage CRUD
- `cap-auth.js` — 인증, 세션, nav 렌더링, escHtml(), showToast()
- `login.html` — 로그인 페이지
- `member-dashboard.html` — 구성원 셀프 편집
- `admin.html` — 관리자 패널 (5탭)

### 초기 관리자 계정 (변경 필요)

| 이름  | 학번     |
|-------|---------|
| 이병관 | ADMIN001 |
| 임혜빈 | ADMIN002 |

→ admin.html 구성원 관리 탭에서 실제 학번으로 변경 가능

### 로컬 서버

```bash
python3 -m http.server 8765
```
- 홈: http://localhost:8765/index.html
- 로그인: http://localhost:8765/login.html
- 관리자: http://localhost:8765/admin.html

---

## 2026-06-05 — 실험실 예약 페이지 및 이모지 아바타 추가

### 수정 사항

1. **실험실 예약 페이지 추가**
   - `reservation.html` 신규 생성
   - 산업심리학과 학생 전용 실험실습실, 한울관 105호 안내 추가
   - 이용 지침 추가: `평일 1인 최대 2시간 가능. 단, 실험 진행 목적인 경우 별도 요청 요망.`
   - 예약 사이트 버튼 추가: https://kwpsy-lab-reservation.psy-lab.workers.dev/
   - 실험실 공지사항 버튼 추가: https://psy.kw.ac.kr/community/board.php
   - 실험실습실 픽토그램형 시각화 추가

2. **메뉴 업데이트**
   - 전체 주요 페이지 내비게이션에 `실험실 예약 · Lab` 메뉴 추가
   - 홈 / 구성원 / 진행 연구 / 연구 성과 / 실험실 예약 / 지원하기 구조로 정리

3. **이모지 아바타 기능 추가**
   - `member-dashboard.html`에 이모지 아바타 입력 및 프리셋 버튼 추가
   - 저장 필드: `profile.avatarEmoji`
   - 구성원 카드 표시 우선순위: 프로필 사진 > 이모지 아바타 > 기존 글자 아바타
   - 사진이 없을 때 이모지 아바타가 미리보기와 구성원 페이지에 반영되도록 처리

### 메모

- 현재 이모지 기능은 사용자가 직접 이모지 문자 또는 짧은 이모지 조합을 입력하는 방식이다.
- 완전한 캐릭터 제작기(얼굴형, 머리, 표정, 색상 조합 등)는 별도 캔버스/SVG 기반 편집 UI가 필요하므로 후속 확장 기능으로 분리 가능하다.

### 검증 완료

- `reservation.html` 접속, 메뉴 현재 페이지 표시, 예약/공지 외부 링크 표시 확인
- 한울관 105호 소개, 평일 1인 최대 2시간 지침, 실험실습실 픽토그램 표시 확인
- 실험실 예약 메뉴 영문 표기 `RSVN` 적용 및 `Usage Guide`/막대그래프 제거 확인
- 프로필 편집 화면의 이모지 입력/프리셋 버튼 표시 확인
- 이모지 프리셋 클릭 시 미리보기 아바타 갱신 확인
- 브라우저 콘솔 오류 없음 확인

### 2026-06-05 추가 구현 — 조합형 캐릭터 메이커

- `cap-auth.js`에 공용 `CAPAvatar` SVG 렌더러 추가
- `member-dashboard.html`에 얼굴형, 표정, 배경색, 소품을 선택하는 조합형 캐릭터 메이커 추가
- 저장 필드: `profile.characterAvatar`
- 구성원 카드 표시 우선순위 확정: 프로필 사진 > 조합형 캐릭터 > 직접 입력 이모지 > 기존 글자 아바타
- 브라우저 검증: 캐릭터 옵션 선택 시 미리보기 SVG 갱신, 저장 후 `people.html` 구성원 카드에 캐릭터 SVG 표시 확인

---

## 2026-06-05 — 소식 제거, 구성원/지원 페이지 업데이트

### 수정 사항

1. **소식 페이지 제거**
   - `news.html` 삭제
   - 전체 주요 내비게이션에서 `소식 / News` 메뉴 제거
   - 홈의 `최근 소식` 섹션 제거
   - 관리자 패널의 `소식 관리` 탭 제거
   - `cap-data.js`의 기본 소식 데이터 및 뉴스 CRUD 제거

2. **구성원 페이지 개선**
   - 구성원 페이지 하단에 `졸업생 · Alumni` 섹션 추가
   - 졸업생은 이름, 학위, 현재 소속 중심으로 표시
   - 졸업생 정보가 없을 때도 안내 카드가 보이도록 처리
   - 프로필 사진이 등록된 구성원은 이니셜 아바타 대신 사진 표시

3. **구성원 그룹 옵션 추가**
   - 관리자 구성원 추가 폼에 `석·박통합과정` 옵션 추가
   - `석·박통합과정` 구성원은 구성원 페이지의 `박사과정` 섹션에 함께 표시
   - 관리자 구성원 추가 폼에 `졸업생` 옵션 추가

4. **프로필 사진 수정 기능 추가**
   - `member-dashboard.html`에서 구성원이 본인 프로필 사진 업로드/제거 가능
   - PNG, JPG, WebP, GIF 지원
   - 1MB 이하 파일 권장 및 초과 파일 업로드 차단
   - 저장된 사진은 localStorage의 구성원 `profile.photo`에 data URL로 보관

5. **지원하기 페이지 업데이트**
   - `대학원 홈페이지 바로가기` → https://grad.kw.ac.kr/
   - `광운대 산업심리학과 홈페이지 바로가기` 버튼 추가 → https://psy.kw.ac.kr/
   - 학부연구생 RA 문의 이메일 및 mailto 링크를 `hbrim@kw.ac.kr`로 수정
   - 연구실 문의 이메일도 `hbrim@kw.ac.kr`로 표시

### 검증 완료

- 홈/구성원/지원하기 페이지에서 소식 메뉴와 최근 소식 섹션 제거 확인
- 구성원 페이지 하단 `졸업생 · Alumni` 섹션 표시 확인
- 지원하기 페이지의 대학원/산업심리학과 외부 링크 및 `hbrim@kw.ac.kr` 표시 확인
- 관리자 패널에서 소식 관리 탭 제거 확인
- 관리자 그룹 선택에 `석·박통합과정`, `졸업생` 옵션 표시 확인
- 프로필 편집 화면에서 사진 업로드 입력, 사진 제거 버튼, 미리보기 아바타 영역 표시 확인
- 브라우저 콘솔 오류 없음 확인

---

## 2026-06-05 — 구성원/연구성과/진행 연구 관리 확장

### 수정 사항

1. **조합형 캐릭터 메이커 성별 옵션 추가**
   - 프로필 편집 화면의 조합형 캐릭터 메이커에 `여성`, `남성` 선택 옵션 추가
   - 선택한 성별에 따라 캐릭터 SVG의 머리 모양이 다르게 렌더링되도록 수정
   - 저장 필드 `profile.characterAvatar.gender` 추가

2. **관리자 졸업생 추가 기능 보강**
   - 관리자 구성원 추가 폼에서 `졸업생` 선택 시 이름, 학위, 현 소속 입력 필드 표시
   - 졸업생은 학위를 `profile.position`, 현 소속을 `profile.interest`에 저장
   - 졸업생 프로필 편집 화면에서는 사진 업로드/삭제는 유지하고, 조합형 캐릭터 및 이모지 편집 도구는 숨김 처리
   - 구성원 페이지의 졸업생 카드는 조합형 캐릭터 대신 사진 또는 기본 아바타만 사용

3. **연구성과 수상내역 추가**
   - `cap-data.js`에 `publications.awards` 기본 구조 및 추가/삭제 API 추가
   - 연구성과 페이지에 `수상내역` 섹션 추가
   - 로그인 사용자는 수상내역 입력 가능, 관리자는 삭제 가능
   - 관리자 페이지 연구성과 관리 탭에 수상내역 목록/입력 폼 추가

4. **진행 연구 연구 축 동적 관리**
   - 관리자 페이지에서 연구 축을 새로 추가하거나 삭제할 수 있는 기능 추가
   - 삭제 후 연구 축 번호가 자동 정리되도록 처리
   - 홈 화면의 진행 연구 카드 그리드를 `auto-fit` 방식으로 변경해 카드 수가 늘거나 줄어도 간격이 자동 조정되도록 수정
   - 홈/진행 연구/관리자 페이지 모두 동일한 `research.axes` 데이터를 사용하므로 연구 축 변경이 연관 페이지에 자동 반영됨

### 검증 완료

- `cap-data.js`, `cap-auth.js` 문법 검사 통과
- `admin.html`, `publications.html`, `member-dashboard.html`, `people.html`, `index.html` 인라인 스크립트 문법 검사 통과
- 주요 변경 키워드와 참조 위치 확인 완료
- 브라우저 직접 검증은 현재 Browser/localhost 접근 제한으로 수행하지 못했으며, 정적 문법 검증과 파일 참조 검증으로 대체

---

## 2026-06-05 — 홈 대시보드 히어로 1열 구성 변경

### 수정 사항

- 홈 화면 상단 히어로 영역의 2열 레이아웃을 1열 구성으로 변경
- 오른쪽 카드에 있던 `KW / CAP Lab` 및 `Understanding how consumers think, feel, and act in advertising, service, and AI-mediated contexts.` 문구 제거
- 기존 오른쪽 카드의 연구 키워드와 요약 정보는 소개문구 아래로 이동
- 홈 요약 정보의 `연구 축`, `구성원` 숫자는 실제 저장 데이터 기준으로 갱신되도록 수정

### 검증 완료

- `index.html` 인라인 스크립트 문법 검사 통과
- 삭제 대상 영문 카드 문구가 더 이상 남아 있지 않은 것 확인

---

## 2026-06-05 — 로그인 페이지 문구 수정

### 수정 사항

- 로그인 입력 라벨을 `학번`에서 `학번/교번`으로 변경
- 로그인 입력 placeholder를 `학번/교번을 입력하세요`로 변경
- 교수 안내 문구를 `교수님은 관리자 계정 비번을 사용하세요.`로 변경

### 검증 완료

- `login.html` 인라인 스크립트 문법 검사 통과
- 변경 문구 반영 확인

---

## 2026-06-09 — GitHub 푸시 및 GitHub Pages 배포 확인

### 진행 사항

1. **Git 저장소 초기화 및 첫 커밋 생성**
   - 현재 홈페이지 작업 폴더를 Git 저장소로 초기화
   - `.gitignore` 추가: `.DS_Store`, `*.log`, `node_modules/` 제외
   - 첫 커밋 생성: `b4107c0 Initial KW CAP Lab homepage`

2. **GitHub 원격 저장소 연결 및 푸시**
   - 원격 저장소: `git@github.com:hyeonjchoi/Lab_hompage.git`
   - 브랜치: `main`
   - `main` 브랜치를 `origin/main`으로 푸시 완료

3. **GitHub Pages 배포 완료 확인**
   - 공개 주소: `https://hyeonjchoi.github.io/Lab_hompage/`
   - 홈 페이지가 `HTTP/2 200`으로 정상 응답하는 것 확인
   - 배포된 HTML의 제목과 주요 내용이 현행 `index.html`과 일치하는 것 확인
   - GitHub Pages 응답 기준 `Last-Modified: Tue, 09 Jun 2026 04:19:51 GMT`

### 배포 검증 완료

- 홈: `https://hyeonjchoi.github.io/Lab_hompage/` — 정상 응답
- CSS: `https://hyeonjchoi.github.io/Lab_hompage/style.css` — 정상 응답
- 구성원: `https://hyeonjchoi.github.io/Lab_hompage/people.html` — 정상 응답
- 진행 연구: `https://hyeonjchoi.github.io/Lab_hompage/research.html` — 정상 응답
- 연구 성과: `https://hyeonjchoi.github.io/Lab_hompage/publications.html` — 정상 응답

### 운영 메모

- `localhost:8765` 주소는 작업자 본인 컴퓨터에서만 열리는 임시 확인용 링크다.
- 외부 공유는 GitHub Pages 공개 주소를 사용한다.
- 공동 관리 시 collaborator 초대 후 `main` 직접 수정 대신 브랜치 작업과 Pull Request 검토 흐름을 권장한다.

---

## 다음 작업자를 위한 진행 규칙

- 새 작업을 시작하기 전에 반드시 이 `log.md`를 먼저 확인한다.
- 사용자가 새 결정을 내리면 이 파일에 날짜별로 추가 기록한다.
- 기존 산출물을 삭제하거나 덮어쓰기 전에 사용자에게 확인한다.
- 로고, 이름, 메뉴, 연구 주제, 지원 정책처럼 의사결정이 필요한 항목은 이 로그를 업데이트한다.
- 현행 사이트의 기준 파일은 멀티페이지 구조(`index.html` + 공유 `style.css`)이며, 구버전 단일 파일(`KW_CAP_Lab_home_logo3_preview.html`)은 참고용으로만 보존한다.
- 데이터 수정은 `admin.html`을 통해 진행하고, 코드 수정이 필요한 경우에만 파일을 직접 편집한다.
- 로컬 서버 실행: `python3 -m http.server 8765` (랩홈페이지 디렉터리에서)
