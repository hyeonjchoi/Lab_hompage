-- KW CAP Lab · 실시간 푸시 알림 인프라 설정
-- 2026-06-16에 Claude가 Supabase CLI로 운영 DB(pfnqcwamznvaxgqahavi)에 이미 적용한 내용을
-- 그대로 기록한 참고용 스크립트입니다. (push_subscriptions / notification_dispatch_log
-- 테이블 자체는 supabase-schema.sql에 정의되어 있고, 이 파일은 그 다음 단계인
-- 익스텐션 활성화 + 트리거 + cron만 다룹니다.)
--
-- 새 Supabase 프로젝트에 처음부터 다시 구축해야 하는 경우에만 이 파일을 그대로 실행하세요.
-- 그 경우 아래 두 곳을 먼저 채워야 합니다:
--   1. <YOUR_PROJECT_REF> — 함수 URL의 프로젝트 ref
--   2. <YOUR_WEBHOOK_SECRET> — `openssl rand -hex 32`로 직접 생성한 값.
--      같은 값을 `supabase secrets set EDGE_WEBHOOK_SECRET=...`으로도 등록해야 합니다.
--      (실제 운영 프로젝트에는 이미 별도로 생성한 값이 Vault와 Edge Function 양쪽에 등록되어 있습니다.)

CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- select vault.create_secret('<YOUR_WEBHOOK_SECRET>', 'edge_webhook_secret');

-- ══════════════════════════════════════════════
-- 새 공지 → 전체 구성원(작성자 제외) 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_notice() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-notice',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('noticeId', NEW.id)
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS notices_push_trigger ON notices;
CREATE TRIGGER notices_push_trigger AFTER INSERT ON notices FOR EACH ROW EXECUTE FUNCTION trg_push_on_notice();

-- ══════════════════════════════════════════════
-- 새 공유 자료 → 전체 구성원(작성자 제외) 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_resource() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-resource',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('resourceId', NEW.id)
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS resources_push_trigger ON resources;
CREATE TRIGGER resources_push_trigger AFTER INSERT ON resources FOR EACH ROW EXECUTE FUNCTION trg_push_on_resource();

-- ══════════════════════════════════════════════
-- 개인 피드백(member_notes) → 해당 구성원 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_member_note() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-feedback',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('source','member_note','id', NEW.id)
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS member_notes_push_trigger ON member_notes;
CREATE TRIGGER member_notes_push_trigger AFTER INSERT ON member_notes FOR EACH ROW EXECUTE FUNCTION trg_push_on_member_note();

-- ══════════════════════════════════════════════
-- 팀 프로젝트 메모/피드백(team_project_notes) → 다른 참여자 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_team_project_note() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-feedback',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('source','team_project_note','id', NEW.id)
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS team_project_notes_push_trigger ON team_project_notes;
CREATE TRIGGER team_project_notes_push_trigger AFTER INSERT ON team_project_notes FOR EACH ROW EXECUTE FUNCTION trg_push_on_team_project_note();

-- ══════════════════════════════════════════════
-- 팀 프로젝트 메모에 달린 답글(team_project_note_replies) → 다른 참여자 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_team_project_note_reply() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-feedback',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('source','team_project_note_reply','id', NEW.id)
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS team_project_note_replies_push_trigger ON team_project_note_replies;
CREATE TRIGGER team_project_note_replies_push_trigger AFTER INSERT ON team_project_note_replies FOR EACH ROW EXECUTE FUNCTION trg_push_on_team_project_note_reply();

-- ══════════════════════════════════════════════
-- 새 캘린더 일정 → 전체 구성원(작성자 제외) 즉시 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_lab_event() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-event',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('eventId', NEW.id)
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS lab_events_push_trigger ON lab_events;
CREATE TRIGGER lab_events_push_trigger AFTER INSERT ON lab_events FOR EACH ROW EXECUTE FUNCTION trg_push_on_lab_event();

-- ══════════════════════════════════════════════
-- 캘린더 일정 날짜/시간 변경 → 전체 구성원(작성자 제외) 즉시 푸시
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION trg_push_on_lab_event_update() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE secret TEXT;
BEGIN
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'edge_webhook_secret';
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-on-event',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||secret),
    body := jsonb_build_object('eventId', NEW.id, 'action', 'updated')
  );
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS lab_events_update_push_trigger ON lab_events;
CREATE TRIGGER lab_events_update_push_trigger
  AFTER UPDATE ON lab_events
  FOR EACH ROW
  WHEN (
    OLD.event_date IS DISTINCT FROM NEW.event_date OR
    OLD.start_time IS DISTINCT FROM NEW.start_time
  )
  EXECUTE FUNCTION trg_push_on_lab_event_update();

-- ══════════════════════════════════════════════
-- 15분마다: 다가오는 일정(참석자 또는 전체) / 목표 마감 임박 푸시
-- 중복 발송 방지는 notification_dispatch_log 테이블로 처리 (push-reminders 함수 내부 로직)
-- ══════════════════════════════════════════════
SELECT cron.schedule(
  'push-reminders-job',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/push-reminders',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name='edge_webhook_secret'))
  );
  $$
);
