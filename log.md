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

## 2026-06-12 — 알림 기능 정리 및 Supabase 연동 후속 작업

### 현재 반영된 알림 기능

- `cap-notifications.js`를 추가하여 LAB 페이지와 개인 연구 기록 페이지에 `알림 센터`를 연결함.
- 현재 알림은 PWA/브라우저 알림 기반이며, 사용자가 모바일 브라우저 또는 홈 화면 앱에서 직접 `알림 허용`을 눌러야 동작함.
- 서비스워커 `sw.js`에 알림 클릭 핸들러를 추가하여 알림을 누르면 관련 LAB 페이지 또는 개인 연구 기록 페이지로 이동하도록 함.
- 현재 알림 대상:
  - 24시간 이내 다가오는 일정/미팅
  - 1시간 이내 곧 시작되는 긴급 일정
  - 2일 이내 마감되는 개인 연구 목표
  - 아직 확인/반영 체크가 되지 않은 지도교수 피드백

### 현재 구조의 한계

- 현재 사이트 데이터는 `localStorage`에 저장되므로 같은 기기 안에서만 알림 판단이 가능함.
- PC에서 교수가 피드백을 추가하더라도, 모바일 기기에는 같은 데이터가 자동 동기화되지 않기 때문에 “즉시 푸시 알림”은 아직 불가능함.
- 브라우저가 페이지를 열거나 PWA가 실행될 때 localStorage 데이터를 읽어 알림을 계산하는 방식이므로, 서버에서 새 이벤트를 감지해 모든 대상 기기로 보내는 구조는 아님.

### Supabase 프로젝트 연동 시 반드시 필요한 알림 후속 작업

Supabase 연동 작업을 시작할 때는 아래 항목을 별도 작업 범위로 반드시 포함해야 함.

- `localStorage` 기반 LAB 데이터를 Supabase 테이블로 이전:
  - 일정/미팅
  - 연구 목표
  - 메모/피드백
  - 공지
  - 구성원/권한
- 사용자별 푸시 알림 구독 정보를 저장하는 테이블 추가:
  - 사용자 ID
  - 기기별 push subscription
  - 알림 허용 여부
  - 알림 유형별 설정
- Supabase Edge Function 또는 별도 서버 함수를 만들어 새 데이터 생성/수정 시 알림을 발송:
  - 다른 사람이 내 개인 연구 기록에 지도교수 피드백을 추가하면 내 폰에 즉시 푸시
  - 내가 참석자인 미팅 일정이 새로 추가되거나 변경되면 대상 구성원에게 푸시
  - 목표 종료일이 가까워지면 사전 리마인더 푸시
  - 신규 공지가 등록되면 구성원에게 푸시
  - 특히 `중요` 공지가 등록되면 일반 공지보다 우선적으로 즉시 푸시
- 알림 수신 대상을 역할과 관계 기준으로 제한:
  - 개인 피드백은 해당 학생에게만 발송
  - 미팅 알림은 참석자 또는 전체 대상 기준으로 발송
  - 중요 공지는 전체 구성원 또는 지정 그룹에게 발송
- 알림 이력 테이블을 추가하여 중복 발송을 방지하고, 사용자가 이미 확인한 알림을 추적.

### Supabase 작업 시작 시 알림 요구사항 안내 문구

Supabase 프로젝트를 실제로 구현할 때는 다음 요구사항을 작업 시작 전에 다시 확인해야 함:

> 현재 알림 기능은 기기 내 localStorage 기반 PWA 알림이다. Supabase 연동 시에는 “다른 사람이 추가한 피드백이 내 폰에 즉시 푸시되는 구조”, “중요 공지 등록 시 즉시 푸시되는 구조”, “미팅/목표 마감 사전 알림”을 서버 기반 푸시 알림으로 별도 구현해야 한다.

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

---

## 2026-06-12 — PWA(모바일 홈화면 추가) 준비 및 Supabase 설계

### 진행 사항

1. **PWA 기반 모바일 앱 준비 완료**
   - 현행 홈페이지를 React Native 앱으로 재작성하는 방향이 아닌, 기존 웹 코드를 그대로 활용하는 **PWA(Progressive Web App)** 방식으로 결정
   - iOS·Android 모두 Safari/Chrome의 "홈화면에 추가" 기능으로 앱처럼 설치 가능
   - GitHub Pages(HTTPS) 위에서 즉시 동작

2. **생성 파일**

   | 파일 | 역할 |
   |------|------|
   | `manifest.json` | 앱 이름·아이콘·시작URL·테마색 정의 |
   | `sw.js` | 서비스 워커 — 정적 에셋 캐싱, 오프라인 지원 |
   | `icons/icon-192.png` | Android 홈화면 아이콘 (192×192) |
   | `icons/icon-512.png` | Android 스플래시·고해상도 (512×512) |
   | `icons/apple-touch-icon.png` | iOS 홈화면 아이콘 (180×180) |
   | `icons/favicon-32.png` | 브라우저 탭 파비콘 (32×32) |
   | `supabase-client.js` | Supabase 초기화 + Auth/DB 헬퍼 함수 |
   | `supabase-schema.sql` | Supabase 데이터베이스 스키마 (7개 테이블 + RLS) |

3. **전체 HTML 14개 파일 PWA 메타태그 일괄 추가**
   - `<link rel="manifest">`, `theme-color`, `apple-mobile-web-app-*` 메타태그 삽입
   - `</body>` 직전에 서비스 워커 등록 스크립트 삽입
   - 대상: index, people, research, publications, reservation, join, login, lab, lab-member, lab-minutes, lab-notices, lab-resources, admin, member-dashboard

4. **Supabase 스키마 설계 완료**
   - 7개 테이블: `members`, `lab_events`, `meeting_minutes`, `notices`, `resources`, `member_goals`, `member_notes`
   - Row Level Security: 교수(professor)와 일반 구성원 권한 분리
   - 회의록 60일 보관 규칙 반영
   - `updated_at` 자동 갱신 트리거 포함

### 메모

- 아이콘(`icons/`)은 현재 KW·CAP 픽셀 아트 임시 버전이다. 정식 아이콘 PNG 파일로 교체 시 동일 파일명으로 덮어쓰면 된다.
- 현행 `cap-auth.js` / `cap-data.js`는 아직 localStorage 기반이다. Supabase 연동 후 `supabase-client.js`의 `CapAuth` / `CapDB` 헬퍼로 교체 예정.

---

## 이후 예정 작업

### 1. Supabase 연동 (우선순위 높음)

현재 사이트는 `localStorage` 기반이라 기기 간 데이터 공유가 불가능하다.  
Supabase 연동으로 실제 멀티유저 환경을 구성한다.

**단계별 진행 계획:**

| 단계 | 내용 |
|------|------|
| ① 프로젝트 생성 | supabase.com → New Project 생성, 지역: Northeast Asia(Seoul) 권장 |
| ② SQL 실행 | 대시보드 SQL Editor에 `supabase-schema.sql` 전체 붙여넣기 → Run |
| ③ 키 입력 | `supabase-client.js` 상단 `SUPABASE_URL` · `SUPABASE_ANON_KEY` 입력 |
| ④ Auth 교체 | `login.html` + `cap-auth.js`의 localStorage 로그인 → Supabase Auth 방식으로 교체 |
| ⑤ 데이터 교체 | `cap-data.js`의 localStorage CRUD → `supabase-client.js`의 `CapDB` 헬퍼 호출로 교체 |
| ⑥ 공동작업자 설정 | Supabase 대시보드 Organization → Settings → Team에서 교수님 계정 초대 |

**Supabase 공동작업자 권한:**
- **Owner**: 교수님 — 프로젝트 전체 관리
- **Administrator**: 서버 담당 대학원생 — SQL 스키마 수정·API 키 확인
- **일반 구성원**: Supabase 대시보드 접근 불필요, RLS 정책으로 데이터 권한 관리

**주의사항:**
- Supabase Free 플랜: 팀원 최대 2명 (Owner 포함), Pro 플랜($25/월)은 무제한
- `supabase-client.js`의 `SUPABASE_ANON_KEY`는 공개 저장소에 올려도 안전한 공개 키이나, `service_role` 키는 절대 커밋하지 않는다

---

### 2. 디자인 및 레이아웃 시안 검토

현재 `design-proposals.html`, `design-proposals-v2.html`, `layout-proposals.html`, `proposal-1~8.html`, `layout-1~4.html` 등 다수의 시안 파일이 존재한다.  
각 시안의 컨셉과 현행 사이트와의 차이를 검토하고 최종 디자인 방향을 결정할 예정이다.

**검토 대상 파일:**

| 파일 | 내용 |
|------|------|
| `design-proposals.html` | 디자인 시안 1차 묶음 |
| `design-proposals-v2.html` | 디자인 시안 2차(개선) 묶음 |
| `layout-proposals.html` | 레이아웃 비교 묶음 |
| `proposal-1~8.html` | 개별 시안 8종 |
| `layout-1~4.html` | 레이아웃 변형 4종 |

**검토 시 확인할 항목:**
- 현행 네이비-화이트-레드 색상 체계 유지 여부
- 모바일(PWA) 환경에서의 가독성 및 터치 UX
- 헤더·히어로·카드 레이아웃의 변화 방향
- 로고 위치·크기·브랜딩 노출 방식
- 시안 중 채택할 요소와 폐기할 요소 선별

---

## 2026-06-12 — v1 4번째 시안 기반 매거진 편집형 디자인 적용

### 최종 적용 방향

- `design-proposals.html`의 v1 4번째 시안인 **매거진·편집(Magazine Editorial)** 스타일을 현행 홈페이지에 적용했다.
- 딥 네이비 배경, 기하학 패턴, 레드 좌측 라인, 각진 카드/버튼/패널을 공통 디자인 언어로 사용한다.
- 기존 시안 파일(`design-proposals*.html`, `proposal-1~8.html`, `layout-1~4.html`, `layout-*`)은 삭제하지 않고 보존했다.

### 주요 수정 파일

| 파일 | 변경 요약 |
|------|-----------|
| `index.html` | 홈 히어로를 매거진형 레이아웃으로 변경, 우측 연구실 통계 패널 추가 |
| `style.css` | 공통 헤더, 홈 히어로, 페이지 히어로, 카드, LAB 화면, 프로필 편집 화면 디자인 전반 수정 |
| `lab.html` | LAB 연구 페이지에 새 CSS 버전 적용 |
| `lab-member.html` | 개인 연구 페이지에 새 디자인 적용, LAB 메뉴 활성 상태 표시 |
| `member-dashboard.html` | 내 프로필 편집 페이지에 딥 네이비 패턴 히어로와 각진 폼/미리보기 패널 적용 |
| `people.html` | 구성원 페이지 CSS 캐시 버전 갱신 |
| `research.html` | 진행 연구 페이지 제목 영역을 딥 네이비 패턴 히어로로 통일 |
| `publications.html` | 연구 성과 페이지 제목 영역을 딥 네이비 패턴 히어로로 통일 |
| `reservation.html` | 실험실 예약 페이지 제목·예약 안내·픽토그램 카드 각진 디자인 적용 |
| `join.html` | 지원하기 페이지 제목 영역과 안내 섹션을 새 톤으로 통일 |
| `sw.js` | 서비스워커 캐시 버전을 `kw-cap-lab-v8`로 갱신 |

### 세부 조정 사항

1. **상단 헤더**
   - 좌측 브랜드 마크와 `광운대학교 소비자광고심리 연구실` 텍스트 크기/간격 조정
   - 연구실명은 줄바꿈되지 않도록 `white-space: nowrap` 적용
   - `지원하기` 버튼은 기존 요청에 따라 네이비 색상으로 복원
   - `LAB` 버튼은 홈/LAB 화면 모두 각진 형태로 통일

2. **로그인 후 내비게이션**
   - 로그인 사용자 이름 위치를 구분선 안쪽 좌측 기준으로 조정
   - `내 프로필`, `내 연구페이지`는 네모 버튼이 아닌 밑줄 링크 형태로 표시
   - `관리자`, `알림 차단됨`, `로그아웃`은 보조 액션 버튼으로 유지

3. **홈 화면**
   - v1 4번째 시안의 매거진형 히어로 적용
   - 우측 원형 `KW CAP Lab` 통계 영역과 4개 통계 카드 표시
   - 모바일에서는 우측 통계 영역을 숨기고 텍스트/버튼 중심으로 표시

4. **내부 페이지 제목 영역**
   - 구성원, 진행 연구, 연구 성과, 실험실 예약, 지원하기 페이지의 `.page-hero`를 LAB 연구 페이지와 같은 딥 네이비 패턴 배경으로 통일

5. **LAB 계열 페이지**
   - `lab.html`, `lab-member.html`, `member-dashboard.html`에 같은 네이비 패턴 히어로 적용
   - LAB 대시보드 카드, 캘린더, 회의록, 공지, 공유 자료, 진행 상황 카드의 둥근 형태 제거
   - 개인 연구 페이지의 `LAB으로 돌아가기` 버튼 텍스트를 중앙 정렬
   - 프로필 편집 페이지의 미리보기 카드, 프로필 정보 폼, 이모지/캐릭터 설정 박스도 각진 디자인으로 통일

6. **구성원 및 예약 페이지**
   - 구성원 카드와 아바타의 둥근 형태 제거
   - 실험실 예약 안내 박스, 이용 지침 박스, 실험실 픽토그램 카드의 둥근 형태 제거

### 검증

- 로컬 정적 서버(`python3 -m http.server 8000`)로 주요 페이지 확인
- 확인 페이지:
  - `index.html`
  - `people.html`
  - `research.html`
  - `publications.html`
  - `reservation.html`
  - `join.html`
  - `lab.html`
  - `lab-member.html`
  - `member-dashboard.html`
- 주요 확인값:
  - 상단 연구실명 한 줄 유지
  - `지원하기` 배경색 네이비 적용
  - `LAB` 버튼 `border-radius: 0px`
  - `내 프로필` / `내 연구페이지` 밑줄 링크 및 border 없음
  - 주요 카드/패널 `border-radius: 0px`
  - 콘솔 오류 없음

### Git 및 배포

- 커밋: `b4cd9d6 Apply magazine editorial redesign`
- 브랜치: `main`
- 원격 저장소: `git@github.com:hyeonjchoi/Lab_hompage.git`
- 푸시 완료: `origin/main`
- GitHub Pages 공개 URL 응답 확인:
  - `https://hyeonjchoi.github.io/Lab_hompage/`
  - `HTTP/2 200`
- 배포된 `index.html`에서 새 CSS 버전 확인:
  - `style.css?v=magazine-v1-4-navfix`

### 남은 상태 및 주의사항

- 디자인 시안 파일들은 사용자가 이후 재검토할 수 있도록 삭제하지 않았다.
- 현재 시안 파일 일부는 Git 기준 미추적 상태로 남아 있다.
- 이후 디자인을 다시 변경할 경우 `proposal-*.html`, `layout-*.html`, `design-proposals*.html`을 참고하되, 기존 시안 파일을 삭제하지 않는다.
- GitHub Pages와 브라우저 서비스워커 캐시 때문에 새 디자인 반영이 지연되어 보이면 강력 새로고침 또는 서비스워커 캐시 갱신을 확인한다.

---

## 2026-06-15 — 팀 프로젝트 연구방 기능 추가 (2단계 완료)

### 구현 개요

구성원 다수가 함께 진행하는 팀 프로젝트를 위한 공유 연구방(`lab-project.html`)을 신설하고, 기존 페이지에 연동 기능을 추가했다. 이후 캘린더 뷰·댓글 시스템·폼 토글 등 2단계 개선사항도 함께 완료했다.

---

### Phase 1 — 팀 프로젝트 연구방 신설 및 기존 페이지 연동

#### 수정/생성 파일

| 파일 | 변경 내용 |
|------|----------|
| `cap-data.js` | teamProject CRUD 메서드 + reply 메서드 추가 |
| `lab.html` | 팀 프로젝트 섹션 추가 (생성 폼 + 프로젝트 카드 목록) |
| `lab-member.html` | 참여 중인 팀 프로젝트 섹션 추가, 메모 폼 토글 처리 |
| `lab-project.html` | 신규 생성 — 팀 프로젝트 전용 연구방 |
| `style.css` | 팀 프로젝트 관련 CSS 클래스 추가 |

#### 데이터 스키마 (`cap_lab_data.teamProjects[]`)

```javascript
{
  id: 'project_' + Date.now(),
  name, description, status: 'active'|'completed'|'paused',
  memberIds: [userId, ...], createdBy, createdAt, updatedAt,
  goals: [{ id, assigneeId, title, status, startDate, endDate, targetDate, category, memo, ... }],
  notes: [{ id, type: 'memo'|'feedback', text, authorId, authorName, authorRole,
            targetType, targetId, done, createdAt, updatedAt,
            replies: [{ id, text, authorId, authorName, authorRole, createdAt }] }],
  progress: [{ memberId, status, memo, updatedAt }],
  meetings: [eventId, ...]
}
```

#### 접근 권한 정책

- 프로젝트 생성: 로그인한 모든 구성원 가능
- 열람: 지도교수(admin) + 참여 구성원(member)만 가능 — 비구성원은 `lab.html`으로 리다이렉트
- 목표 CRUD: 담당자(assigneeId) 본인 + admin
- 진행상황 업데이트: 본인만
- 메모/피드백 삭제: 작성자 본인 + admin
- 프로젝트 설정 변경: admin만

#### cap-data.js 추가 메서드

- `_getLabData()`, `_saveLabData()` — 내부 헬퍼
- `getTeamProjects()`, `getTeamProject(id)`, `addTeamProject()`, `updateTeamProject()`, `removeTeamProject()`, `getProjectsForMember(userId)`
- `addProjectGoal()`, `updateProjectGoal()`, `removeProjectGoal()`
- `addProjectNote()`, `updateProjectNote()`, `removeProjectNote()`
- `addProjectNoteReply()`, `removeProjectNoteReply()`
- `updateProjectProgress()` — upsert 패턴

---

### Phase 2 — 캘린더 뷰·댓글·폼 토글 개선

#### lab-project.html 추가 기능

1. **목표 리스트/캘린더 뷰 토글**
   - 상단 `리스트 보기` / `일정 보기` 버튼으로 전환
   - `setProjectGoalView()`, `updateGoalViewButtons()`
   - `renderProjectGoalList()` — 기존 테이블 목록
   - `renderProjectGoalCalendar()` — 월별 캘린더, 담당자 표시, 드래그/리사이즈 지원

2. **캘린더 드래그 & 리사이즈**
   - `dragPGoal()`, `allowPGoalDrop()`, `dropPGoalOnDate()`
   - `startPGoalResize()`, `resizePGoalFromPointer()`, `finishPGoalResize()`
   - 본인 담당 목표만 이동/리사이즈 가능

3. **메모 폼 토글**
   - "작성하기" 버튼 클릭 시 입력 폼이 열리고, 저장/취소 시 자동으로 닫힘
   - `toggleProjectNoteForm()`, `cancelProjectNoteEdit()` 업데이트

4. **댓글(Reply) 시스템**
   - 각 메모/피드백 카드 하단에 "댓글 달기" 버튼 + 인라인 입력창
   - `toggleReplyForm(noteId)`, `submitProjectReply(noteId)`, `deleteProjectReply(noteId, replyId)`
   - 데이터 저장: `CAPData.addProjectNoteReply()` / `removeProjectNoteReply()`

5. **기록 유형 통일**
   - 팀 프로젝트 기록 유형을 '댓글/메모'에서 '메모/피드백'으로 변경
   - 학생: 메모, 교수: 피드백 (자동 분류)

#### lab-member.html 추가 기능

1. **팀 프로젝트 목표 개인 연구 페이지 연동**
   - `getAllMemberGoals()` — 개인 목표 + 참여 중인 팀 프로젝트에서 본인에게 배정된 목표를 통합 반환
   - 리스트 뷰: 팀 목표에 `[프로젝트명]` 배지 표시, 수정 대신 "프로젝트 방 →" 링크 제공
   - 캘린더 뷰: 팀 목표 칩에 `is-team-goal` 클래스 + 프로젝트명 라벨 표시, 드래그 비활성화
   - 팀 목표 클릭 → `lab-project.html?id=[projectId]`로 이동

2. **메모 최신순 정렬**
   - 메모/피드백 목록이 최신 항목이 위에 먼저 표시되도록 정렬 변경

3. **메모 폼 토글**
   - "작성하기" 클릭 시 입력 폼 표시, 저장/취소 시 자동으로 닫힘

#### style.css 추가 클래스

```css
.note-target               /* 연결 목표 표시 */
.project-member-chip       /* 팀 멤버 칩 */
.goal-source-badge         /* 팀 목표 출처 배지 */
.goal-calendar-chip.is-team-goal  /* 캘린더 팀 목표 구분 스타일 */
.goal-team-label           /* 캘린더 팀 목표 프로젝트명 */
.note-replies              /* 댓글 영역 */
.note-reply-list, .note-reply-card, .note-reply-meta
.note-reply-actions, .note-reply-form-wrap
.note-reply-toggle         /* 댓글 달기 버튼 */
```

### Git 및 배포

- 커밋: 팀 프로젝트 연구방 기능 전체
- 브랜치: `main`
- 원격 저장소: `git@github.com:hyeonjchoi/Lab_hompage.git`
- GitHub Pages 공개 URL: `https://hyeonjchoi.github.io/Lab_hompage/`

---

## 다음 작업자를 위한 진행 규칙

- 새 작업을 시작하기 전에 반드시 이 `log.md`를 먼저 확인한다.
- 사용자가 새 결정을 내리면 이 파일에 날짜별로 추가 기록한다.
- 기존 산출물을 삭제하거나 덮어쓰기 전에 사용자에게 확인한다.
- 로고, 이름, 메뉴, 연구 주제, 지원 정책처럼 의사결정이 필요한 항목은 이 로그를 업데이트한다.
- 현행 사이트의 기준 파일은 멀티페이지 구조(`index.html` + 공유 `style.css`)이며, 구버전 단일 파일(`KW_CAP_Lab_home_logo3_preview.html`)은 참고용으로만 보존한다.
- 데이터 수정은 `admin.html`을 통해 진행하고, 코드 수정이 필요한 경우에만 파일을 직접 편집한다.
- 로컬 서버 실행: `python3 -m http.server 8765` (랩홈페이지 디렉터리에서)

---

## 2026-06-13 — 홈페이지 전역 단어 잘림 방지 규칙 적용

### 사용자 요청

- PC 화면과 모바일 화면 모두에서 문구가 단어 중간에서 줄바꿈되지 않도록 전역 규칙을 적용한다.
- 예시: `소비자의 태도 형성과 행동 의도에 미치는 영향을 다양한 맥락에서 연구합니다.`가 `연 / 구합니다.`처럼 단어 중간에서 분리되면 안 된다.
- 적용 후 푸시와 GitHub Pages 배포까지 완료한다.

### 적용 내용

- `style.css`의 `body`에 한국어 어절 단위 줄바꿈을 위한 전역 타이포그래피 규칙을 추가했다.
  - `word-break: keep-all`
  - `overflow-wrap: normal`
  - `line-break: strict`
  - `hyphens: none`
- 기존에 단어 중간 줄바꿈을 유발할 수 있던 `overflow-wrap: anywhere`를 운영 페이지 주요 본문 영역에서 제거했다.
  - 연구 성과 제목
  - 프로필 미리보기 관심사
  - 일정 상세 설명
- 배포된 레이아웃 시안에서도 같은 원칙이 유지되도록 `layout-styles.css`에 동일한 전역 규칙을 추가했다.
- 브라우저와 서비스워커 캐시 반영을 위해 CSS 버전 문자열을 `style.css?v=magazine-v1-5-wordbreak`로 갱신하고, `sw.js` 캐시명을 `kw-cap-lab-v11`로 올렸다.

### 검증 및 배포

- 로컬에서 `style.css`와 `layout-styles.css` 문법 및 관련 줄바꿈 규칙을 확인했다.
- 운영 HTML 파일들이 새 CSS 버전을 참조하도록 갱신했다.
- 이후 Git 커밋, 원격 `main` 푸시, GitHub Pages 배포 확인을 진행한다.

---

## 2026-06-15 — 연구 개인·팀 페이지 UX 개선 (연속 작업)

### 작업 범위

이번 작업에서는 개인 연구 페이지(`lab-member.html`)와 팀 프로젝트 연구방(`lab-project.html`)의 목표 일정보기 캘린더 구조를 전면 교체하고, 메모/피드백·연구 목표·팀 프로젝트·랩미팅 등 주요 섹션에 페이지네이션을 적용했다.

---

### 1. 목표 캘린더 — week-grid 방식으로 전면 교체

#### 변경 전 (CSS custom property 방식)

- 각 날짜 셀 내부에 `.goal-calendar-items` flex 컬럼을 두고, `is-period-start` 칩이 `width: calc((100% * var(--goal-span)) + (15px * (var(--goal-span) - 1)))` 수식으로 인접 셀을 overflow하는 방식
- 문제: 칩 제목이 특정 조건에서 렌더링되지 않음, 여러 목표가 겹칠 때 레인이 분리되지 않음

#### 변경 후 (CSS Grid week-by-week 방식)

- 월 전체를 주(week) 단위로 분리, 각 주는 `<div class="calendar-week">` (7컬럼 CSS Grid)
- 날짜 셀: `grid-row:1; grid-column:N` 명시적 배치
- 레인 배경 셀: `grid-row:lane+2; grid-column:N` 명시적 배치 (border 없음, 투명 spacer 역할)
- 목표 칩: `grid-row:lane+2; grid-column:startCol/endCol+1`로 직접 span — 제목 항상 표시됨
- 레인 배정 알고리즘은 주 단위로 적용하여 겹치는 목표가 자동으로 별도 행에 배치됨

#### 캘린더 날짜 셀 테두리 방향

- `border-bottom` → `border-top` 변경: 날짜 숫자 위에 구분선이 표시되도록 수정
- `.calendar-weekday-row .calendar-weekday { border-bottom: none }` 추가로 weekday 헤더와 첫 주 사이의 이중 선 방지

#### 크기 조절 핸들 복원

- 새 캘린더 칩에 `.goal-resize-handle.start / .end` 복원
- `startGoalResize()` / `startPGoalResize()` 함수를 통한 드래그 날짜 조정 동작 유지
- CSS: `display:block; flex-shrink:0; width:7px; cursor:ew-resize`

---

### 2. 메모/피드백 상세 패널 레이아웃 변경

- 수정·삭제 버튼을 `note-detail-subrow` 행으로 분리하여 확인필요 체크박스 옆에 위치
- 닫기 버튼은 `note-detail-head` 오른쪽 정렬 유지
- `.note-detail-text`에 `overflow-wrap: break-word` 추가로 긴 텍스트 가로 넘침 방지

---

### 3. 연결 메모(goal-notes-panel) 위치 이동

- `lab-member.html`: `goal-notes-panel`을 메모 아티클에서 **프로필 카드 하단(좌측 컬럼)** 으로 이동
- 개인 목표 클릭 시 프로필 아래에 연결 메모가 표시됨
- 리스트 뷰 행 클릭(`selectGoalNotes`): notes panel만 열기
- 캘린더 칩 클릭(`showGoalDetail`): notes panel + 수정 폼 열기
- 수정 버튼만 edit form 활성화

---

### 4. 프로젝트 설정 버튼 (lab-project.html)

- `프로젝트 설정` 버튼: 기존 관리자(isAdminView)만 활성화 → **프로젝트 생성자(isCreator)도 사용 가능**으로 변경
- `openProjectEditPanel()`, `saveProjectEdit()` 동일 조건 적용

---

### 5. 페이지네이션 적용 (2026-06-15)

#### lab-member.html

| 섹션 | 페이지당 항목 수 | 변수 |
|------|--------------|------|
| 연구 목표 | 5개 | `GOAL_PAGE_SIZE = 5` (기존 유지) |
| 메모/피드백 | **6개 (신규)** | `NOTE_PAGE_SIZE = 6`, `notePage` |
| 참여 팀 프로젝트 | **3개 (신규)** | `PROJECT_PAGE_SIZE = 3`, `projectPage` |
| 랩미팅 기록 | **6개 (4→6 변경)** | `MEMBER_MEETINGS_PAGE_SIZE = 6` |

- `renderNotes()`: 페이지 슬라이싱 + `renderNotePagination()` 호출, 페이지 이동 시 상세 패널 닫기
- `renderMemberProjects()`: 페이지 슬라이싱 + `changeProjectPage()` 함수 추가
- `changeNotePage()` / `changeProjectPage()` 함수 신규 추가

#### lab-project.html

| 섹션 | 페이지당 항목 수 | 변수 |
|------|--------------|------|
| 연구 목표 | 5개 | `GOAL_PAGE_SIZE = 5` (기존 유지) |
| 메모/피드백 | **10개 (신규)** | `NOTE_PAGE_SIZE = 10`, `notePage` |

- `renderProjectNotes()`: 페이지 슬라이싱 + `changeProjectNotePage()` 함수 추가
- 목표 필터(`selectProjectGoalForNotes`) 변경 시 `notePage = 1`로 리셋

---

### 수정 파일 목록

| 파일 | 주요 변경 |
|------|----------|
| `style.css` | 캘린더 CSS 전면 교체, note-detail-subrow 추가, 테두리 방향 수정 |
| `lab-member.html` | 캘린더 rewrite, 연결 메모 패널 위치 이동, 노트·프로젝트 페이지네이션 추가 |
| `lab-project.html` | 캘린더 rewrite, 프로젝트 설정 권한 확장, 노트 페이지네이션 추가 |

### 배포

- `main` 브랜치 커밋 후 `git push origin main`
- GitHub Pages: `https://hyeonjchoi.github.io/Lab_hompage/`

---

## 2026-06-16 진행 요약

### 1. 개인 연구페이지 — 목표 연결 메모 / 페이지네이션 레이아웃 수정

- `renderGoalNotesPanel()`(`lab-member.html`): 목표 클릭 시 뜨는 "관련 메모" 패널에서 그 목표에 `linkedGoalId`로 연결되지 않은 전체(글로벌) 메모를 더 이상 같이 보여주지 않도록 변경. 해당 목표에 명시적으로 연결된 메모만 표시.
- `.note-sticky-grid .minutes-pagination { grid-column: 1 / -1 }`(`style.css`) 추가 — 메모 그리드(CSS Grid) 안에 페이지네이션 div가 한 칸에 끼어 좌측으로 밀리던 문제 해결, 페이지 표시가 전체 너비를 차지하며 가운데 정렬되도록 수정.

### 2. 로그인 학번/교번 입력 마스킹

- `login.html`: `#input-sid` 입력 타입을 `text` → `password`로 변경(기본값 마스킹). `.input-with-toggle` 래퍼 + `표시/숨김` 토글 버튼(`toggleSidVisibility()`) 추가.
- `style.css`: `.input-with-toggle`, `.input-toggle-btn` 스타일 추가.

### 3. 팀 프로젝트 프로필 사진 업로드

- `member-dashboard.html`의 기존 프로필 사진 업로드 패턴(FileReader → dataURL → hidden input)을 재사용.
- `lab.html`(프로젝트 생성 폼) / `lab-project.html`(프로젝트 설정 패널) 모두에 사진 업로드 input 추가, `handleProjectPhoto(e, targetFieldId)` 함수로 타입(PNG/JPG/WebP/GIF) 및 용량(1MB) 검증.
- `CAPData.addTeamProject` / `updateTeamProject`는 임의 필드를 그대로 저장하므로 데이터 레이어 수정 없이 `photo` 필드만 추가 전달.
- 프로젝트 카드(`lab.html`) 및 프로젝트 헤더(`lab-project.html`)에서 `photo` 값이 있으면 `<img class="avatar-photo">`로 렌더링, 없으면 기존 "팀" 텍스트 유지.
- `style.css`: `.progress-avatar img, .member-profile-avatar img { object-fit: cover }` 추가.

### 4. 모바일 반응형 개선 (`style.css`, `@media (max-width:640px)`)

- 페이지 타이틀 축소: `.page-hero-inner h1`, `.lab-hero h1` 에 모바일 전용 `clamp()` 규칙 추가, 리드 문단도 폰트 축소.
- 연구 목표 리스트뷰(`#member-goals`, `#project-goals`)의 `.goal-table`을 모바일에서 가로 스크롤 표 대신 카드형 스택으로 전환 (`thead` 숨김, `td::before`로 라벨 표시 — 개인/팀 페이지 컬럼 구성이 달라 컨테이너 ID로 라벨 분기).
- 목표 추가/리스트보기/일정보기 버튼(`.goal-view-toggle`)이 모바일에서 균등한 풀 너비로 배치되도록 보강.

### 5. 모바일 메뉴 버튼 — 햄버거 아이콘 + 로그인 정보 상단 배치

- `cap-auth.js`(`setupMobileNav`): 버튼 텍스트 "메뉴" 대신 3개의 `<span class="nav-toggle-bar">` 막대 아이콘으로 교체 (`aria-label`은 그대로 유지해 접근성 보존).
- `style.css`: `.nav-toggle` 모바일 스타일을 막대 3개 아이콘에 맞게 재정의, 기존 텍스트 버튼용 중복 규칙 제거.
- `.nav-shell.nav-open .nav-auth { order: -1 }` 추가 — 모바일 메뉴를 펼쳤을 때 로그인 정보(프로필/연구페이지/로그아웃)가 메뉴 링크보다 항상 위에 표시되도록 그리드 순서만 조정 (DOM 순서는 변경하지 않음).

### 수정 파일 목록

| 파일 | 주요 변경 |
|------|----------|
| `login.html` | 학번 입력 마스킹 + 토글 버튼 |
| `lab.html` | 프로젝트 생성 폼에 사진 업로드, 프로젝트 카드 사진 렌더링 |
| `lab-project.html` | 프로젝트 설정 패널에 사진 업로드/제거, 헤더 사진 렌더링 |
| `lab-member.html` | 목표 연결 메모 패널에서 글로벌 메모 제외 |
| `cap-auth.js` | 모바일 메뉴 버튼을 햄버거 아이콘으로 교체 |
| `style.css` | 메모 페이지네이션 정렬, input 마스킹 토글, 프로젝트 아바타 이미지, 모바일 타이틀/목표테이블/메뉴 버튼/nav-auth 순서 |

### 배포

- `main` 브랜치 커밋 후 `git push origin main`
- GitHub Pages: `https://hyeonjchoi.github.io/Lab_hompage/`

## 2026-06-16 — 팀 프로젝트 이모지 아바타 추가

- 직전 작업에서 추가한 팀 프로젝트 프로필 사진 기능에 이모지 아바타 옵션을 추가. `member-dashboard.html`의 기존 이모지 아바타 패턴(`.emoji-builder`/`.emoji-presets`, 캐릭터 빌더는 제외)을 재사용.
- `lab.html`(프로젝트 생성 폼), `lab-project.html`(프로젝트 설정 패널)에 `avatarEmoji` 텍스트 입력 + 프리셋 버튼(🙂😎🧠📚🔬✨) 추가. `setProjectAvatarEmoji(value, targetFieldId)` 함수로 입력칸 값 설정.
- 데이터 레이어 변경 없음 — `CAPData.addTeamProject`/`updateTeamProject`에 `avatarEmoji` 필드만 추가 전달.
- 아바타 렌더링 우선순위를 `photo` → `avatarEmoji` → `"팀"` 텍스트 순으로 확장 (프로젝트 카드, 프로젝트 헤더 모두 동일하게 적용).

| 파일 | 주요 변경 |
|------|----------|
| `lab.html` | 프로젝트 생성 폼에 이모지 아바타 입력, 카드 렌더링에 이모지 우선순위 추가 |
| `lab-project.html` | 프로젝트 설정 패널에 이모지 아바타 입력, 헤더 렌더링에 이모지 우선순위 추가 |

## 2026-06-16 — 모바일 메뉴 "로그인" 버튼 위치 회귀 수정

- 직전 모바일 UX 개선에서 추가한 `.nav-shell.nav-open .nav-auth { order: -1 }` 규칙이 로그인 여부와 무관하게 항상 적용되어, 비로그인 상태에서 메뉴를 열었을 때 "로그인" 버튼까지 최상단으로 밀려 올라가는 회귀가 발생.
- 원래 요청은 "로그인 상태일 때" 구성원 프로필/연구페이지 링크만 상단으로 올리는 것이었으므로, `cap-auth.js`(`renderNav`)에서 세션 존재 여부에 따라 `#nav-auth`에 `nav-auth-loggedin` 클래스를 토글하도록 수정.
- `style.css`: 위 규칙을 `.nav-shell.nav-open .nav-auth.nav-auth-loggedin { order: -1 }`로 한정해, 비로그인 상태의 "로그인" 버튼은 기존 위치(메뉴 링크 아래)를 그대로 유지.

| 파일 | 주요 변경 |
|------|----------|
| `cap-auth.js` | `renderNav()`에서 로그인 여부에 따라 `nav-auth-loggedin` 클래스 토글 |
| `style.css` | 모바일 메뉴 상단 배치 규칙을 로그인 상태에만 한정 |

## 2026-06-16 — 모바일 메뉴 상단 배치 완전 롤백 + 팀 프로젝트 카드 레이아웃/입장 권한 수정

### 1. 모바일 메뉴 상단 배치 기능 전체 롤백

- 비로그인 "로그인" 버튼 위치를 되돌린 것과 동일하게, 로그인 상태의 프로필/연구페이지 정보도 메뉴를 열었을 때 더 이상 상단으로 이동하지 않도록 `order: -1` 규칙과 `nav-auth-loggedin` 클래스 토글 코드를 완전히 제거. 로그인/비로그인 모두 기존 위치(메뉴 링크 아래)로 복귀.

### 2. 팀 프로젝트 카드 — 입장/삭제 버튼 위치 변경

- `lab.html`의 `renderTeamProjects()`: 카드 내부 구조를 `.progress-body`(flex row)로 감싸 `.progress-info`(이름/상태/설명 등, 좌측)와 `.progress-actions`(입장/삭제 버튼, 우측)를 한 줄에 나란히 배치. 기존에는 버튼이 카드 하단에 구분선과 함께 별도 줄로 표시됨.
- `style.css`: `.progress-body`/`.progress-info` 추가, `.progress-body .progress-actions`에서 구분선(margin-top/padding-top/border-top) 제거. 다른 화면(구성원 진행현황 카드, 프로젝트 내 진행상황 카드)은 `.progress-body`를 쓰지 않으므로 기존 스타일 그대로 유지됨.
- 모바일(640px 이하)에서는 `.progress-body`를 다시 세로로 쌓고 버튼을 풀 너비로 표시해 좁은 화면에서도 사용성 유지.

### 3. 팀 프로젝트 입장 권한 제한

- 기존에는 "프로젝트 방 →" 버튼이 참여자가 아니어도 모두에게 노출되어, 클릭 시 `lab-project.html`의 접근 제어(참여자 또는 관리자만 허용)에 의해 다시 튕겨나가는 비효율이 있었음.
- `renderTeamProjects()`에서 현재 로그인 사용자가 `p.memberIds`에 포함되어 있거나 관리자인 경우에만 입장 버튼을 렌더링하도록 수정 (`lab-project.html`의 기존 접근 제어 로직과 동일한 기준).

| 파일 | 주요 변경 |
|------|----------|
| `cap-auth.js` | 모바일 메뉴 상단 배치용 클래스 토글 코드 제거 |
| `lab.html` | 프로젝트 카드 레이아웃 변경(내용 좌/버튼 우), 입장 버튼을 참여자·관리자에게만 노출 |
| `style.css` | 모바일 메뉴 `order:-1` 규칙 제거, 프로젝트 카드 flex 레이아웃 추가 |

## 2026-06-16 — 팀 프로젝트 페이지네이션, 관리자 연구페이지 링크, 모바일 버튼 줄바꿈 수정

### 1. LAB 페이지 팀 프로젝트 목록에 페이지네이션 추가 (4개씩)

- `lab.html`: 기존에는 전체 팀 프로젝트가 모두 한 화면에 나열됐음. `teamProjectPage`/`TEAM_PROJECT_PAGE_SIZE(4)`를 추가해 회의록 페이지네이션(`renderMinutesPagination`)과 동일한 패턴으로 4개씩 표시.
- 페이지네이션 컨트롤은 카드 목록 하단이 아니라 "프로젝트 만들기" 버튼이 있는 헤더 바로 아래(`#team-project-pagination`)에 위치하도록 별도 컨테이너로 분리.
- 새 프로젝트 생성 시 1페이지로 이동해 방금 만든 프로젝트가 바로 보이도록 처리.

### 2. 개인 연구페이지 "참여 팀 프로젝트" 표시 개수 4개로 변경

- `lab-member.html`: `PROJECT_PAGE_SIZE`를 3 → 4로 변경 (페이지네이션 로직 자체는 기존 그대로 재사용).

### 3. 관리자 "내 연구페이지" 링크 오류 수정

- `cap-auth.js`(`renderNav`): 관리자 로그인 시 "내 연구페이지" 링크가 `lab.html`(LAB 전체 페이지)로 고정되어 있던 것을 다른 구성원과 동일하게 `lab-member.html?id=<본인 id>`로 수정. `lab-member.html`은 이미 `isAdminView`를 "본인 id로 접근했는지"로 판단하므로(다른 사람 id면 관리자 보기, 본인 id면 일반 멤버처럼 개인 연구 기록 작성 가능) 데이터/로직 변경 없이 링크만 수정.

### 4. 모바일에서 LAB 페이지 상단 버튼 3개 줄바꿈 문제 수정

- `style.css` (`@media max-width:640px`): `.lab-hero` 좌우 패딩을 44px → 20px로 줄이고, `.lab-quick-actions`를 `flex-wrap:nowrap`으로 변경해 항상 한 줄을 유지하도록 함. 버튼은 `flex:1 1 0`으로 균등 분배하고 폰트/패딩을 축소(`0.66rem`, `4px 4px`), 넘치는 경우를 대비해 `text-overflow:ellipsis` 처리.

| 파일 | 주요 변경 |
|------|----------|
| `lab.html` | 팀 프로젝트 목록 4개 페이지네이션 추가(헤더 버튼 아래 배치) |
| `lab-member.html` | 참여 팀 프로젝트 페이지 크기 3 → 4 |
| `cap-auth.js` | 관리자 "내 연구페이지" 링크를 개인 페이지로 수정 |
| `style.css` | 모바일 LAB 상단 버튼 한 줄 유지 스타일 추가 |

## 2026-06-16 — 관리자 "내 연구페이지" 링크 캐시 문제 재수정

- 위 항목에서 `cap-auth.js`의 `labPageHref` 로직은 이미 고쳤는데도, 관리자 계정에서 "내 프로필"의 "내 연구페이지" 링크가 여전히 LAB 전체 페이지로 연결된다는 재보고가 있었음.
- 원인은 코드가 아니라 캐싱: `cap-auth.js`를 불러오는 `<script>` 태그의 캐시버스팅 쿼리스트링이 페이지마다 제각각(`?v=lab`, `?v=character-avatar`, 쿼리스트링 없음 등)이었고, 이번 세션에서 `cap-auth.js`를 여러 번 수정하면서도 그 값을 한 번도 올리지 않아 일부 브라우저가 이전 버전을 그대로 캐시해서 쓰고 있었음.
- 모든 페이지의 `cap-auth.js` 참조를 `cap-auth.js?v=navfix2`로 통일해 강제로 새 버전을 받도록 수정. (index.html, admin.html, login.html, join.html, publications.html, research.html, reservation.html, lab.html, lab-member.html, lab-project.html, lab-notices.html, lab-minutes.html, lab-resources.html, people.html, member-dashboard.html — 총 15개 파일)

| 파일 | 주요 변경 |
|------|----------|
| 전체 HTML 15개 | `cap-auth.js` 캐시버스팅 쿼리스트링을 `?v=navfix2`로 통일 |

## 2026-06-16 — 관리자 연구페이지 링크 재신고 — 코드 검증 및 서비스워커 캐시 강제 갱신

- 동일 증상이 다시 보고되어, GitHub Pages에 실제 배포된 `cap-auth.js`/`lab-member.html`을 `curl`로 직접 확인. `labPageHref`가 `lab-member.html?id=<관리자 id>`로 정확히 생성되고, `lab-member.html`의 리다이렉트 조건(`targetId !== currentSession.userId && role !== 'admin'`)도 본인 id 접근 시 `lab.html`로 보내지 않는 것을 코드 레벨에서 재확인 — 즉 서버에 배포된 코드 자체는 정상.
- 남은 원인은 PWA 서비스워커(`sw.html`)의 캐시 잔존 가능성으로 판단해 `sw.js`의 `CACHE_NAME`을 `kw-cap-lab-v11` → `kw-cap-lab-v12`로 올려, 활성화 시 이전 캐시를 강제로 정리하도록 함.
- 사용자에게는 클릭 후 실제 이동된 주소가 `lab-member.html?id=...`인지 `lab.html`인지 확인을 요청 — 만약 여전히 재현된다면 코드가 아닌 해당 기기의 캐시/세션 데이터 문제일 가능성이 높음.

| 파일 | 주요 변경 |
|------|----------|
| `sw.js` | `CACHE_NAME` v11 → v12 (캐시 강제 정리) |

---

## 2026-06-16 — 공동작업자 연결 및 main 브랜치 보호 설정

### 진행 사항

1. **GitHub 공동작업자 연결 확인**
   - 저장소 `hyeonjchoi/Lab_hompage`에 협업자 `hbrim15` 계정이 등록됨
   - 권한: Write (`push: true, admin: false`) — 브랜치 push·PR 생성 가능, main 직접 push 및 PR 자체 승인은 불가

2. **gh CLI 로컬 설치**
   - Homebrew 미설치 환경이라 `~/.local/bin/gh`에 바이너리 직접 설치 (v2.94.0)
   - `gh auth login`으로 `hyeonjchoi` 계정 인증 완료 (SSH 프로토콜, 웹 브라우저 인증)

3. **main 브랜치 보호 규칙 적용**
   - `gh api -X PUT repos/hyeonjchoi/Lab_hompage/branches/main/protection` 실행
   - 적용된 규칙:
     - PR 없이 직접 push 차단
     - 리뷰 승인 1명 이상 필수 (`required_approving_review_count: 1`)
     - force push 차단 (`allow_force_pushes: false`)
     - 브랜치 삭제 차단 (`allow_deletions: false`)
     - `enforce_admins: false` — owner(hyeonjchoi)는 필요 시 우회 가능하나, 동일한 PR 흐름을 따르는 것을 권장

### 협업 워크플로 (확정)

```
협업자/본인 모두: git checkout -b feature/이름-작업내용
→ 작업 후 push
→ GitHub에서 Pull Request 생성
→ 서로 리뷰 승인 (자기 PR은 자기 승인 불가 — GitHub 기본 정책)
→ 승인 후 main에 merge
```

### 메모

- 협업자(`hbrim15`)는 Supabase 백엔드 연동 작업을 데스크탑에서 준비 중 (2026-06-16 기준).
- 협업자가 작업한 내용은 브랜치 push → PR 생성까지는 자동 가능하지만, main 병합에는 본인(hyeonjchoi)의 리뷰 승인이 필요함.
- `supabase-schema.sql`의 SQL 변경은 GitHub merge와 별개로 Supabase 대시보드에서 직접 실행해야 반영됨 — PR 머지만으로 DB에 자동 적용되지 않음.
- `service_role` 키 등 민감한 키는 어떤 브랜치에도 커밋하지 않도록 협업자에게도 안내 필요.
- 협업자가 본인 데스크탑에서 별도로 `git clone`한 폴더에서 작업하므로, 현재 작업 폴더(Dropbox 동기화 경로)와는 물리적으로 분리되어 있어 로컬 파일에 직접적인 영향은 없음.

### 작업 시작 규칙 (필독)

- **앞으로 이 디렉터리에서 새 작업을 시작할 때는 반드시 가장 먼저 `git pull origin main`을 실행한다.**
- 이유: 공동작업자(`hbrim15`)가 별도 브랜치에서 작업해 PR로 main에 merge하는 경우, 로컬 Dropbox 폴더는 자동으로 갱신되지 않는다. pull을 생략하면 옛 버전 코드 위에서 작업하다가 나중에 충돌이 발생할 수 있다.
- 현재(2026-06-16) 협업자는 Supabase 프로젝트 생성 및 백엔드 구현을 진행 중이므로, 다음 작업 시작 시 pull이 특히 중요함.

### Supabase 연동 시 git pull의 범위 (중요)

`git pull origin main`으로 가져와지는 것과 가져와지지 않는 것을 구분해야 한다.

**pull로 동기화되는 것 (git이 추적하는 코드 영역):**
- `supabase-schema.sql` 파일 내용
- `supabase-client.js`의 `SUPABASE_URL` / `SUPABASE_ANON_KEY` 등 코드에 커밋된 값
- `cap-auth.js`, `cap-data.js` 등이 localStorage 방식에서 Supabase 호출 방식으로 바뀐 코드 자체

**pull로 동기화되지 않는 것 (Supabase 클라우드 쪽이라 git 추적 밖):**
- 실제 Supabase 프로젝트의 테이블·데이터·RLS 정책 — 이건 협업자가 Supabase 대시보드에서 직접 만든 클라우드 리소스이며, git이 관리하는 영역이 아님
- Supabase 프로젝트에 대한 대시보드 접근 권한 — GitHub 협업자 초대와 완전히 별개 시스템이므로, Supabase 대시보드에서 테이블을 보거나 SQL을 실행하려면 Supabase Organization Team에 별도로 초대받아야 함 (앞서 설명한 Owner/Administrator/Developer 역할)

**결론:** 협업자가 백엔드를 마치고 pull하면, 웹사이트 코드는 협업자가 만든 실제 Supabase 프로젝트를 가리키도록 갱신되어 사이트 자체는 정상 동작할 것이다. 하지만 그 Supabase 프로젝트의 데이터베이스를 직접 들여다보거나 관리하려면 pull과 무관하게 Supabase Organization 초대를 별도로 받아야 한다. 또한 pull 후 `supabase-client.js`에 `service_role` 키가 실수로 커밋되어 있지 않은지 확인이 필요하다.

---

## 2026-06-16 — Supabase Organization 초대 확인

### 진행 사항

1. **Supabase CLI 로컬 설치**
   - gh CLI와 동일한 방식으로 `~/.local/bin/supabase`에 바이너리 직접 설치 (v2.106.0)
   - `supabase login`으로 `hyeonjchoi` 계정 인증 완료 (웹 브라우저 인증)

2. **Organization 초대 상태 검증**
   - `supabase orgs list` 결과 본인 계정이 아래 두 조직에 속해 있음을 확인:
     - `hyeonjchoi's Org` (`vtuojobgzjghoiueazka`) — 본인 소유, 프로젝트 `kw.psy lab RSVN` (2026-05-20 생성, 실험실 예약 관련 별도 프로젝트로 추정)
     - `hbrim15's Org` (`hatysunsslijymycabth`) — 협업자 소유, 프로젝트 `hbrim15's Project` (2026-06-15 생성, 서울 리전, `ACTIVE_HEALTHY`)
   - Supabase Management API(`/v1/organizations/{id}/members`)로 `hbrim15's Org` 멤버 목록 직접 조회해 역할 확정:

     | 계정 | 이메일 | 역할 |
     |------|--------|------|
     | `hbrim15` | hyebinrim@gmail.com | Owner |
     | `hyeonjchoi` | hyeonj.choi@gmail.com | **Administrator** |

### 결론

- 협업자의 Supabase Organization 초대가 정상적으로 처리되어, 본인이 **Administrator** 권한으로 등록되어 있음을 확인함.
- Administrator 권한이므로 프로젝트 설정 변경, SQL Editor에서 직접 쿼리 실행, API 키 확인이 모두 가능함.
- 따라서 협업자가 백엔드(테이블·RLS 등) 작업을 마치면, 본인도 동일한 Supabase 프로젝트(`hbrim15's Project`, ref: `pfnqcwamznvaxgqahavi`)에 대시보드 또는 CLI로 직접 접근해 확인·수정할 수 있음.
- `supabase-client.js`의 `SUPABASE_URL`/`SUPABASE_ANON_KEY`를 채울 때는 이 프로젝트(`pfnqcwamznvaxgqahavi`, host: `db.pfnqcwamznvaxgqahavi.supabase.co`)의 값을 사용해야 함.

---

## 2026-06-16 — Supabase 마이그레이션 이후 콘텐츠 소실 / 관리자 패널 오류 원인 진단 및 수정

### 증상

- 실서비스(GitHub Pages)에서 기존에 있던 콘텐츠(홈 문구, 페이지 안내문, 구성원 목록)가 보이지 않음.
- 관리자 패널에서 구성원 추가 시 오류 메시지가 뜸.
- 관리자 패널에서 보이는 데이터와 실제 페이지에 보이는 데이터가 다름.
- 관리자 패널에서 각 페이지 문구를 편집해도 반영되지 않음.

### 원인 (5가지가 겹쳐서 발생)

1. **`admin.html`이 비동기 전환 누락**: `supabase-client.js`로 전환되면서 `CAPData`의 모든 메서드가 `async`(Promise 반환)가 됐는데, `admin.html`의 회원 관리·홈 문구·페이지 문구·연구축·논문 관리 코드 전체가 `await` 없이 동기 호출을 하고 있었음 (Promise 객체를 다루다 깨짐).
2. **`cap-page-meta.js`의 `readMeta()`가 `getPageMeta()`를 `await` 없이 호출**: 관리자가 페이지 문구를 수정해도 People/Research/Publications/예약/지원하기 페이지는 항상 파일 내부 하드코딩된 기본값만 표시.
3. **컬럼명 불일치(camelCase → snake_case)**: Supabase 마이그레이션 후 DB 컬럼은 `student_id`/`lab_group`/`avatar_char`/`updated_at`/`creator_id`/`avatar_emoji`/`pres_type`/`description`인데, `admin.html`/`people.html`/`lab.html`/`member-dashboard.html`/`publications.html` 곳곳이 옛 camelCase(`studentId`/`group`/`avatarChar`/`type`/`desc` 등)를 그대로 읽고 있었음. 특히 **`people.html`의 `m.group` 참조**는 구성원 그룹 필터링이 항상 빈 배열을 반환하게 만들어 **구성원(People) 페이지가 비로그인/로그인 여부와 관계없이 항상 비어 보이는 핵심 원인**이었음. `publications.html`의 학술발표 저장 시 `type` 필드가 `publications.type`(article/presentation/award 구분 컬럼)과 충돌해 DB CHECK 제약 위반으로 저장이 실패하는 문제도 있었음.
4. **`members` 테이블 RLS 정책이 로그인 사용자 전용**(`auth.role() = 'authenticated'`): 비로그인 방문자는 홈/People 페이지에서 구성원을 전혀 조회할 수 없었음. 또한 `members` 테이블에 DELETE 정책이 전혀 없어 관리자 패널의 구성원 삭제가 항상 실패했음.
5. **실제 Supabase DB가 비어있었음** (anon key로 직접 조회해 확인): `site_content`에는 `research` 키 1건만 있고 그 값도 테스트로 입력된 "KKK"/"JLLJL" 같은 임시값이었음. `home`/`pages.*` 키는 전혀 없었고, `publications` 테이블도 완전히 비어 있었음 — `cap-data.js`의 기존 기본 데이터(홈 문구, 페이지 설명, 연구축, 예시 논문, 10명 구성원 명단)가 Supabase로 마이그레이션될 때 한 번도 옮겨지지 않은 것으로 확인됨.
6. (부수 발견) `create-member` Edge Function이 호출자 권한을 `role === 'admin'`만 허용했는데, 교수 계정의 실제 `role` 값이 `'professor'`로 저장돼 있다면 구성원 추가 시 항상 403 "관리자 권한이 필요합니다" 오류가 났을 것으로 추정됨.

### 수정 내역

| 파일 | 주요 변경 |
|------|----------|
| `admin.html` | 모든 `CAPData` 호출에 `await` 추가, 회원/논문/발표/수상 필드명을 DB 컬럼명(snake_case)에 맞게 수정, `CAP_DEFAULTS` 전역 의존(미로드 상태) 제거하고 페이지 문구 기본값을 자체 보유하도록 수정, 인라인 `onclick` 삭제 핸들러를 비동기 안전한 named 함수로 교체 |
| `cap-page-meta.js` | `readMeta`/`apply`를 `async`로 전환하고 `getPageMeta()` 결과를 `await` |
| `publications.html` | 학술발표 저장/렌더링 필드를 `type`→`pres_type`, 수상내역을 `desc`→`description`으로 수정 (DB 컬럼명과 일치) |
| `people.html` | 구성원 그룹 필터링을 `m.group`→`m.lab_group`으로 수정 (People 페이지 핵심 버그) |
| `lab.html` | `member.group`→`lab_group`(3곳), `avatarChar`→`avatar_char`, 팀 프로젝트 카드의 `created_by`/`avatarEmoji`를 실제 컬럼명 `creator_id`/`avatar_emoji`로 수정 |
| `member-dashboard.html` | `m.group`→`lab_group`, `m.avatarChar`→`avatar_char` |
| `lab-member.html` | `currentMember.avatarChar`→`avatar_char` |
| `supabase-schema.sql` | `members_select` 정책을 공개 조회(`USING (true)`)로 변경, `members_update_own`에 professor/admin 조건 추가, `members_delete_admin` 정책 신설 (신규 설치 기준 정의 — 운영 DB에는 `supabase-seed.sql`로 별도 적용 필요) |
| `supabase/functions/create-member/index.ts` | 호출자 권한 체크에 `role === 'professor'`도 허용 (재배포 필요: `supabase functions deploy create-member`) |
| `supabase-seed.sql` (신규) | RLS 정책 패치 + `site_content`(home/pages.*/research) 시드 + `publications` 예시 데이터 + 로그인 계정 없는 구성원 7명 시드. Supabase 대시보드 SQL Editor에서 직접 실행 필요 (재실행해도 안전하도록 `ON CONFLICT`/`NOT EXISTS`로 작성) |

### 남은 과제 (이번 수정 범위 밖, 사용자에게 별도 안내함)

- `cap-notifications.js`가 여전히 `localStorage`의 `cap_lab_data`를 읽도록 되어 있어 Supabase 마이그레이션 이후 알림(리마인더) 기능이 사실상 동작하지 않음. 이벤트/목표/메모를 Supabase에서 직접 불러오도록 별도 리팩터링 필요.
- LAB 페이지의 "구성원별 진행 상황" 카드(`labData.progress`)는 팀 프로젝트에 속하지 않는 개인 단위 진행 상황 표시용인데, 이를 위한 Supabase 테이블이 마이그레이션 때 만들어지지 않아 항상 빈 배열로 처리됨. 기능을 유지하려면 별도 테이블 설계가 필요.
- `cap-data.js`/`cap-auth.js`는 이제 어떤 HTML도 로드하지 않는 죽은 코드 — 혼동 방지를 위해 삭제 검토 가능.

---

## 2026-06-16 — 작은 UI 수정 6건 + 실시간 Web Push 알림 인프라 구축

### 작은 수정 6건

1. **구성원 정렬 순서**: `supabase-client.js`의 `getMembers()`가 이름 가나다순 단일 정렬에서 `lab_group` 우선순위(지도교수 → 박사/석박통합 → 석사 → 학부연구생 → 졸업생) 후 가나다순으로 변경. 데이터 레이어 한 곳만 수정해 admin.html/lab.html/people.html 등 모든 소비처에 자동 반영.
2. **모바일 LAB 퀵액션 버튼**: `style.css`의 `@media max-width:640px` 룰에서 `flex-1 + ellipsis`로 텍스트가 잘리던 것을 2줄 줄바꿈 + `align-items:stretch`로 높이 통일하도록 수정.
3. **홈 히어로 버튼**: "진행 연구 보기"를 `btn-block primary`(빨간 배경)에서 `secondary`(테두리만)로 변경해 "연구실 지원하기"와 통일.
4. **연구실 문의**: `join.html`에서 "전화" 항목 삭제, "연구실" 항목에 "한울관 509호" 추가.
5. **PWA manifest 경로 버그**: `manifest.json`의 `start_url`/`scope`/`shortcuts[].url`이 옛 GitHub Pages 경로(`/Lab_hompage/`)를 가리키고 있어 커스텀 도메인(`kwcaplab.co.kr`)에서 PWA standalone 모드가 깨지고 있었음 — 전부 `/`로 수정. `sw.js`의 `CACHE_NAME`도 올려서 기존에 설치된 기기에도 반영되게 함. (이미 홈 화면에 추가해둔 기존 아이콘은 재설치해야 효과를 봄.)
6. **알림 설정 패널**: 처음에 추가했던 admin 전용 "⚙ 알림 설정"(이벤트/목표 임계값 조절 UI)은 사용자가 불필요하다고 판단해 다시 제거함(아래 진짜 푸시 알림으로 대체).

### 실시간 Web Push 알림 인프라

**배경**: 기존 `cap-notifications.js`는 진짜 푸시가 아니라 `lab.html`이 열려 있을 때만 다가오는 일정을 로컬로 확인해 보여주는 방식이었음(앱이 닫혀 있으면 전혀 동작 안 함). 사용자가 기기가 닫혀 있어도 서버가 직접 알려주는 진짜 푸시를 요청해, Web Push 표준(VAPID) 기반 인프라를 새로 구축함. 계획 전체는 `/Users/mac/.claude/plans/floating-sniffing-hippo.md`에 남아 있음.

**대상 알림 4종**
1. 다가오는 일정 — 참석자 지정 시 참석자에게만, 없으면 전체 구성원에게 (24시간 전 + 1시간 전 긴급 알림)
2. 새 공지 생성 — 작성자를 제외한 전체 구성원에게
3. 연구페이지 피드백/댓글 — `member_notes`(개인 피드백)는 해당 구성원에게, `team_project_notes`/`team_project_note_replies`(팀 메모·답글)는 작성자를 제외한 다른 프로젝트 참여자에게
4. 연구 목표 마감 임박(2일 전) — 그 목표의 당사자에게

**구축한 것**
- DB: `push_subscriptions`(기기별 구독 정보), `notification_dispatch_log`(시간 기반 알림 중복 발송 방지) 테이블 추가, `pg_net`/`pg_cron` 익스텐션 활성화, 웹훅 인증용 비밀값은 Supabase Vault(`edge_webhook_secret`)에 저장.
- Edge Functions 3개(`supabase/functions/` 아래, `create-member`와 동일한 구조로 작성·배포): `push-on-notice`, `push-on-feedback`(member_notes/team_project_notes/team_project_note_replies 공용), `push-reminders`(15분마다 cron이 호출). 공용 발송 로직은 `_shared/push.ts`에서 `npm:web-push`로 VAPID 서명 + payload 암호화 처리 — Deno Edge Function 런타임에서 정상 동작 확인됨.
- DB 트리거 4개(`notices`/`member_notes`/`team_project_notes`/`team_project_note_replies` INSERT 시 `pg_net.http_post`로 해당 Edge Function 호출)와 `push-reminders-job` cron(15분 주기)을 운영 DB에 직접 적용. 테스트 공지를 실제로 insert해서 트리거 → pg_net → Edge Function 전체 파이프라인이 200으로 응답하는 것까지 확인 후 테스트 데이터는 삭제함.
- 클라이언트: `CAPData.addPushSubscription`/`removePushSubscription` 추가, `cap-notifications.js`의 `enable()`/`disable()`이 `pushManager.subscribe()`/`unsubscribe()` + DB 등록/삭제까지 수행하도록 변경(로그인 안 한 사용자는 알림을 켤 수 없음), `sw.js`에 `push` 이벤트 리스너 추가.
- VAPID 키페어와 웹훅 비밀값은 `supabase secrets set`/Vault에만 저장하고 git에는 공개키만 커밋함(`supabase-push-setup.sql`은 비밀값을 플레이스홀더로 남긴 재현용 참고 파일).

| 파일 | 주요 변경 |
|------|----------|
| `supabase-client.js` | `getMembers()` 정렬 로직, `addPushSubscription`/`removePushSubscription` |
| `cap-notifications.js` | VAPID 공개키 상수, `enable()`/`disable()`을 실제 push 구독 연동으로 교체 |
| `sw.js` | `push` 이벤트 리스너 추가, 캐시 버전 v13→v14 |
| `style.css` | 모바일 LAB 버튼, 알림 설정 패널 CSS(추가 후 제거) |
| `index.html`, `join.html`, `manifest.json` | 작은 수정 6건 중 4/5번 |
| `supabase-schema.sql` | `push_subscriptions`/`notification_dispatch_log` 테이블 + RLS 정의 추가 |
| `supabase-push-setup.sql`(신규) | 익스텐션/트리거/cron 재현용 참고 스크립트 |
| `supabase/functions/_shared/push.ts`, `push-on-notice/`, `push-on-feedback/`, `push-reminders/`(신규) | 푸시 발송 Edge Functions |

### 남은 일 / 한계

- 아직 한 명도 "알림 허용"을 눌러 구독한 적이 없어(`push_subscriptions`가 비어 있음), 코드/인프라는 검증됐지만 실제 사람에게 푸시가 도착하는 종단 테스트는 못함 — 사용자가 직접 로그인 후 알림을 켜고 공지를 만들어보는 실사용 테스트가 필요.
- iOS Safari는 홈 화면에 추가(standalone)된 상태여야 Push API가 동작함(iOS 16.4+) — 일반 Safari 탭에서는 "알림 허용"을 눌러도 동작하지 않음.
- `push-reminders`의 임계값(24시간/1시간/2일)은 코드에 고정값으로 박혀 있음 — 관리자용 설정 UI는 사용자 요청으로 제거했기 때문에, 바꾸려면 `supabase/functions/push-reminders/index.ts`를 고쳐 재배포해야 함.

---

## 2026-06-16 — LAB 버튼 폭/간격 재조정, 지원하기 페이지 문구 수정, PWA 첫 진입 404 수정

### 1. 모바일 LAB 퀵액션 버튼 — 균등 폭 대신 내용에 맞는 폭으로

- 직전 수정에서는 3개 버튼을 `flex:1 1 0`으로 동일 폭을 주고 2줄 줄바꿈으로 잘림을 막았는데, "공유 자료 추가"/"진행상황 업데이트"가 2줄로 보이는 게 마음에 들지 않는다는 피드백.
- `style.css` 모바일(`max-width:640px`) 룰을 `flex:0 0 auto`(내용 크기만큼만 차지) + `white-space:nowrap`으로 변경. 박스 폭은 글자 수에 따라 서로 달라지고, 버튼 사이 `gap`(6px)만 동일하게 유지되어 1줄로 표시됨.

### 2. 지원하기 페이지 "연구실 문의" 문구 보강

- `join.html`: "연구실" 항목의 "한울관 509호" 옆에 "(임혜빈 연구실)" 추가.
- "소속" 항목을 "산업심리학과 · Department of Industrial Psychology / Kwangwoon University"에서 "광운대학교 · 산업심리학과 / Kwangwoon University · Department of Industrial Psychology" 순서로 변경(대학교를 먼저 표기).

### 3. PWA 홈 화면 추가 후 첫 진입 시 404 → 새로고침해야 정상 접속되는 문제

- **원인**: manifest의 `start_url`이 예전엔 `/Lab_hompage/`였다가 이번 세션 초반에 `/`로 고쳤는데, iOS는 "홈 화면에 추가" 시점의 시작 URL을 기기에 그대로 박아두고 manifest가 나중에 바뀌어도 자동으로 갱신하지 않는다. 즉 그 이전에 추가된 아이콘은 지금도 존재하지 않는 `/Lab_hompage/` 경로로 들어가 GitHub Pages의 기본 404를 만나고, 이후 동작은 기기/네트워크 상황에 따라 달라짐 — 일부 사용자는 새로고침 시 정상 경로로 복구되는 패턴을 보였음.
- 추가로 `sw.js`의 fetch 핸들러에 실재 버그가 있었음: `/`(확장자 없는 루트 내비게이션)은 `.html`로 끝나지 않아 "네트워크 우선 + 오프라인 시 캐시 폴백" 분기를 안 타고 "정적 에셋: cache-first" 분기로 빠졌는데, 이 분기는 정확히 `/` 키로 캐시된 적이 없어(우리가 캐싱한 건 `/index.html`) 항상 캐시 미스가 나고, 네트워크 실패 시의 폴백도 비어있어 복구가 안 될 여지가 있었음.
- **수정**:
  - `404.html` 신규 추가 — 어떤 경로로 들어와 404를 만나든 즉시 `location.replace('/')`로 홈으로 돌려보냄. 이전에 잘못된 경로로 등록된 아이콘이 있어도 첫 화면에서 자동으로 복구됨.
  - `sw.js`의 네트워크 우선 분기 조건에 `event.request.mode === 'navigate'`를 추가해 확장자 없는 루트 내비게이션도 같은 분기를 타도록 수정하고, 그 분기의 오프라인 폴백이 캐시 미스 시 `index.html`로 한 번 더 폴백하도록 보강. `accept` 헤더가 없는 경우의 잠재적 크래시도 방어.
  - `CACHE_NAME`을 v14 → v15로 올려 기존 기기에도 반영되게 함.

| 파일 | 주요 변경 |
|------|----------|
| `style.css` | 모바일 LAB 퀵액션 버튼을 내용 기반 폭으로 변경 |
| `join.html` | 연구실/소속 문구 보강 |
| `404.html`(신규) | 홈으로 자동 리다이렉트 |
| `sw.js` | 루트 내비게이션 라우팅 버그 수정, 캐시 버전 v15 |
