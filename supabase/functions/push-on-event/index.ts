import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { CORS, checkWebhookSecret, adminClient, sendPushToMembers } from '../_shared/push.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  if (!checkWebhookSecret(req)) return json({ error: 'unauthorized' }, 401)

  try {
    const { eventId, action } = await req.json()
    if (!eventId) return json({ error: 'eventId is required' }, 400)

    const admin = adminClient()
    const { data: event, error: eventErr } = await admin
      .from('lab_events')
      .select('id, title, event_date, start_time, type, created_by')
      .eq('id', eventId)
      .single()
    if (eventErr || !event) return json({ error: '일정을 찾을 수 없습니다' }, 404)

    const { data: members, error: membersErr } = await admin.from('members').select('id')
    if (membersErr) return json({ error: membersErr.message }, 500)

    const targetIds = (members ?? [])
      .map((m) => m.id)
      .filter((id) => id !== event.created_by)

    const typeLabel =
      event.type === 'meeting' ? '랩미팅' :
      event.type === 'conference' ? '학회/모임' :
      event.type === 'seminar' ? '세미나' : '수업'

    const dateStr = event.event_date ? String(event.event_date) : ''
    const timeStr = event.start_time ? ' ' + String(event.start_time).slice(0, 5) : ''

    const isUpdate = action === 'updated'
    const result = await sendPushToMembers(admin, targetIds, {
      title: (isUpdate ? '일정 변경: ' : '새 일정: ') + (event.title || '연구실 일정'),
      body: '[' + typeLabel + '] ' + dateStr + timeStr,
      url: 'lab.html',
    })

    return json({ success: true, ...result, targeted: targetIds.length, ok: result.errors.length === 0 })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
