import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { CORS, checkWebhookSecret, adminClient, sendPushToMembers } from '../_shared/push.ts'

// 알림 세부 설정 UI는 없음 — 고정 임계값 사용
const EVENT_HOURS = 24
const EVENT_URGENT_HOURS = 1
const GOAL_DAYS = 2

const TYPE_LABEL: Record<string, string> = {
  meeting: '미팅', conference: '학회/모임', class: '수업', seminar: '세미나', etc: '일정',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  if (!checkWebhookSecret(req)) return json({ error: 'unauthorized' }, 401)

  try {
    const admin = adminClient()
    const now = new Date()
    const today = now.toISOString().slice(0, 10)

    const { data: allMembers, error: membersErr } = await admin.from('members').select('id')
    if (membersErr) return json({ error: membersErr.message }, 500)
    const allMemberIds = (allMembers ?? []).map((m) => m.id)

    let eventDue = 0, eventUrgent = 0, goalDue = 0

    // ── 다가오는 일정 ──────────────────────────
    const { data: events, error: eventsErr } = await admin
      .from('lab_events').select('id, title, type, event_date, start_time, attendee_ids')
      .gte('event_date', today)
    if (eventsErr) return json({ error: eventsErr.message }, 500)

    for (const ev of events ?? []) {
      const at = new Date(`${ev.event_date}T${ev.start_time || '00:00'}:00`)
      const hoursUntil = (at.getTime() - now.getTime()) / 36e5
      if (hoursUntil < 0) continue

      const targets = (ev.attendee_ids && ev.attendee_ids.length) ? ev.attendee_ids : allMemberIds
      const typeLabel = TYPE_LABEL[ev.type] || '일정'

      if (hoursUntil <= EVENT_HOURS) {
        const { error: dupErr } = await admin.from('notification_dispatch_log').insert({ kind: 'event-due', ref_id: ev.id })
        if (!dupErr) {
          await sendPushToMembers(admin, targets, {
            title: `다가오는 ${typeLabel}: ${ev.title}`,
            body: `${ev.event_date} ${ev.start_time || ''}`.trim(),
            url: 'lab.html',
          })
          eventDue++
        }
      }
      if (hoursUntil <= EVENT_URGENT_HOURS) {
        const { error: dupErr } = await admin.from('notification_dispatch_log').insert({ kind: 'event-urgent', ref_id: ev.id })
        if (!dupErr) {
          await sendPushToMembers(admin, targets, {
            title: `[긴급] ${typeLabel} 시작 임박: ${ev.title}`,
            body: `${ev.event_date} ${ev.start_time || ''}`.trim(),
            url: 'lab.html',
          })
          eventUrgent++
        }
      }
    }

    // ── 연구 목표 마감 임박 ────────────────────
    const { data: goals, error: goalsErr } = await admin
      .from('member_goals').select('id, member_id, title, status, target_date, end_date')
      .neq('status', 'done')
    if (goalsErr) return json({ error: goalsErr.message }, 500)

    for (const goal of goals ?? []) {
      const deadline = goal.target_date || goal.end_date
      if (!deadline) continue
      const daysUntil = (new Date(`${deadline}T23:59:59`).getTime() - now.getTime()) / 864e5
      if (daysUntil < 0 || daysUntil > GOAL_DAYS) continue

      const { error: dupErr } = await admin.from('notification_dispatch_log').insert({ kind: 'goal-due', ref_id: goal.id })
      if (!dupErr) {
        await sendPushToMembers(admin, [goal.member_id], {
          title: `연구 목표 마감 임박: ${goal.title}`,
          body: `마감일 ${deadline}`,
          url: 'member-dashboard.html',
        })
        goalDue++
      }
    }

    return json({ success: true, eventDue, eventUrgent, goalDue })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
