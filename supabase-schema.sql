-- KW CAP Lab · Supabase 데이터베이스 스키마
-- Supabase 대시보드 → SQL Editor에서 실행하세요.

-- ──────────────────────────────────────────────
-- 1. 구성원 (members)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    TEXT UNIQUE NOT NULL,        -- 학번 (로그인 ID)
  name          TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('professor', 'phd', 'master', 'undergrad', 'alumni')),
  lab_group     TEXT,                        -- 세부 연구 그룹
  profile_text  TEXT,
  avatar_url    TEXT,
  auth_user_id  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────
-- 2. LAB 이벤트 (lab_events)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lab_events (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type           TEXT NOT NULL CHECK (type IN ('class', 'meeting', 'conference', 'seminar', 'etc')),
  title          TEXT NOT NULL,
  event_date     DATE NOT NULL,
  start_time     TIME,
  end_time       TIME,
  location       TEXT,
  reference_url  TEXT,
  memo           TEXT,
  attendees      UUID[],                     -- member.id 배열
  created_by     UUID REFERENCES members(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────
-- 3. 회의록 (meeting_minutes)  — 60일 보관
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS meeting_minutes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID REFERENCES lab_events(id) ON DELETE SET NULL,
  meeting_date  DATE NOT NULL,
  title         TEXT NOT NULL,
  summary       TEXT,
  author_id     UUID REFERENCES members(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 60일 초과 회의록 자동 삭제 (pg_cron 또는 Edge Function으로 스케줄 설정 권장)
-- SELECT cron.schedule('delete-old-minutes', '0 3 * * *',
--   $$DELETE FROM meeting_minutes WHERE created_at < NOW() - INTERVAL '60 days'$$);

-- ──────────────────────────────────────────────
-- 4. 공지사항 (notices)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notices (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  body         TEXT,
  is_important BOOLEAN NOT NULL DEFAULT FALSE,
  created_by   UUID REFERENCES members(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────
-- 5. 공유 자료 (resources)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  url          TEXT,
  description  TEXT,
  created_by   UUID REFERENCES members(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────
-- 6. 구성원 목표 (member_goals)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS member_goals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id   UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done', 'hold')),
  category    TEXT,
  start_date  DATE,
  end_date    DATE,
  target_date DATE,
  memo        TEXT,
  author_id   UUID REFERENCES members(id),  -- 작성자 (본인 or 교수)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────
-- 7. 구성원 메모 / 교수 피드백 (member_notes)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS member_notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id   UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('memo', 'feedback')),
  content     TEXT NOT NULL,
  author_id   UUID REFERENCES members(id),
  author_name TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────
-- Row Level Security (RLS)
-- ──────────────────────────────────────────────
ALTER TABLE members         ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_minutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices         ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources       ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_goals    ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_notes    ENABLE ROW LEVEL SECURITY;

-- 헬퍼: 현재 사용자의 role 조회
CREATE OR REPLACE FUNCTION current_member_role()
RETURNS TEXT LANGUAGE sql STABLE AS $$
  SELECT role FROM members WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

-- 헬퍼: 현재 사용자의 member id 조회
CREATE OR REPLACE FUNCTION current_member_id()
RETURNS UUID LANGUAGE sql STABLE AS $$
  SELECT id FROM members WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

-- members: 로그인 사용자 전체 조회 가능, 본인만 수정
CREATE POLICY "members_select" ON members FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "members_update_own" ON members FOR UPDATE
  USING (auth_user_id = auth.uid());

-- lab_events: 로그인 사용자 조회, professor만 생성/수정/삭제
CREATE POLICY "events_select"   ON lab_events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "events_insert"   ON lab_events FOR INSERT WITH CHECK (current_member_role() = 'professor');
CREATE POLICY "events_update"   ON lab_events FOR UPDATE USING (current_member_role() = 'professor');
CREATE POLICY "events_delete"   ON lab_events FOR DELETE USING (current_member_role() = 'professor');

-- meeting_minutes: 로그인 사용자 조회, professor만 생성/삭제
CREATE POLICY "minutes_select"  ON meeting_minutes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "minutes_insert"  ON meeting_minutes FOR INSERT WITH CHECK (current_member_role() = 'professor');
CREATE POLICY "minutes_delete"  ON meeting_minutes FOR DELETE USING (current_member_role() = 'professor');

-- notices: 로그인 사용자 조회, professor만 CUD
CREATE POLICY "notices_select"  ON notices FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "notices_insert"  ON notices FOR INSERT WITH CHECK (current_member_role() = 'professor');
CREATE POLICY "notices_update"  ON notices FOR UPDATE USING (current_member_role() = 'professor');
CREATE POLICY "notices_delete"  ON notices FOR DELETE USING (current_member_role() = 'professor');

-- resources: 로그인 사용자 조회, professor만 CUD
CREATE POLICY "resources_select" ON resources FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "resources_insert" ON resources FOR INSERT WITH CHECK (current_member_role() = 'professor');
CREATE POLICY "resources_update" ON resources FOR UPDATE USING (current_member_role() = 'professor');
CREATE POLICY "resources_delete" ON resources FOR DELETE USING (current_member_role() = 'professor');

-- member_goals: 본인 또는 professor가 조회/수정 가능
CREATE POLICY "goals_select" ON member_goals FOR SELECT
  USING (member_id = current_member_id() OR current_member_role() = 'professor');
CREATE POLICY "goals_insert" ON member_goals FOR INSERT
  WITH CHECK (member_id = current_member_id());
CREATE POLICY "goals_update" ON member_goals FOR UPDATE
  USING (member_id = current_member_id());  -- professor는 목표 직접 수정 불가
CREATE POLICY "goals_delete" ON member_goals FOR DELETE
  USING (member_id = current_member_id());

-- member_notes: professor만 생성, 본인 또는 professor만 조회
CREATE POLICY "notes_select" ON member_notes FOR SELECT
  USING (member_id = current_member_id() OR current_member_role() = 'professor');
CREATE POLICY "notes_insert" ON member_notes FOR INSERT
  WITH CHECK (current_member_role() = 'professor' OR author_id = current_member_id());
CREATE POLICY "notes_delete" ON member_notes FOR DELETE
  USING (author_id = current_member_id() OR current_member_role() = 'professor');

-- ──────────────────────────────────────────────
-- updated_at 자동 갱신 트리거
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['members','lab_events','notices','resources','member_goals']
  LOOP
    EXECUTE format('CREATE TRIGGER trg_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t);
  END LOOP;
END $$;
