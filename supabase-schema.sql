-- KW CAP Lab · Supabase 데이터베이스 스키마
-- Supabase 대시보드 → SQL Editor에서 실행하세요.
-- 이 파일은 처음 한 번만 실행하면 됩니다. 이미 실행한 경우 IF NOT EXISTS로 중복 방지됩니다.

-- ══════════════════════════════════════════════
-- 1. 구성원 (members)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('professor', 'phd', 'master', 'undergrad', 'ra', 'alumni', 'admin')),
  lab_group     TEXT,                           -- 'professor' | 'phd' | 'master' | 'ra' | 'alumni'
  avatar_char   TEXT,                           -- 한 글자 텍스트 아바타
  avatar_emoji  TEXT,                           -- 이모지 아바타 문자
  avatar_config JSONB,                          -- 캐릭터 아바타 옵션 {enabled, gender, face, ...}
  photo         TEXT,                           -- base64 data URL (희망자만)
  profile       JSONB NOT NULL DEFAULT '{}',   -- {enName, position, interest, email, showEmail}
  auth_user_id  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 2. LAB 이벤트 (lab_events)
-- ══════════════════════════════════════════════
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
  attendee_ids   UUID[],                        -- members.id 배열
  created_by     UUID REFERENCES members(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 3. 회의록 (meeting_minutes)  — 60일 보관
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS meeting_minutes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID REFERENCES lab_events(id) ON DELETE SET NULL,
  meeting_date  DATE NOT NULL,
  title         TEXT NOT NULL,
  summary       TEXT,
  attendee_ids  UUID[],
  author_id     UUID REFERENCES members(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 60일 초과 회의록 자동 삭제 (Supabase pg_cron으로 활성화)
-- SELECT cron.schedule('delete-old-minutes', '0 3 * * *',
--   $$DELETE FROM meeting_minutes WHERE created_at < NOW() - INTERVAL '60 days'$$);

-- ══════════════════════════════════════════════
-- 4. 공지사항 (notices)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS notices (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  body         TEXT,
  is_important BOOLEAN NOT NULL DEFAULT FALSE,
  created_by   UUID REFERENCES members(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 5. 공유 자료 (resources)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS resources (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  url          TEXT,
  description  TEXT,
  created_by   UUID REFERENCES members(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 6. 구성원 개인 목표 (member_goals)
-- ══════════════════════════════════════════════
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
  author_id   UUID REFERENCES members(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 7. 구성원 메모 / 교수 피드백 (member_notes)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS member_notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id       UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  type            TEXT NOT NULL CHECK (type IN ('memo', 'feedback')),
  content         TEXT NOT NULL,
  linked_goal_id  UUID REFERENCES member_goals(id) ON DELETE SET NULL,
  author_id       UUID REFERENCES members(id),
  author_name     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 8. 팀 프로젝트 (team_projects)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS team_projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  description  TEXT,
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  start_date   DATE,
  end_date     DATE,
  creator_id   UUID REFERENCES members(id),
  member_ids   UUID[],                          -- 참여자 배열
  photo        TEXT,                            -- base64 또는 URL
  avatar_emoji TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 9. 팀 프로젝트 목표 (team_project_goals)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS team_project_goals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES team_projects(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done', 'hold')),
  category    TEXT,
  start_date  DATE,
  end_date    DATE,
  target_date DATE,
  memo        TEXT,
  author_id   UUID REFERENCES members(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 10. 팀 프로젝트 메모/노트 (team_project_notes)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS team_project_notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES team_projects(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  type            TEXT NOT NULL DEFAULT 'note' CHECK (type IN ('note', 'feedback')),
  done            BOOLEAN NOT NULL DEFAULT FALSE,
  linked_goal_id  UUID REFERENCES team_project_goals(id) ON DELETE SET NULL,
  author_id       UUID REFERENCES members(id),
  author_name     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 11. 팀 프로젝트 노트 댓글 (team_project_note_replies)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS team_project_note_replies (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id     UUID NOT NULL REFERENCES team_project_notes(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  author_id   UUID REFERENCES members(id),
  author_name TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 12. 팀 프로젝트 내 개인 진행상황 (team_project_progress)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS team_project_progress (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES team_projects(id) ON DELETE CASCADE,
  member_id  UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  status     TEXT,
  memo       TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, member_id)
);

-- ══════════════════════════════════════════════
-- 13. 논문 및 학술 성과 (publications)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS publications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT NOT NULL CHECK (type IN ('article', 'presentation', 'award')),
  title       TEXT NOT NULL,
  -- 논문 공통
  authors     TEXT,
  year        TEXT,
  -- 저널 논문 전용
  journal     TEXT,
  doi         TEXT,
  -- 학술발표 전용
  presenter   TEXT,
  venue       TEXT,
  pres_type   TEXT,           -- '구두 발표' | '포스터 발표'
  -- 수상 전용
  recipient   TEXT,
  description TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 14. 사이트 콘텐츠 (site_content)
-- 관리자가 편집하는 홈/페이지 텍스트, 연구 축 데이터 등
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,        -- 예: 'home', 'pages.people', 'research'
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 15. 푸시 구독 정보 (push_subscriptions)
-- 구성원이 "알림 허용"을 누르면 기기별로 한 행씩 저장됨
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id  UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  endpoint   TEXT NOT NULL UNIQUE,
  p256dh     TEXT NOT NULL,
  auth       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════
-- 16. 알림 발송 기록 (notification_dispatch_log)
-- 일정/목표 마감 같은 시간 기반 알림의 중복 발송을 막기 위한 기록
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS notification_dispatch_log (
  kind    TEXT NOT NULL,
  ref_id  UUID NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (kind, ref_id)
);

-- ══════════════════════════════════════════════
-- Row Level Security (RLS)
-- ══════════════════════════════════════════════
ALTER TABLE members                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_events                ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_minutes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_goals              ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_notes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_projects             ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_goals        ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_notes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_note_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_progress     ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications              ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content              ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_dispatch_log  ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────
-- 헬퍼 함수
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION current_member_role()
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM members WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION current_member_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT id FROM members WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

-- ──────────────────────────────────────────────
-- members: 누구나 조회(공개 구성원 디렉터리), 본인 또는 professor/admin만 수정,
--          professor/admin만 삭제 (구성원 추가는 create-member Edge Function이 service role로 처리)
-- ──────────────────────────────────────────────
CREATE POLICY "members_select" ON members FOR SELECT
  USING (true);
CREATE POLICY "members_update_own" ON members FOR UPDATE
  USING (auth_user_id = auth.uid() OR current_member_role() IN ('professor', 'admin'));
CREATE POLICY "members_delete_admin" ON members FOR DELETE
  USING (current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- lab_events: 로그인 사용자 조회/삽입/수정/삭제 모두 허용 (모든 구성원)
-- ──────────────────────────────────────────────
CREATE POLICY "events_select" ON lab_events FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "events_insert" ON lab_events FOR INSERT
  WITH CHECK (current_member_id() IS NOT NULL);
CREATE POLICY "events_update" ON lab_events FOR UPDATE
  USING (current_member_id() IS NOT NULL);
CREATE POLICY "events_delete" ON lab_events FOR DELETE
  USING (current_member_id() IS NOT NULL);

-- ──────────────────────────────────────────────
-- meeting_minutes: 로그인 사용자 조회, professor/admin만 CUD
-- ──────────────────────────────────────────────
CREATE POLICY "minutes_select" ON meeting_minutes FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "minutes_insert" ON meeting_minutes FOR INSERT
  WITH CHECK (current_member_id() IS NOT NULL);
CREATE POLICY "minutes_update" ON meeting_minutes FOR UPDATE
  USING (current_member_id() IS NOT NULL)
  WITH CHECK (current_member_id() IS NOT NULL);
CREATE POLICY "minutes_delete" ON meeting_minutes FOR DELETE
  USING (current_member_id() IS NOT NULL);

-- ──────────────────────────────────────────────
-- notices: 로그인 사용자 조회, professor/admin만 CUD
-- ──────────────────────────────────────────────
CREATE POLICY "notices_select" ON notices FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "notices_insert" ON notices FOR INSERT
  WITH CHECK (current_member_id() IS NOT NULL);
CREATE POLICY "notices_update" ON notices FOR UPDATE
  USING (current_member_role() IN ('professor', 'admin'));
CREATE POLICY "notices_delete" ON notices FOR DELETE
  USING (current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- resources: 로그인 사용자 조회, professor/admin만 CUD
-- ──────────────────────────────────────────────
CREATE POLICY "resources_select" ON resources FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "resources_insert" ON resources FOR INSERT
  WITH CHECK (current_member_id() IS NOT NULL);
CREATE POLICY "resources_update" ON resources FOR UPDATE
  USING (current_member_role() IN ('professor', 'admin'));
CREATE POLICY "resources_delete" ON resources FOR DELETE
  USING (current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- member_goals: 본인 또는 professor/admin 조회
-- ──────────────────────────────────────────────
CREATE POLICY "goals_select" ON member_goals FOR SELECT
  USING (member_id = current_member_id() OR current_member_role() IN ('professor', 'admin'));
CREATE POLICY "goals_insert" ON member_goals FOR INSERT
  WITH CHECK (member_id = current_member_id());
CREATE POLICY "goals_update" ON member_goals FOR UPDATE
  USING (member_id = current_member_id());
CREATE POLICY "goals_delete" ON member_goals FOR DELETE
  USING (member_id = current_member_id());

-- ──────────────────────────────────────────────
-- member_notes: professor/admin 생성, 본인 또는 professor/admin 조회
-- ──────────────────────────────────────────────
CREATE POLICY "notes_select" ON member_notes FOR SELECT
  USING (member_id = current_member_id() OR current_member_role() IN ('professor', 'admin'));
CREATE POLICY "notes_insert" ON member_notes FOR INSERT
  WITH CHECK (current_member_role() IN ('professor', 'admin') OR author_id = current_member_id());
CREATE POLICY "notes_delete" ON member_notes FOR DELETE
  USING (author_id = current_member_id() OR current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- team_projects: 참여자 또는 professor/admin 조회/수정
-- ──────────────────────────────────────────────
CREATE POLICY "team_projects_select" ON team_projects FOR SELECT
  USING (
    auth.role() = 'authenticated' AND (
      current_member_id() = ANY(member_ids)
      OR creator_id = current_member_id()
      OR current_member_role() IN ('professor', 'admin')
    )
  );
CREATE POLICY "team_projects_insert" ON team_projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "team_projects_update" ON team_projects FOR UPDATE
  USING (
    creator_id = current_member_id()
    OR current_member_role() IN ('professor', 'admin')
  );
CREATE POLICY "team_projects_delete" ON team_projects FOR DELETE
  USING (
    creator_id = current_member_id()
    OR current_member_role() IN ('professor', 'admin')
  );

-- ──────────────────────────────────────────────
-- team_project_goals: 프로젝트 참여자 조회/수정
-- ──────────────────────────────────────────────
CREATE POLICY "tp_goals_select" ON team_project_goals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_projects p
      WHERE p.id = project_id AND (
        current_member_id() = ANY(p.member_ids)
        OR p.creator_id = current_member_id()
        OR current_member_role() IN ('professor', 'admin')
      )
    )
  );
CREATE POLICY "tp_goals_insert" ON team_project_goals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_projects p
      WHERE p.id = project_id AND current_member_id() = ANY(p.member_ids)
    )
  );
CREATE POLICY "tp_goals_update" ON team_project_goals FOR UPDATE
  USING (
    author_id = current_member_id() OR current_member_role() IN ('professor', 'admin')
  );
CREATE POLICY "tp_goals_delete" ON team_project_goals FOR DELETE
  USING (
    author_id = current_member_id() OR current_member_role() IN ('professor', 'admin')
  );

-- ──────────────────────────────────────────────
-- team_project_notes + replies: 프로젝트 참여자
-- ──────────────────────────────────────────────
CREATE POLICY "tp_notes_select" ON team_project_notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_projects p
      WHERE p.id = project_id AND (
        current_member_id() = ANY(p.member_ids)
        OR p.creator_id = current_member_id()
        OR current_member_role() IN ('professor', 'admin')
      )
    )
  );
CREATE POLICY "tp_notes_insert" ON team_project_notes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_projects p
      WHERE p.id = project_id AND current_member_id() = ANY(p.member_ids)
    )
  );
CREATE POLICY "tp_notes_update" ON team_project_notes FOR UPDATE
  USING (author_id = current_member_id() OR current_member_role() IN ('professor', 'admin'));
CREATE POLICY "tp_notes_delete" ON team_project_notes FOR DELETE
  USING (author_id = current_member_id() OR current_member_role() IN ('professor', 'admin'));

CREATE POLICY "tp_replies_select" ON team_project_note_replies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_project_notes n
      JOIN team_projects p ON p.id = n.project_id
      WHERE n.id = note_id AND (
        current_member_id() = ANY(p.member_ids)
        OR p.creator_id = current_member_id()
        OR current_member_role() IN ('professor', 'admin')
      )
    )
  );
CREATE POLICY "tp_replies_insert" ON team_project_note_replies FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_project_notes n
      JOIN team_projects p ON p.id = n.project_id
      WHERE n.id = note_id AND current_member_id() = ANY(p.member_ids)
    )
  );
CREATE POLICY "tp_replies_delete" ON team_project_note_replies FOR DELETE
  USING (author_id = current_member_id() OR current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- team_project_progress: 프로젝트 참여자
-- ──────────────────────────────────────────────
CREATE POLICY "tp_progress_select" ON team_project_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_projects p
      WHERE p.id = project_id AND (
        current_member_id() = ANY(p.member_ids)
        OR p.creator_id = current_member_id()
        OR current_member_role() IN ('professor', 'admin')
      )
    )
  );
CREATE POLICY "tp_progress_upsert" ON team_project_progress FOR INSERT
  WITH CHECK (member_id = current_member_id());
CREATE POLICY "tp_progress_update" ON team_project_progress FOR UPDATE
  USING (member_id = current_member_id());

-- ──────────────────────────────────────────────
-- publications: 누구나 조회, professor/admin만 CUD
-- ──────────────────────────────────────────────
CREATE POLICY "publications_select" ON publications FOR SELECT
  USING (true);   -- 비로그인도 조회 가능 (공개 데이터)
CREATE POLICY "publications_insert" ON publications FOR INSERT
  WITH CHECK (current_member_role() IN ('professor', 'admin'));
CREATE POLICY "publications_delete" ON publications FOR DELETE
  USING (current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- site_content: 누구나 조회, professor/admin만 수정
-- ──────────────────────────────────────────────
CREATE POLICY "site_content_select" ON site_content FOR SELECT
  USING (true);
CREATE POLICY "site_content_upsert" ON site_content FOR INSERT
  WITH CHECK (current_member_role() IN ('professor', 'admin'));
CREATE POLICY "site_content_update" ON site_content FOR UPDATE
  USING (current_member_role() IN ('professor', 'admin'));

-- ──────────────────────────────────────────────
-- push_subscriptions: 본인 구독만 조회/추가/삭제 (Edge Function은 service_role로 RLS 우회)
-- ──────────────────────────────────────────────
CREATE POLICY "push_subscriptions_select_own" ON push_subscriptions FOR SELECT
  USING (member_id = current_member_id());
CREATE POLICY "push_subscriptions_insert_own" ON push_subscriptions FOR INSERT
  WITH CHECK (member_id = current_member_id());
CREATE POLICY "push_subscriptions_delete_own" ON push_subscriptions FOR DELETE
  USING (member_id = current_member_id());

-- ──────────────────────────────────────────────
-- notification_dispatch_log: 클라이언트는 접근 불필요 (Edge Function이 service_role로만 읽고 씀)
-- ──────────────────────────────────────────────
CREATE POLICY "notification_dispatch_log_no_access" ON notification_dispatch_log FOR SELECT
  USING (false);

-- ══════════════════════════════════════════════
-- updated_at 자동 갱신 트리거
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'members', 'lab_events', 'notices', 'resources',
    'member_goals', 'team_projects', 'team_project_goals',
    'team_project_notes', 'site_content'
  ]
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_updated_at ON %I; CREATE TRIGGER trg_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
      t, t
    );
  END LOOP;
END $$;

-- ══════════════════════════════════════════════
-- Storage 버킷 (Supabase Storage)
-- Supabase 대시보드 → Storage → New Bucket 에서 직접 생성하거나 아래 실행
-- ══════════════════════════════════════════════
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('avatars', 'avatars', true)
-- ON CONFLICT (id) DO NOTHING;

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('project-photos', 'project-photos', true)
-- ON CONFLICT (id) DO NOTHING;
