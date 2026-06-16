import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GROUP_ROLE: Record<string, string> = {
  professor:  'admin',
  phd:        'phd',
  integrated: 'phd',
  master:     'master',
  ra:         'ra',
  alumni:     'alumni',
}

const GROUP_POSITION: Record<string, string> = {
  professor:  '교수 · Professor / Principal Investigator',
  phd:        '박사과정 · Ph.D. Student',
  integrated: '석·박통합과정 · Integrated M.A.-Ph.D. Student',
  master:     '석사과정 · M.A. Student',
  ra:         '학부연구생 · Research Assistant',
  alumni:     '',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

  try {
    // 1) 호출자가 admin인지 확인
    const authHeader = req.headers.get('Authorization') ?? ''
    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user } } = await anonClient.auth.getUser()
    if (!user) return json({ error: '로그인이 필요합니다' }, 401)

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: caller } = await admin
      .from('members').select('role').eq('auth_user_id', user.id).single()
    if (!caller || (caller.role !== 'admin' && caller.role !== 'professor'))
      return json({ error: '관리자 권한이 필요합니다' }, 403)

    // 2) 요청 파싱
    const { name, studentId, group, enName, avatarChar, degree, affiliation } = await req.json()
    if (!name) return json({ error: '이름은 필수입니다' }, 400)

    const role = group === 'professor'
      ? (caller.role)        // professor도 admin 유지
      : (GROUP_ROLE[group] ?? 'member')

    const position = group === 'alumni'
      ? (degree ?? '')
      : (GROUP_POSITION[group] ?? '')

    const interest = group === 'alumni' ? (affiliation ?? '') : ''

    // 3) Auth 유저 생성 (학번 있을 때만)
    let auth_user_id: string | null = null
    if (studentId) {
      const { data: authUser, error: authErr } = await admin.auth.admin.createUser({
        email: `${studentId}@kwcaplab.internal`,
        password: studentId,
        email_confirm: true,
        user_metadata: { name },
      })
      if (authErr) return json({ error: `계정 생성 실패: ${authErr.message}` }, 400)
      auth_user_id = authUser.user.id
    }

    // 4) members 테이블 삽입
    const row: Record<string, unknown> = {
      student_id:  studentId || `TBD_${name}`,
      name,
      role,
      lab_group:   group,
      avatar_char: avatarChar || name.charAt(0),
      profile: { enName: enName ?? '', position, interest, email: '', showEmail: false },
    }
    if (auth_user_id) row.auth_user_id = auth_user_id

    const { data: member, error: dbErr } = await admin
      .from('members').insert(row).select().single()

    if (dbErr) {
      if (auth_user_id) await admin.auth.admin.deleteUser(auth_user_id)
      return json({ error: `DB 저장 실패: ${dbErr.message}` }, 400)
    }

    return json({ success: true, member })

  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})
