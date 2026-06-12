// Supabase 클라이언트 초기화
// 사용 전: 아래 두 값을 Supabase 프로젝트 대시보드에서 복사해 입력하세요.
//   Project Settings → API → Project URL / anon public key

const SUPABASE_URL = 'YOUR_SUPABASE_URL';       // 예: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// CDN으로 로드된 @supabase/supabase-js 사용
// 각 HTML 파일의 <head>에 아래 스크립트 태그를 추가한 후 이 파일을 로드해야 합니다:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let _supabase = null;

function getSupabase() {
  if (!_supabase) {
    if (typeof window.supabase === 'undefined') {
      console.error('Supabase SDK가 로드되지 않았습니다. HTML에 CDN 스크립트를 추가하세요.');
      return null;
    }
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

// ──────────────────────────────────────────────
// Auth helpers (기존 cap-auth.js 교체 예정)
// ──────────────────────────────────────────────

async function signInWithStudentId(studentId, password) {
  // 학번을 이메일 형식으로 변환 (Supabase auth는 이메일 기반)
  const email = `${studentId}@kwcaplab.internal`;
  const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

async function signOut() {
  const { error } = await getSupabase().auth.signOut();
  if (error) throw error;
}

async function getCurrentSession() {
  const { data } = await getSupabase().auth.getSession();
  return data.session;
}

async function getCurrentUser() {
  const { data } = await getSupabase().auth.getUser();
  return data.user;
}

// ──────────────────────────────────────────────
// Data helpers (기존 cap-data.js 교체 예정)
// ──────────────────────────────────────────────

const DB = {
  // LAB 이벤트
  async getLabEvents() {
    const { data, error } = await getSupabase()
      .from('lab_events')
      .select('*')
      .order('date', { ascending: true });
    if (error) throw error;
    return data;
  },

  // 공지사항
  async getNotices() {
    const { data, error } = await getSupabase()
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // 회의록
  async getMeetingMinutes() {
    const { data, error } = await getSupabase()
      .from('meeting_minutes')
      .select('*')
      .order('meeting_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  // 공유 자료
  async getResources() {
    const { data, error } = await getSupabase()
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // 구성원 목록
  async getMembers() {
    const { data, error } = await getSupabase()
      .from('members')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  },

  // 특정 구성원 목표
  async getMemberGoals(memberId) {
    const { data, error } = await getSupabase()
      .from('member_goals')
      .select('*')
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // 교수 피드백 / 메모
  async getMemberNotes(memberId) {
    const { data, error } = await getSupabase()
      .from('member_notes')
      .select('*')
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
};

// 브라우저 전역으로 노출
window.CapDB   = DB;
window.CapAuth = { signInWithStudentId, signOut, getCurrentSession, getCurrentUser };
