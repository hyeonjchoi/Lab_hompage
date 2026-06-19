import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { CORS, checkWebhookSecret, adminClient, sendPushToMembers } from '../_shared/push.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  if (!checkWebhookSecret(req)) return json({ error: 'unauthorized' }, 401)

  try {
    const { noticeId } = await req.json()
    if (!noticeId) return json({ error: 'noticeId is required' }, 400)

    const admin = adminClient()
    const { data: notice, error: noticeErr } = await admin
      .from('notices').select('id, title, body, created_by').eq('id', noticeId).single()
    if (noticeErr || !notice) return json({ error: '공지를 찾을 수 없습니다' }, 404)

    const { data: members, error: membersErr } = await admin.from('members').select('id')
    if (membersErr) return json({ error: membersErr.message }, 500)

    const targetIds = (members ?? [])
      .map((m) => m.id)
      .filter((id) => id !== notice.created_by)

    const result = await sendPushToMembers(admin, targetIds, {
      title: notice.title + ' · 새 공지',
      body: (notice.body || '새 공지사항이 등록되었습니다.').slice(0, 100),
      url: 'lab-notices.html',
    })

    return json({ success: true, ...result, targeted: targetIds.length, ok: result.errors.length === 0 })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
