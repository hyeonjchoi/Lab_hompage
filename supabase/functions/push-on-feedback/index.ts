import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { CORS, checkWebhookSecret, adminClient, sendPushToMembers } from '../_shared/push.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  if (!checkWebhookSecret(req)) return json({ error: 'unauthorized' }, 401)

  try {
    const { source, id } = await req.json()
    if (!source || !id) return json({ error: 'source and id are required' }, 400)
    const admin = adminClient()

    if (source === 'member_note') {
      const { data: note, error } = await admin
        .from('member_notes').select('id, member_id, type, content, author_id, author_name').eq('id', id).single()
      if (error || !note) return json({ error: '메모를 찾을 수 없습니다' }, 404)
      if (note.type !== 'feedback') return json({ success: true, skipped: 'not feedback' })

      const targets = note.member_id === note.author_id ? [] : [note.member_id]
      const result = await sendPushToMembers(admin, targets, {
        title: (note.author_name || '지도교수') + '님이 피드백을 남겼습니다',
        body: (note.content || '').slice(0, 100),
        url: 'member-dashboard.html',
      })
      return json({ success: true, ...result })
    }

    if (source === 'team_project_note') {
      const { data: note, error } = await admin
        .from('team_project_notes').select('id, project_id, content, type, author_id, author_name').eq('id', id).single()
      if (error || !note) return json({ error: '메모를 찾을 수 없습니다' }, 404)

      const { data: project, error: pErr } = await admin
        .from('team_projects').select('id, name, member_ids').eq('id', note.project_id).single()
      if (pErr || !project) return json({ error: '프로젝트를 찾을 수 없습니다' }, 404)

      const targets = (project.member_ids || []).filter((mid: string) => mid !== note.author_id)
      const result = await sendPushToMembers(admin, targets, {
        title: (note.author_name || '팀원') + '님이 "' + project.name + '"에 ' + (note.type === 'feedback' ? '피드백을' : '메모를') + ' 남겼습니다',
        body: (note.content || '').slice(0, 100),
        url: 'lab-project.html?id=' + note.project_id,
      })
      return json({ success: true, ...result })
    }

    if (source === 'team_project_note_reply') {
      const { data: reply, error } = await admin
        .from('team_project_note_replies').select('id, note_id, content, author_id, author_name').eq('id', id).single()
      if (error || !reply) return json({ error: '답글을 찾을 수 없습니다' }, 404)

      const { data: note, error: nErr } = await admin
        .from('team_project_notes').select('id, project_id').eq('id', reply.note_id).single()
      if (nErr || !note) return json({ error: '원본 메모를 찾을 수 없습니다' }, 404)

      const { data: project, error: pErr } = await admin
        .from('team_projects').select('id, name, member_ids').eq('id', note.project_id).single()
      if (pErr || !project) return json({ error: '프로젝트를 찾을 수 없습니다' }, 404)

      const targets = (project.member_ids || []).filter((mid: string) => mid !== reply.author_id)
      const result = await sendPushToMembers(admin, targets, {
        title: (reply.author_name || '팀원') + '님이 "' + project.name + '"에 답글을 남겼습니다',
        body: (reply.content || '').slice(0, 100),
        url: 'lab-project.html?id=' + note.project_id,
      })
      return json({ success: true, ...result })
    }

    return json({ error: 'unknown source' }, 400)
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
