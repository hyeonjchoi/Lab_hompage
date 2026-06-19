// 공용 푸시 발송 헬퍼 — push-on-notice / push-on-feedback / push-reminders 가 import 해서 사용한다.
import webpush from 'npm:web-push@3.6.7'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

webpush.setVapidDetails(
  Deno.env.get('VAPID_SUBJECT')!,
  Deno.env.get('VAPID_PUBLIC_KEY')!,
  Deno.env.get('VAPID_PRIVATE_KEY')!
)

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// DB 트리거/cron만 호출하도록, Authorization 헤더의 공유 비밀값을 확인한다 (verify_jwt는 꺼둠).
export function checkWebhookSecret(req: Request): boolean {
  const auth = req.headers.get('Authorization') ?? ''
  const expected = Deno.env.get('EDGE_WEBHOOK_SECRET') ?? ''
  return expected.length > 0 && auth === `Bearer ${expected}`
}

export function adminClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
}

export interface PushPayload {
  title: string
  body: string
  url?: string
}

// memberIds 에게 등록된 모든 기기로 발송.
// 4xx 응답(만료·무효·인증실패)은 구독을 삭제하고 errors 배열에 기록한다.
export async function sendPushToMembers(admin: ReturnType<typeof adminClient>, memberIds: string[], payload: PushPayload) {
  if (!memberIds.length) return { sent: 0, removed: 0, errors: [] }
  const { data: subs, error } = await admin
    .from('push_subscriptions')
    .select('id, endpoint, p256dh, auth')
    .in('member_id', memberIds)
  if (error) throw error

  let sent = 0
  let removed = 0
  const errors: string[] = []

  await Promise.all((subs ?? []).map(async (sub) => {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        JSON.stringify(payload)
      )
      sent++
    } catch (e: any) {
      const status = e?.statusCode ?? e?.status ?? 0
      const msg = `endpoint=${sub.endpoint.slice(0, 40)} status=${status} body=${String(e?.body ?? e?.message ?? e).slice(0, 120)}`
      errors.push(msg)
      // 4xx는 모두 무효 구독 — 삭제해서 다음 방문 시 재등록 유도
      if (status >= 400 && status < 500) {
        await admin.from('push_subscriptions').delete().eq('id', sub.id)
        removed++
      }
    }
  }))
  return { sent, removed, errors }
}
