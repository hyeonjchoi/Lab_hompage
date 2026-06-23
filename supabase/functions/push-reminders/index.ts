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
// settingsKey: 사용자 notification_settings.timings 배열과 대응하는 키.
// 창은 비중첩 [low, high) 구간 — 각 이벤트가 최대 1개 창에만 해당.
const TIMING_WINDOWS = [
  { kind: 'event-day1',    settingsKey: 'day1',    low: 1380, high: 1500, label: '내일 일정' },    // 23~25h
  { kind: 'event-min30',   settingsKey: 'min30',   low: 27,   high: 33,   label: '30분 후 시작' }, // ±3분 / 30분
  { kind: 'event-min15',   settingsKey: 'min15',   low: 12,   high: 18,   label: '15분 후 시작' }, // ±3분 / 15분
  { kind: 'event-atStart', settingsKey: 'atStart', low: 0,    high: 5,    label: '지금 시작' },    // 0~5분
] as const

const DEFAULT_TIMINGS = ['day1', 'atStart']
const DEFAULT_TYPES: Record<string, boolean> = { class: true, meeting: true, conference: true, goal: true, feedback: true }

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

    // 사용자별 알림 설정 로드 (없으면 기본값 사용)
    const { data: notifSettings } = await admin
      .from('notification_settings')
      .select('member_id, timings, types')
    const memberSettings: Record<string, { timings: string[], types: Record<string, boolean> }> = {}
    for (const ns of notifSettings ?? []) {
      memberSettings[ns.member_id] = {
        timings: Array.isArray(ns.timings) && ns.timings.length > 0 ? ns.timings : DEFAULT_TIMINGS,
        types: (ns.types && typeof ns.types === 'object') ? ns.types : DEFAULT_TYPES,
      }
    }

    // 사용자 설정 기반 타겟 필터: timing 키와 이벤트 타입 모두 확인
    function filterTargets(candidateIds: string[], settingsKey: string, eventType: string): string[] {
      return candidateIds.filter(memberId => {
        const ms = memberSettings[memberId]
        if (!ms) return true  // 설정 없음 → 기본값 포함
        if (!ms.timings.includes(settingsKey)) return false
        if (ms.types[eventType] === false) return false
        return true
      })
    }

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

      // 5분 크론의 실행 지연(수 초)으로 인한 창 경계 오분류 방지:
      // 실제 실행 시각 대신 직전 5분 단위 정각 기준으로 minutesUntil을 계산한다.
      // 예) 이벤트 11:57, 크론 11:52:05 → now 기준 4.97분 → atStart 오분류
      //     cronNow(11:52:00) 기준 5.00분 → min5 정상 분류
      const cronNow = new Date(Math.floor(now.getTime() / 300000) * 300000)
      const minutesUntil = (at.getTime() - cronNow.getTime()) / 60000
      const allTargets: string[] = (ev.attendee_ids?.length) ? ev.attendee_ids : allMemberIds
      const eventType = ev.type || 'meeting'
      const typeLabel = TYPE_LABEL[eventType] || '일정'
      const dtLabel = formatKSTDatetime(ev.event_date, timeStr)

      // ── 당일(KST) 오전 9:00~9:14 알림 ──────────
      if (ev.event_date === todayKST && nowKSTMinutes >= 9 * 60 && nowKSTMinutes < 9 * 60 + 14) {
        const targets = filterTargets(allTargets, 'morning9', eventType)
        if (targets.length > 0) {
          const { error: dupErr } = await admin
            .from('notification_dispatch_log')
            .insert({ kind: 'event-morning9', ref_id: ev.id })
          if (!dupErr) {
            const r = await sendPushToMembers(admin, targets, {
              title: `${ev.title} · ${dtLabel}`,
              body: `오늘의 일정 · ${typeLabel}`,
              url: 'lab.html',
            })
            if (r.sent === 0) {
              // 아무것도 전송 안 됨(구독 없거나 모두 만료) — 재등록 후 재시도하도록 로그 삭제
              await admin.from('notification_dispatch_log').delete().eq('kind', 'event-morning9').eq('ref_id', ev.id)
            } else {
              eventSent++
              details.push(`morning9: ${ev.title}`)
            }
          }
        }
      }

      // ── 시간대별 미리알림 ─────────────────────────
      for (const t of TIMING_WINDOWS) {
        if (minutesUntil < t.low || minutesUntil >= t.high) continue

        const targets = filterTargets(allTargets, t.settingsKey, eventType)
        if (targets.length === 0) continue

        const { error: dupErr } = await admin
          .from('notification_dispatch_log')
          .insert({ kind: t.kind, ref_id: ev.id })
        if (!dupErr) {
          const r = await sendPushToMembers(admin, targets, {
            title: `${ev.title} · ${dtLabel}`,
            body: `${t.label} · ${typeLabel}`,
            url: 'lab.html',
          })
          if (r.sent === 0) {
            // 아무것도 전송 안 됨(구독 없거나 모두 만료) — 재등록 후 재시도하도록 로그 삭제
            await admin.from('notification_dispatch_log').delete().eq('kind', t.kind).eq('ref_id', ev.id)
          } else {
            eventSent++
            details.push(`${t.kind}: ${ev.title}`)
          }
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
      const deadlineAt = new Date(`${deadline}T23:59:59+09:00`)
      const daysUntil = (deadlineAt.getTime() - now.getTime()) / 864e5
      if (daysUntil < 0 || daysUntil > 2) continue

      // goal 알림은 types.goal 설정만 확인
      const ms = memberSettings[goal.member_id]
      if (ms && ms.types['goal'] === false) continue

      const { error: dupErr } = await admin
        .from('notification_dispatch_log')
        .insert({ kind: 'goal-due', ref_id: goal.id })
      if (!dupErr) {
        const r = await sendPushToMembers(admin, [goal.member_id], {
          title: `연구 목표 마감 임박: ${goal.title}`,
          body: `마감일 ${deadline}`,
          url: 'member-dashboard.html',
        })
        if (r.sent === 0) {
          // 아무것도 전송 안 됨 — 재등록 후 재시도하도록 로그 삭제
          await admin.from('notification_dispatch_log').delete().eq('kind', 'goal-due').eq('ref_id', goal.id)
        } else {
          goalDue++
        }
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
