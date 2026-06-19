import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { CORS, checkWebhookSecret, adminClient, sendPushToMembers, formatKSTDatetime } from '../_shared/push.ts'

// 크론은 5분마다 실행.
// 중복 방지: notification_dispatch_log (kind, ref_id) unique constraint.
// 날짜/시간은 한국시간(KST = UTC+9) 기준으로 처리.

const KST_OFFSET_MS = 9 * 3600 * 1000

const TYPE_LABEL: Record<string, string> = {
  meeting: '미팅', conference: '학회/모임', class: '수업', seminar: '세미나',
}

// 시간대별 알림 창 (단위: 분). 5분 크론 대비 최소 6분 창 확보.
// Windows are non-overlapping; low inclusive, high exclusive.
// 창이 겹치지 않도록 설계: [low, high) 구간이 연속하여 각 이벤트가 최대 1개 창에 해당.
const TIMING_WINDOWS = [
  { kind: 'event-day1',    low: 1380, high: 1500, label: '내일 일정' },   // 23~25h
  { kind: 'event-min30',   low: 25,   high: 38,   label: '30분 후 시작' }, // 25~38분
  { kind: 'event-min15',   low: 11,   high: 25,   label: '15분 후 시작' }, // 11~25분
  { kind: 'event-min5',    low: 5,    high: 11,   label: '5분 후 시작' },  // 5~11분
  { kind: 'event-atStart', low: 0,    high: 5,    label: '지금 시작' },    // 0~5분
] as const

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  if (!checkWebhookSecret(req)) return json({ error: 'unauthorized' }, 401)

  try {
    const admin = adminClient()
    const now = new Date()

    // KST 기준 현재 시각 계산
    const nowKST = new Date(now.getTime() + KST_OFFSET_MS)
    const todayKST = nowKST.toISOString().slice(0, 10)           // YYYY-MM-DD (KST)
    const nowKSTMinutes = nowKST.getUTCHours() * 60 + nowKST.getUTCMinutes()  // 0~1439

    const { data: allMembers, error: membersErr } = await admin.from('members').select('id')
    if (membersErr) return json({ error: membersErr.message }, 500)
    const allMemberIds = (allMembers ?? []).map((m: any) => m.id)

    // 오늘(KST) 이후 일정 조회
    const { data: events, error: eventsErr } = await admin
      .from('lab_events')
      .select('id, title, type, event_date, start_time, attendee_ids')
      .gte('event_date', todayKST)
    if (eventsErr) return json({ error: eventsErr.message }, 500)

    let eventSent = 0
    const details: string[] = []

    for (const ev of events ?? []) {
      // start_time은 DB에서 'HH:MM:SS' 또는 'HH:MM' 형식 — 앞 5자만 사용
      const timeStr = ev.start_time ? String(ev.start_time).slice(0, 5) : '09:00'

      // KST 시각으로 Date 객체 생성 (+09:00 suffix)
      const at = new Date(`${ev.event_date}T${timeStr}:00+09:00`)
      if (isNaN(at.getTime())) continue  // 파싱 실패 건너뜀

      const minutesUntil = (at.getTime() - now.getTime()) / 60000
      const targets: string[] = (ev.attendee_ids?.length) ? ev.attendee_ids : allMemberIds
      const typeLabel = TYPE_LABEL[ev.type] || '일정'
      const dateStr = `${ev.event_date} ${timeStr}`

      const dtLabel = formatKSTDatetime(ev.event_date, timeStr)

      // ── 당일(KST) 오전 9:00~9:14 알림 ──────────
      if (ev.event_date === todayKST && nowKSTMinutes >= 9 * 60 && nowKSTMinutes < 9 * 60 + 14) {
        const { error: dupErr } = await admin
          .from('notification_dispatch_log')
          .insert({ kind: 'event-morning9', ref_id: ev.id })
        if (!dupErr) {
          await sendPushToMembers(admin, targets, {
            title: `${ev.title} · ${dtLabel}`,
            body: `오늘의 일정 · ${typeLabel}`,
            url: 'lab.html',
          })
          eventSent++
          details.push(`morning9: ${ev.title}`)
        }
      }

      // ── 시간대별 미리알림 ─────────────────────────
      for (const t of TIMING_WINDOWS) {
        if (minutesUntil < t.low || minutesUntil >= t.high) continue

        const { error: dupErr } = await admin
          .from('notification_dispatch_log')
          .insert({ kind: t.kind, ref_id: ev.id })
        if (!dupErr) {
          await sendPushToMembers(admin, targets, {
            title: `${ev.title} · ${dtLabel}`,
            body: `${t.label} · ${typeLabel}`,
            url: 'lab.html',
          })
          eventSent++
          details.push(`${t.kind}: ${ev.title}`)
        }
      }
    }

    // ── 연구 목표 마감 임박 (2일 이내, KST 기준) ──────
    const { data: goals, error: goalsErr } = await admin
      .from('member_goals')
      .select('id, member_id, title, status, target_date, end_date')
      .neq('status', 'done')
    if (goalsErr) return json({ error: goalsErr.message }, 500)

    let goalDue = 0
    for (const goal of goals ?? []) {
      const deadline = goal.target_date || goal.end_date
      if (!deadline) continue
      // 마감일 23:59 KST 기준 계산
      const deadlineAt = new Date(`${deadline}T23:59:59+09:00`)
      const daysUntil = (deadlineAt.getTime() - now.getTime()) / 864e5
      if (daysUntil < 0 || daysUntil > 2) continue

      const { error: dupErr } = await admin
        .from('notification_dispatch_log')
        .insert({ kind: 'goal-due', ref_id: goal.id })
      if (!dupErr) {
        await sendPushToMembers(admin, [goal.member_id], {
          title: `연구 목표 마감 임박: ${goal.title}`,
          body: `마감일 ${deadline}`,
          url: 'member-dashboard.html',
        })
        goalDue++
      }
    }

    // ── 오래된 디스패치 로그 정리 (7일 이상) ─────────
    await admin
      .from('notification_dispatch_log')
      .delete()
      .lt('sent_at', new Date(now.getTime() - 7 * 864e5).toISOString())

    return json({ success: true, eventSent, goalDue, details })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
