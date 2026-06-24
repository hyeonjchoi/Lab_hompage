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

function cleanStudentId(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function base64UrlFromString(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function loginEmail(studentId: string): string {
  if (/^[A-Za-z0-9._%+-]+$/.test(studentId)) {
    return `${studentId.toLowerCase()}@kwcaplab.internal`
  }
  return `login-${base64UrlFromString(studentId)}@kwcaplab.internal`
}

function loginPassword(loginId: string, name: string): string {
  const base = `TBD_${name}`
  if (!loginId.startsWith(base)) return loginId
  return `CAP_${name}${loginId.slice(base.length)}`
}

async function nextTemporaryLoginId(admin: ReturnType<typeof createClient>, name: string): Promise<string> {
  const base = `TBD_${name}`
  const { data, error } = await admin
    .from('members')
    .select('student_id')
    .like('student_id', `${base}%`)
  if (error) throw error

  const used = new Set((data || []).map((row) => row.student_id))
  if (!used.has(base)) return base

  let suffix = 2
  while (used.has(`${base}_${suffix}`)) suffix += 1
  return `${base}_${suffix}`
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

    // 2) 요청 파싱
    const body = await req.json()
    const { name, group, enName, avatarChar, degree, affiliation } = body
    const studentId = cleanStudentId(body.studentId)

    const isAdmin = caller && (caller.role === 'admin' || caller.role === 'professor')

    if (body.action === 'delete-member') {
      if (!isAdmin) return json({ error: '관리자 권한이 필요합니다' }, 403)
      const memberId = body.memberId
      if (!memberId) return json({ error: '구성원 ID가 필요합니다' }, 400)

      const { data: member, error: memberErr } = await admin
        .from('members')
        .select('id, auth_user_id')
        .eq('id', memberId)
        .single()
      if (memberErr || !member) return json({ error: '구성원을 찾을 수 없습니다' }, 404)

      const { error: dbErr } = await admin
        .from('members')
        .delete()
        .eq('id', memberId)
      if (dbErr) return json({ error: `DB 삭제 실패: ${dbErr.message}` }, 400)

      if (member.auth_user_id) {
        const { error: authErr } = await admin.auth.admin.deleteUser(member.auth_user_id as string)
        if (authErr) return json({ error: `로그인 계정 삭제 실패: ${authErr.message}` }, 400)
      }

      return json({ success: true })
    }

    if (body.action === 'sync-login') {
      const memberId = body.memberId
      if (!memberId) return json({ error: '구성원 ID가 필요합니다' }, 400)
      if (!studentId) return json({ error: '학번은 필수입니다' }, 400)

      const { data: member, error: memberErr } = await admin
        .from('members')
        .select('id, name, auth_user_id')
        .eq('id', memberId)
        .single()
      if (memberErr || !member) return json({ error: '구성원을 찾을 수 없습니다' }, 404)

      // 관리자이거나 본인 계정 수정인 경우만 허용
      const isSelf = member.auth_user_id === user.id
      if (!isAdmin && !isSelf)
        return json({ error: '권한이 없습니다' }, 403)

      const email = loginEmail(studentId)
      const password = loginPassword(studentId, member.name as string)
      let authUserId = member.auth_user_id as string | null

      if (authUserId) {
        const { error: updateAuthErr } = await admin.auth.admin.updateUserById(authUserId, {
          email,
          password,
          email_confirm: true,
          user_metadata: { name: member.name },
        })
        if (updateAuthErr) return json({ error: `계정 갱신 실패: ${updateAuthErr.message}` }, 400)
      } else {
        const { data: listed, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
        if (listErr) return json({ error: `계정 조회 실패: ${listErr.message}` }, 400)
        const existing = listed.users.find((user) => user.email?.toLowerCase() === email)

        if (existing) {
          authUserId = existing.id
          const { error: updateAuthErr } = await admin.auth.admin.updateUserById(authUserId, {
            password,
            email_confirm: true,
            user_metadata: { name: member.name },
          })
          if (updateAuthErr) return json({ error: `계정 갱신 실패: ${updateAuthErr.message}` }, 400)
        } else {
          const { data: authUser, error: authErr } = await admin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name: member.name },
          })
          if (authErr) return json({ error: `계정 생성 실패: ${authErr.message}` }, 400)
          authUserId = authUser.user.id
        }
      }

      const { data: updated, error: dbErr } = await admin
        .from('members')
        .update({ student_id: studentId, auth_user_id: authUserId, updated_at: new Date().toISOString() })
        .eq('id', memberId)
        .select()
        .single()
      if (dbErr) return json({ error: `DB 저장 실패: ${dbErr.message}` }, 400)

      return json({ success: true, member: updated })
    }

    if (!isAdmin) return json({ error: '관리자 권한이 필요합니다' }, 403)
    if (!name) return json({ error: '이름은 필수입니다' }, 400)
    const loginId = studentId || await nextTemporaryLoginId(admin, name)

    const role = group === 'professor'
      ? (caller.role)        // professor도 admin 유지
      : (GROUP_ROLE[group] ?? 'member')

    const position = group === 'alumni'
      ? (degree ?? '')
      : (GROUP_POSITION[group] ?? '')

    const interest = group === 'alumni' ? (affiliation ?? '') : ''

    // 3) Auth 유저 생성 (학번이 없으면 ID는 TBD_이름, 임시 비밀번호는 CAP_이름)
    //    동일 이메일의 고아 Auth 계정이 있으면 재사용(업데이트)하고 새로 만들지 않음
    let auth_user_id: string | null = null
    const targetEmail = loginEmail(loginId)
    const targetPassword = loginPassword(loginId, name)

    const { data: listed } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
    const existingAuthUser = listed?.users.find(
      (u) => u.email?.toLowerCase() === targetEmail.toLowerCase()
    )

    if (existingAuthUser) {
      // 고아 Auth 계정 재사용: 비밀번호·메타데이터만 갱신
      await admin.auth.admin.updateUserById(existingAuthUser.id, {
        password: targetPassword,
        email_confirm: true,
        user_metadata: { name },
      })
      auth_user_id = existingAuthUser.id
    } else {
      const { data: authUser, error: authErr } = await admin.auth.admin.createUser({
        email: targetEmail,
        password: targetPassword,
        email_confirm: true,
        user_metadata: { name },
      })
      if (authErr) return json({ error: `계정 생성 실패: ${authErr.message}` }, 400)
      auth_user_id = authUser.user.id
    }

    // 4) members 테이블 삽입
    const row: Record<string, unknown> = {
      student_id:  loginId,
      name,
      role,
      lab_group:   group,
      avatar_char: avatarChar || name.charAt(0),
      profile: { enName: enName ?? '', position, interest, email: '', showEmail: false },
      auth_user_id,
    }

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
