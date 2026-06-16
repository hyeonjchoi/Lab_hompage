-- KW CAP Lab · 누락 데이터 복구 + RLS 패치
-- Supabase 대시보드 → SQL Editor에서, 아래 섹션을 순서대로(또는 전체 한 번에) 실행하세요.
-- 이미 실행된 부분을 다시 실행해도 안전하도록(ON CONFLICT / NOT EXISTS) 작성했습니다.
--
-- 배경: site_content/publications 테이블이 Supabase 마이그레이션 때 한 번도 시드되지 않아
-- 홈 문구, 페이지 안내문, 연구 축, 예시 논문이 비어 있었고, members 테이블의 SELECT 정책이
-- 로그인 사용자로만 제한되어 있어 비로그인 방문자에게는 구성원 목록이 보이지 않았습니다.

-- ══════════════════════════════════════════════
-- 1. members RLS 정책 패치
--    - 조회: 누구나 (공개 구성원 디렉터리)
--    - 수정: 본인 또는 professor/admin
--    - 삭제: professor/admin만 (기존엔 삭제 정책 자체가 없어 admin.html에서 구성원 삭제가 항상 실패했음)
-- ══════════════════════════════════════════════
DROP POLICY IF EXISTS "members_select" ON members;
CREATE POLICY "members_select" ON members FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "members_update_own" ON members;
CREATE POLICY "members_update_own" ON members FOR UPDATE
  USING (auth_user_id = auth.uid() OR current_member_role() IN ('professor', 'admin'));

DROP POLICY IF EXISTS "members_delete_admin" ON members;
CREATE POLICY "members_delete_admin" ON members FOR DELETE
  USING (current_member_role() IN ('professor', 'admin'));

-- ══════════════════════════════════════════════
-- 2. site_content 시드 (home / pages.* / research)
--    key가 이미 있으면 value를 덮어씁니다 — 특히 'research'는 테스트로 입력된
--    임시값("KKK"/"JLLJL")이 들어있어 정상값으로 교체됩니다.
-- ══════════════════════════════════════════════
INSERT INTO site_content (key, value) VALUES
('home', '{
  "heroTitle": "광고와 소비자 경험 속\n마음의 움직임을 연구합니다.",
  "heroLead": "광운대학교 소비자광고심리 연구실은 광고 반응, 소비자 판단, AI 서비스 상호작용, 식품 관련 의사결정, 여성 소비자 경험을 연구합니다.",
  "heroLeadEn": "KW CAP Lab investigates how consumers think, feel, and act in advertising, service, and AI-mediated contexts."
}'::jsonb),
('pages.people', '{
  "eyebrow": "People",
  "title": "구성원",
  "description": "기본 프로필은 이모지 아바타로 제공하며, 사진과 이메일은 희망자에 한해 공개합니다.\n로그인한 구성원은 자신의 카드에서 직접 정보를 수정할 수 있습니다.",
  "titleStyle": { "color": "#FFFFFF", "fontSize": "", "fontWeight": "900", "fontStyle": "normal", "textAlign": "left" },
  "descriptionStyle": { "color": "#D9E2EC", "fontSize": "", "fontWeight": "400", "fontStyle": "normal", "textAlign": "left" }
}'::jsonb),
('pages.research', '{
  "eyebrow": "Research Areas",
  "title": "진행 연구",
  "description": "소비자가 광고, 서비스, AI 기반 상호작용에서 어떻게 생각하고 느끼며 행동하는지 탐구합니다.",
  "titleStyle": { "color": "#FFFFFF", "fontSize": "", "fontWeight": "900", "fontStyle": "normal", "textAlign": "left" },
  "descriptionStyle": { "color": "#D9E2EC", "fontSize": "", "fontWeight": "400", "fontStyle": "normal", "textAlign": "left" }
}'::jsonb),
('pages.publications', '{
  "eyebrow": "Publications",
  "title": "연구 성과",
  "description": "논문은 DOI와 저널 링크를 우선 제공합니다. 가능한 경우 학교 도서관 사이트와 연동합니다.",
  "titleStyle": { "color": "#FFFFFF", "fontSize": "", "fontWeight": "900", "fontStyle": "normal", "textAlign": "left" },
  "descriptionStyle": { "color": "#D9E2EC", "fontSize": "", "fontWeight": "400", "fontStyle": "normal", "textAlign": "left" }
}'::jsonb),
('pages.reservation', '{
  "eyebrow": "RSVN",
  "title": "실험실 예약",
  "description": "광운대학교 산업심리학과 학생 전용 실험실습실, 한울관 105호 예약 안내입니다.",
  "titleStyle": { "color": "#FFFFFF", "fontSize": "", "fontWeight": "900", "fontStyle": "normal", "textAlign": "left" },
  "descriptionStyle": { "color": "#D9E2EC", "fontSize": "", "fontWeight": "400", "fontStyle": "normal", "textAlign": "left" }
}'::jsonb),
('pages.join', '{
  "eyebrow": "Join Us",
  "title": "지원하기",
  "description": "대학원생 지원과 학부연구생 RA 모집은 절차가 다릅니다. 아래 안내를 확인하신 후 지원해 주세요.",
  "titleStyle": { "color": "#FFFFFF", "fontSize": "", "fontWeight": "900", "fontStyle": "normal", "textAlign": "left" },
  "descriptionStyle": { "color": "#D9E2EC", "fontSize": "", "fontWeight": "400", "fontStyle": "normal", "textAlign": "left" }
}'::jsonb),
('research', '{
  "axes": [
    {
      "id": "axis1", "axisNum": 1,
      "title": "소비자 판단과 광고 반응",
      "en": "Consumer Judgment & Advertising Response",
      "desc": "광고 메시지, 브랜드 단서, 설득 커뮤니케이션이 소비자의 태도 형성과 행동 의도에 미치는 영향을 다양한 맥락에서 연구합니다. 소비자가 광고를 어떻게 처리하고 반응하는지, 설득 지식과 저항이 어떤 역할을 하는지 탐구합니다.",
      "tags": ["Regulatory Focus Theory", "Construal Level Theory", "Persuasion Knowledge Model", "Elaboration Likelihood Model", "Attribution Theory"]
    },
    {
      "id": "axis2", "axisNum": 2,
      "title": "인간-AI 서비스 상호작용",
      "en": "Human-AI Service Interaction",
      "desc": "AI 추천 시스템, 자동화 서비스, 디지털 상담 환경에서 소비자의 신뢰, 수용, 저항 반응을 분석합니다. AI 의인화, 알고리즘 혐오, 자동화에 대한 소비자 심리를 탐구합니다.",
      "tags": ["Algorithm Aversion", "Anthropomorphism", "Trust in Automation", "Technology Acceptance Model", "Uncanny Valley"]
    },
    {
      "id": "axis3", "axisNum": 3,
      "title": "식품 관련 연구",
      "en": "Food-related Consumer Research",
      "desc": "식품 선택, 건강 관련 메시지, 제품 정보 표시, 소비 상황이 소비자 판단과 행동 의도에 미치는 영향을 연구합니다. 식품 라벨, 영양 정보, 원산지 표시 등이 소비자 신뢰와 구매 결정에 어떻게 작용하는지 탐구합니다.",
      "tags": ["Health Belief Model", "Food Choice Motives", "Risk Perception", "Information Processing Theory"]
    },
    {
      "id": "axis4", "axisNum": 4,
      "title": "여성에 관한 연구",
      "en": "Women, Gender & Consumer Psychology",
      "desc": "여성 소비자 경험, 젠더 인식, 사회적 정체성과 소비자 심리의 관계를 탐구합니다. 광고와 미디어에서 여성 표현 방식이 소비자의 자아 인식, 태도, 행동에 미치는 영향을 연구합니다.",
      "tags": ["Social Identity Theory", "Gender Schema Theory", "Stereotype Content Model", "Objectification Theory", "Self-Concept Theory"]
    }
  ]
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ══════════════════════════════════════════════
-- 3. publications 예시 데이터 (이미 1건 이상 들어있으면 건너뜀 — 직접 입력한 데이터를 덮어쓰지 않기 위함)
-- ══════════════════════════════════════════════
INSERT INTO publications (type, title, authors, journal, year, doi)
SELECT 'article', '논문 제목 예시 — 광고 메시지 유형과 소비자 태도 변화에 관한 연구', '이병관, 임혜빈', '한국광고학보', '2025', ''
WHERE NOT EXISTS (SELECT 1 FROM publications);

INSERT INTO publications (type, title, authors, journal, year, doi)
SELECT 'article', '두 번째 논문 제목 예시 — AI 추천 시스템에 대한 소비자 신뢰 연구', '임혜빈', 'Journal of Consumer Psychology', '2024', ''
WHERE NOT EXISTS (SELECT 1 FROM publications WHERE title LIKE '두 번째 논문%');

INSERT INTO publications (type, title, authors, journal, year, doi)
SELECT 'article', '세 번째 논문 제목 예시 — 식품 라벨과 소비자 구매 의도', '이병관', '소비자학연구', '2024', ''
WHERE NOT EXISTS (SELECT 1 FROM publications WHERE title LIKE '세 번째 논문%');

INSERT INTO publications (type, title, presenter, venue, year, pres_type)
SELECT 'presentation', 'Consumer Responses to AI-Generated Advertisements', '발표자 추가 예정', '학회명 추가 예정', '2025', '포스터 발표'
WHERE NOT EXISTS (SELECT 1 FROM publications WHERE title = 'Consumer Responses to AI-Generated Advertisements');

INSERT INTO publications (type, title, presenter, venue, year, pres_type)
SELECT 'presentation', '식품 선택 상황에서의 건강 메시지 효과', '발표자 추가 예정', '한국소비자광고심리학회', '2024', '구두 발표'
WHERE NOT EXISTS (SELECT 1 FROM publications WHERE title = '식품 선택 상황에서의 건강 메시지 효과');

INSERT INTO publications (type, title, recipient, venue, year, description)
SELECT 'award', '수상내역 추가 예정', '수상자 추가 예정', '기관명 추가 예정', '2026', ''
WHERE NOT EXISTS (SELECT 1 FROM publications WHERE title = '수상내역 추가 예정');

-- ══════════════════════════════════════════════
-- 4. members 시드 — 로그인 계정이 없는(학번 미지정) 구성원 7명만 복구합니다.
--    교수님 두 분(이병관/임혜빈)은 이미 로그인 계정으로 존재할 가능성이 높아
--    중복 생성을 피하려고 이 스크립트에 포함하지 않았습니다. 대시보드 Table Editor에서
--    members 테이블을 먼저 확인한 뒤, 두 분이 안 보이면 admin.html의 "구성원 추가"로
--    그룹을 "소속 교수"로 선택해 직접 추가해 주세요(로그인 계정도 함께 생성됩니다).
--    아래 7명은 같은 이름이 이미 있으면 건너뛰도록 NOT EXISTS로 보호했습니다.
-- ══════════════════════════════════════════════
INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_박정은', '박정은', 'phd', 'phd', '박',
  '{"enName": "", "position": "박사과정 · Ph.D. Student", "interest": "", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '박정은');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT '2022122708', '최현정', 'phd', 'phd', '최',
  '{"enName": "", "position": "박사과정 · Ph.D. Student", "interest": "", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '최현정');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_김재용', '김재용', 'master', 'master', '재',
  '{"enName": "", "position": "석사과정 · M.A. Student", "interest": "", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '김재용');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_김민지', '김민지', 'master', 'master', '민',
  '{"enName": "", "position": "석사과정 · M.A. Student", "interest": "", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '김민지');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_이수빈', '이수빈', 'master', 'master', '빈',
  '{"enName": "", "position": "석사과정 · M.A. Student", "interest": "", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '이수빈');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_김동욱', '김동욱', 'ra', 'ra', '동',
  '{"enName": "", "position": "학부연구생 · Research Assistant", "interest": "연구 보조 및 실험 참여", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '김동욱');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_오현하', '오현하', 'ra', 'ra', '오',
  '{"enName": "", "position": "학부연구생 · Research Assistant", "interest": "연구 보조 및 실험 참여", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '오현하');

INSERT INTO members (student_id, name, role, lab_group, avatar_char, profile)
SELECT 'TBD_이규나', '이규나', 'ra', 'ra', '규',
  '{"enName": "", "position": "학부연구생 · Research Assistant", "interest": "연구 보조 및 실험 참여", "email": "", "showEmail": false}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM members WHERE name = '이규나');

-- ══════════════════════════════════════════════
-- 5. (SQL 아님) Edge Function 재배포 필요
--    supabase/functions/create-member/index.ts 의 관리자 권한 체크를
--    role === 'admin' 전용에서 'admin' 또는 'professor' 허용으로 수정했습니다.
--    (실제 admin 계정의 members.role 값이 'professor'로 저장돼 있으면 기존 코드는
--    항상 403 "관리자 권한이 필요합니다" 오류를 냈을 가능성이 큽니다.)
--    이 .ts 파일 변경은 SQL이 아니므로 별도로 배포해야 적용됩니다:
--      supabase functions deploy create-member --project-ref pfnqcwamznvaxgqahavi
--    또는 Supabase 대시보드 → Edge Functions → create-member → 코드 붙여넣고 Deploy
-- ══════════════════════════════════════════════
