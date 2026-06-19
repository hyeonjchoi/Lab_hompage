import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { CORS, checkWebhookSecret, adminClient, sendPushToMembers } from '../_shared/push.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  if (!checkWebhookSecret(req)) return json({ error: 'unauthorized' }, 401)

  try {
    const { resourceId } = await req.json()
    if (!resourceId) return json({ error: 'resourceId is required' }, 400)

    const admin = adminClient()
    const { data: resource, error: resourceErr } = await admin
      .from('resources').select('id, title, description, created_by').eq('id', resourceId).single()
    if (resourceErr || !resource) return json({ error: '자료를 찾을 수 없습니다' }, 404)

    const { data: members, error: membersErr } = await admin.from('members').select('id')
    if (membersErr) return json({ error: membersErr.message }, 500)

    const targetIds = (members ?? [])
      .map((m: any) => m.id)
      .filter((id: string) => id !== resource.created_by)

    const result = await sendPushToMembers(admin, targetIds, {
      title: resource.title + ' · 새 공유 자료',
      body: (resource.description || '새 공유 자료가 등록되었습니다.').slice(0, 100),
      url: 'lab.html',
    })

    return json({ success: true, ...result, targeted: targetIds.length, ok: result.errors.length === 0 })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
