/**
 * supabase-client.js — KW CAP Lab Supabase 클라이언트
 *
 * 사용 전 필수:
 *   1. Supabase 대시보드 → Project Settings → API 에서
 *      아래 두 값을 복사해 붙여넣으세요.
 *   2. 각 HTML 파일 <head>에 Supabase SDK를 먼저 로드하세요:
 *      <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 *
 * 이 파일은 cap-data.js + cap-auth.js 를 대체합니다.
 * CAPData, CAPAuth, CAPAvatar, escHtml, showToast 는 동일한 이름으로 유지됩니다.
 */

const SUPABASE_URL      = 'https://pfnqcwamznvaxgqahavi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmbnFjd2Ftem52YXhncWFoYXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDc5OTEsImV4cCI6MjA5NzEyMzk5MX0.WzCEyb0WxI_X34d6XG7632Cy31J5_O5Yz58yRUUQygU';

// ──────────────────────────────────────────────
// 클라이언트 싱글턴
// ──────────────────────────────────────────────
let _supabase = null;
function getSupabase() {
  if (!_supabase) {
    if (typeof window.supabase === 'undefined') {
      throw new Error('Supabase SDK가 로드되지 않았습니다. HTML <head>에 CDN 스크립트를 추가하세요.');
    }
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

// ──────────────────────────────────────────────
// 내부 유틸
// ──────────────────────────────────────────────
function _throw(error) { if (error) throw error; }

// localStorage 기반 세션 호환 레이어 (Supabase 세션을 sessionStorage에도 미러)
function _mirrorSession(session) {
  if (!session) {
    sessionStorage.removeItem('cap_session');
    return;
  }
  const m = session._memberRow;
  if (!m) return;
  sessionStorage.setItem('cap_session', JSON.stringify({
    userId: m.id,
    name: m.name,
    role: m.role === 'admin' ? 'admin' : (m.role === 'professor' ? 'admin' : 'member')
  }));
}

// ══════════════════════════════════════════════
// CAPAuth — 인증 (cap-auth.js 대체)
// ══════════════════════════════════════════════
const CAPAuth = {
  /**
   * 로그인: 이름 + 학번으로 검증
   * Supabase Auth 이메일: {studentId}@kwcaplab.internal
   */
  async login(name, studentId) {
    if (!name || !studentId) {
      return { success: false, error: '이름과 학번을 모두 입력해주세요.' };
    }
    try {
      const email = `${studentId.trim()}@kwcaplab.internal`;
      const { data, error } = await getSupabase().auth.signInWithPassword({
        email,
        password: studentId.trim()  // 초기 비밀번호 = 학번 (관리자가 변경 가능)
      });
      if (error) return { success: false, error: '이름 또는 학번이 일치하지 않습니다.' };

      // members 테이블에서 이름 일치 확인
      const { data: member, error: mErr } = await getSupabase()
        .from('members')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();
      if (mErr || !member) return { success: false, error: '구성원 정보를 찾을 수 없습니다.' };
      if (member.name.trim() !== name.trim()) {
        await getSupabase().auth.signOut();
        return { success: false, error: '이름 또는 학번이 일치하지 않습니다.' };
      }

      const session = data.session;
      session._memberRow = member;
      _mirrorSession(session);
      return { success: true, user: member };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async logout() {
    await getSupabase().auth.signOut();
    sessionStorage.removeItem('cap_session');
  },

  // 동기 세션 (sessionStorage 미러 사용 — 페이지 렌더에 즉시 필요)
  getSession() {
    const raw = sessionStorage.getItem('cap_session');
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn() { return !!this.getSession(); },

  isAdmin() {
    const s = this.getSession();
    return s && s.role === 'admin';
  },

  requireAdmin() {
    if (!this.isAdmin()) window.location.href = 'index.html';
  },

  requireLogin(redirectBack) {
    if (!this.isLoggedIn()) {
      const dest = redirectBack
        ? 'login.html?redirect=' + encodeURIComponent(window.location.href)
        : 'login.html';
      window.location.href = dest;
    }
  },

  // Supabase 세션 복원 (페이지 로드 시 호출)
  async restoreSession() {
    const { data } = await getSupabase().auth.getSession();
    if (!data.session) { sessionStorage.removeItem('cap_session'); return; }
    const { data: member } = await getSupabase()
      .from('members')
      .select('*')
      .eq('auth_user_id', data.session.user.id)
      .single();
    if (member) {
      data.session._memberRow = member;
      _mirrorSession(data.session);
    }
  },

  renderNav() {
    const navAuth = document.getElementById('nav-auth');
    const session = this.getSession();
    document.querySelectorAll('.lab-nav-link').forEach(link => { link.hidden = !session; });
    if (!navAuth) return;
    if (session) {
      const labPageHref = 'lab-member.html?id=' + encodeURIComponent(session.userId);
      navAuth.innerHTML =
        '<div class="nav-auth-stack">' +
          '<div class="nav-auth-row">' +
            '<a class="nav-user-name" href="settings.html">' + escHtml(session.name) + '</a>' +
            '<a href="member-dashboard.html">내 프로필</a>' +
            '<a href="' + labPageHref + '">내 연구페이지</a>' +
          '</div>' +
          '<div class="nav-auth-row secondary">' +
            (session.role === 'admin' ? '<a class="nav-admin-link" href="admin.html">관리자</a>' : '') +
            (window.CAPNotifications ? '<button class="nav-notification" type="button" onclick="CAPNotifications.toggle()">' + escHtml(CAPNotifications.getNavLabel()) + '</button>' : '') +
            '<button class="nav-logout" onclick="CAPAuth.logout().then(()=>window.location.reload())">로그아웃</button>' +
          '</div>' +
        '</div>';
    } else {
      navAuth.innerHTML = '<a class="nav-login-btn" href="login.html">로그인</a>';
    }
  }
};

// ══════════════════════════════════════════════
// CAPData — 데이터 레이어 (cap-data.js 대체, 모두 async)
// ══════════════════════════════════════════════
const MEMBER_GROUP_PRIORITY = { professor: 0, phd: 1, integrated: 1, master: 2, ra: 3, alumni: 4 };

function sortMembersByGroupThenName(members) {
  return (members || []).slice().sort((a, b) => {
    const pa = MEMBER_GROUP_PRIORITY[a.lab_group] ?? 99;
    const pb = MEMBER_GROUP_PRIORITY[b.lab_group] ?? 99;
    if (pa !== pb) return pa - pb;
    return String(a.name || '').localeCompare(String(b.name || ''), 'ko');
  });
}

const CAPData = {

  // ── Members ───────────────────────────────
  async getMembers() {
    const { data, error } = await getSupabase().from('members').select('*');
    _throw(error); return sortMembersByGroupThenName(data);
  },
  async getMember(id) {
    const { data, error } = await getSupabase().from('members').select('*').eq('id', id).single();
    _throw(error); return data;
  },
  async getMemberByStudentId(studentId) {
    const { data, error } = await getSupabase().from('members').select('*').eq('student_id', studentId).single();
    _throw(error); return data;
  },
  async updateMemberProfile(id, profileUpdates) {
    const { error } = await getSupabase()
      .from('members').update({ profile: profileUpdates, updated_at: new Date().toISOString() }).eq('id', id);
    _throw(error); return true;
  },
  async updateMember(id, updates) {
    const { error } = await getSupabase()
      .from('members').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
    _throw(error); return true;
  },
  async updateStudentIdAndPassword(id, newStudentId) {
    // Supabase Auth 비밀번호 업데이트 (현재 로그인된 사용자)
    const { error: pwErr } = await getSupabase().auth.updateUser({
      password: newStudentId.trim()
    });
    if (pwErr) throw pwErr;

    // Supabase Auth 이메일 업데이트 (로그인 email = {학번}@kwcaplab.internal)
    const { error: emailErr } = await getSupabase().auth.updateUser({
      email: newStudentId.trim() + '@kwcaplab.internal'
    });
    // 이메일 변경은 확인 메일 없는 환경에서만 즉시 반영됨 — 실패해도 진행
    void emailErr;

    // members 테이블 student_id 업데이트 (관리자 패널에 즉시 반영)
    const { error } = await getSupabase()
      .from('members').update({ student_id: newStudentId.trim(), updated_at: new Date().toISOString() }).eq('id', id);
    _throw(error); return true;
  },
  async addMember(member) {
    const { data, error } = await getSupabase().from('members').insert(member).select().single();
    _throw(error); return data;
  },
  async removeMember(id) {
    const { error } = await getSupabase().from('members').delete().eq('id', id);
    _throw(error);
  },

  // ── Push Subscriptions ────────────────────
  async addPushSubscription(memberId, subscription) {
    // Safari의 PushSubscription은 .keys를 직접 노출하지 않음 — toJSON()으로 정규화
    const json = (typeof subscription.toJSON === 'function') ? subscription.toJSON() : subscription;
    const { error } = await getSupabase().from('push_subscriptions').upsert({
      member_id: memberId,
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth
    }, { onConflict: 'endpoint' });
    _throw(error);
  },
  async removePushSubscription(endpoint) {
    const { error } = await getSupabase().from('push_subscriptions').delete().eq('endpoint', endpoint);
    _throw(error);
  },

  // ── Site Content ──────────────────────────
  async getContent() {
    const { data, error } = await getSupabase().from('site_content').select('*');
    _throw(error);
    const result = {};
    (data || []).forEach(row => { result[row.key] = row.value; });
    return result;
  },
  async _setContent(key, value) {
    const { error } = await getSupabase()
      .from('site_content')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    _throw(error);
  },
  async updateHomeContent(updates) {
    const { data } = await getSupabase().from('site_content').select('value').eq('key', 'home').single();
    await this._setContent('home', { ...(data?.value || {}), ...updates });
  },
  async getPageMeta(pageId) {
    const { data } = await getSupabase().from('site_content').select('value').eq('key', 'pages.' + pageId).single();
    return data?.value || null;
  },
  async updatePageMeta(pageId, updates) {
    const current = await this.getPageMeta(pageId) || {};
    await this._setContent('pages.' + pageId, { ...current, ...updates });
  },
  async getResearchAxes() {
    const { data } = await getSupabase().from('site_content').select('value').eq('key', 'research').single();
    return (data?.value?.axes) || [];
  },
  async updateResearchAxis(axisId, updates) {
    const axes = await this.getResearchAxes();
    const idx = axes.findIndex(a => a.id === axisId);
    if (idx !== -1) { axes[idx] = { ...axes[idx], ...updates }; }
    await this._setContent('research', { axes });
  },
  async addResearchAxis(axis) {
    const axes = await this.getResearchAxes();
    axes.push({ id: 'axis_' + Date.now(), axisNum: axes.length + 1, ...axis });
    axes.forEach((a, i) => { a.axisNum = i + 1; });
    await this._setContent('research', { axes });
  },
  async removeResearchAxis(axisId) {
    let axes = await this.getResearchAxes();
    axes = axes.filter(a => a.id !== axisId);
    axes.forEach((a, i) => { a.axisNum = i + 1; });
    await this._setContent('research', { axes });
  },

  // ── Publications ──────────────────────────
  async getArticles() {
    const { data, error } = await getSupabase()
      .from('publications').select('*').eq('type', 'article').order('year', { ascending: false });
    _throw(error); return data;
  },
  async getPresentations() {
    const { data, error } = await getSupabase()
      .from('publications').select('*').eq('type', 'presentation').order('year', { ascending: false });
    _throw(error); return data;
  },
  async getAwards() {
    const { data, error } = await getSupabase()
      .from('publications').select('*').eq('type', 'award').order('year', { ascending: false });
    _throw(error); return data;
  },
  async addArticle(item) {
    const { data, error } = await getSupabase()
      .from('publications').insert({ type: 'article', ...item }).select().single();
    _throw(error); return data;
  },
  async removeArticle(id) {
    const { error } = await getSupabase().from('publications').delete().eq('id', id);
    _throw(error);
  },
  async addPresentation(item) {
    const { data, error } = await getSupabase()
      .from('publications').insert({ type: 'presentation', ...item }).select().single();
    _throw(error); return data;
  },
  async removePresentation(id) {
    const { error } = await getSupabase().from('publications').delete().eq('id', id);
    _throw(error);
  },
  async addAward(item) {
    const { data, error } = await getSupabase()
      .from('publications').insert({ type: 'award', ...item }).select().single();
    _throw(error); return data;
  },
  async removeAward(id) {
    const { error } = await getSupabase().from('publications').delete().eq('id', id);
    _throw(error);
  },

  // ── Lab Events ────────────────────────────
  async getLabEvents(fromDate, toDate) {
    let q = getSupabase().from('lab_events').select('*').order('event_date');
    if (fromDate) q = q.gte('event_date', fromDate);
    if (toDate)   q = q.lte('event_date', toDate);
    const { data, error } = await q;
    _throw(error); return data;
  },
  async addLabEvent(event) {
    const { data, error } = await getSupabase().from('lab_events').insert(event).select().single();
    _throw(error); return data;
  },
  async updateLabEvent(id, updates) {
    const { error } = await getSupabase().from('lab_events').update(updates).eq('id', id);
    _throw(error);
  },
  async removeLabEvent(id) {
    const { error } = await getSupabase().from('lab_events').delete().eq('id', id);
    _throw(error);
  },

  // ── Meeting Minutes ───────────────────────
  async getMeetingMinutes() {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 60);
    const { data, error } = await getSupabase()
      .from('meeting_minutes').select('*')
      .gte('created_at', cutoff.toISOString())
      .order('meeting_date', { ascending: false });
    _throw(error); return data;
  },
  async addMeetingMinute(minute) {
    const { data, error } = await getSupabase().from('meeting_minutes').insert(minute).select().single();
    _throw(error); return data;
  },
  async removeMeetingMinute(id) {
    const { error } = await getSupabase().from('meeting_minutes').delete().eq('id', id);
    _throw(error);
  },

  // ── Notices ───────────────────────────────
  async getNotices() {
    const { data, error } = await getSupabase()
      .from('notices').select('*').order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async addNotice(notice) {
    const { data, error } = await getSupabase().from('notices').insert(notice).select().single();
    _throw(error); return data;
  },
  async updateNotice(id, updates) {
    const { error } = await getSupabase().from('notices').update(updates).eq('id', id);
    _throw(error);
  },
  async removeNotice(id) {
    const { error } = await getSupabase().from('notices').delete().eq('id', id);
    _throw(error);
  },

  // ── Resources ─────────────────────────────
  async getResources() {
    const { data, error } = await getSupabase()
      .from('resources').select('*').order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async addResource(resource) {
    const { data, error } = await getSupabase().from('resources').insert(resource).select().single();
    _throw(error); return data;
  },
  async removeResource(id) {
    const { error } = await getSupabase().from('resources').delete().eq('id', id);
    _throw(error);
  },

  // ── Member Goals ──────────────────────────
  async getMemberGoals(memberId) {
    const { data, error } = await getSupabase()
      .from('member_goals').select('*').eq('member_id', memberId)
      .order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async addMemberGoal(goal) {
    const { data, error } = await getSupabase().from('member_goals').insert(goal).select().single();
    _throw(error); return data;
  },
  async updateMemberGoal(id, updates) {
    const { error } = await getSupabase()
      .from('member_goals').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
    _throw(error);
  },
  async removeMemberGoal(id) {
    const { error } = await getSupabase().from('member_goals').delete().eq('id', id);
    _throw(error);
  },

  // ── Member Notes ──────────────────────────
  async getMemberNotes(memberId) {
    const { data, error } = await getSupabase()
      .from('member_notes').select('*').eq('member_id', memberId)
      .order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async addMemberNote(note) {
    const { data, error } = await getSupabase().from('member_notes').insert(note).select().single();
    _throw(error); return data;
  },
  async removeMemberNote(id) {
    const { error } = await getSupabase().from('member_notes').delete().eq('id', id);
    _throw(error);
  },

  // ── Team Projects ─────────────────────────
  async getTeamProjects() {
    const { data, error } = await getSupabase()
      .from('team_projects').select('*').order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async getTeamProject(id) {
    const { data, error } = await getSupabase()
      .from('team_projects').select('*').eq('id', id).single();
    _throw(error); return data;
  },
  async addTeamProject(project) {
    const { data, error } = await getSupabase().from('team_projects').insert(project).select().single();
    _throw(error); return data;
  },
  async updateTeamProject(id, updates) {
    const { error } = await getSupabase()
      .from('team_projects').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
    _throw(error); return true;
  },
  async removeTeamProject(id) {
    const { error } = await getSupabase().from('team_projects').delete().eq('id', id);
    _throw(error);
  },
  async getProjectsForMember(memberId) {
    const { data, error } = await getSupabase()
      .from('team_projects').select('*')
      .contains('member_ids', [memberId]);
    _throw(error); return data;
  },

  // ── Project Goals ─────────────────────────
  async getProjectGoals(projectId) {
    const { data, error } = await getSupabase()
      .from('team_project_goals').select('*').eq('project_id', projectId)
      .order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async addProjectGoal(projectId, goal) {
    const { data, error } = await getSupabase()
      .from('team_project_goals').insert({ project_id: projectId, ...goal }).select().single();
    _throw(error); return data;
  },
  async updateProjectGoal(projectId, goalId, updates) {
    const { error } = await getSupabase()
      .from('team_project_goals')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', goalId).eq('project_id', projectId);
    _throw(error); return true;
  },
  async removeProjectGoal(projectId, goalId) {
    const { error } = await getSupabase()
      .from('team_project_goals').delete().eq('id', goalId).eq('project_id', projectId);
    _throw(error);
  },

  // ── Project Notes ─────────────────────────
  async getProjectNotes(projectId) {
    const { data, error } = await getSupabase()
      .from('team_project_notes')
      .select('*, replies:team_project_note_replies(*)')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    _throw(error); return data;
  },
  async addProjectNote(projectId, note) {
    const { data, error } = await getSupabase()
      .from('team_project_notes').insert({ project_id: projectId, ...note }).select().single();
    _throw(error); return data;
  },
  async updateProjectNote(projectId, noteId, updates) {
    const { error } = await getSupabase()
      .from('team_project_notes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', noteId).eq('project_id', projectId);
    _throw(error); return true;
  },
  async removeProjectNote(projectId, noteId) {
    const { error } = await getSupabase()
      .from('team_project_notes').delete().eq('id', noteId).eq('project_id', projectId);
    _throw(error);
  },

  // ── Project Note Replies ──────────────────
  async addProjectNoteReply(projectId, noteId, reply) {
    const { data, error } = await getSupabase()
      .from('team_project_note_replies').insert({ note_id: noteId, ...reply }).select().single();
    _throw(error); return data;
  },
  async removeProjectNoteReply(projectId, noteId, replyId) {
    const { error } = await getSupabase()
      .from('team_project_note_replies').delete().eq('id', replyId);
    _throw(error);
  },

  // ── Project Progress ──────────────────────
  async getProjectProgress(projectId) {
    const { data, error } = await getSupabase()
      .from('team_project_progress').select('*').eq('project_id', projectId);
    _throw(error); return data;
  },
  async updateProjectProgress(projectId, memberId, status, memo) {
    const { error } = await getSupabase()
      .from('team_project_progress')
      .upsert(
        { project_id: projectId, member_id: memberId, status, memo, updated_at: new Date().toISOString() },
        { onConflict: 'project_id,member_id' }
      );
    _throw(error); return true;
  }
};

// ══════════════════════════════════════════════
// CAPAvatar — 이모지/캐릭터 아바타 (cap-auth.js와 동일)
// ══════════════════════════════════════════════
var CAPAvatar = {
  defaults: {
    enabled: false, gender: 'female', face: 'round',
    expression: 'smile', background: 'blue', accessory: 'none'
  },
  normalize(options) {
    const o = { ...this.defaults, ...(options || {}) };
    const allowed = {
      face: ['round', 'soft', 'long'],
      gender: ['female', 'male'],
      expression: ['smile', 'calm', 'focus', 'confident'],
      background: ['blue', 'red', 'green', 'gray', 'navy', 'lavender'],
      accessory: ['none', 'glasses', 'book', 'microscope', 'laptop']
    };
    Object.keys(allowed).forEach(key => {
      if (!allowed[key].includes(o[key])) o[key] = this.defaults[key];
    });
    o.enabled = !!o.enabled;
    return o;
  },
  render(options, label) {
    const o = this.normalize(options);
    const bg = { blue: '#EAF2F8', red: '#FCE8EA', green: '#EAF7EF', gray: '#F1F3F5', navy: '#DDE8EF', lavender: '#EFEAFE' }[o.background];
    const accent = o.background === 'red' ? '#B51F2B' : '#183A5A';
    const hair = o.gender === 'female'
      ? '<path d="M24 44q0-29 26-29t26 29v20q-8-7-14-16-11 11-31 10-3 8-7 12z" fill="' + accent + '" opacity="0.96"/>'
      : '<path d="M27 36q8-19 23-19t23 19q-10-7-23-7t-23 7z" fill="' + accent + '" opacity="0.96"/>';
    const faceShape = { round: '<circle cx="50" cy="48" r="27" fill="#FFE2C4" stroke="#183A5A" stroke-width="3"/>', soft: '<rect x="24" y="21" width="52" height="58" rx="21" fill="#FFE2C4" stroke="#183A5A" stroke-width="3"/>', long: '<ellipse cx="50" cy="50" rx="24" ry="32" fill="#FFE2C4" stroke="#183A5A" stroke-width="3"/>' }[o.face];
    const eyes = o.expression === 'confident'
      ? '<path d="M35 43h10M55 43h10" stroke="#183A5A" stroke-width="4" stroke-linecap="round"/>'
      : '<circle cx="39" cy="44" r="3" fill="#183A5A"/><circle cx="61" cy="44" r="3" fill="#183A5A"/>';
    const mouth = { smile: '<path d="M39 58q11 12 22 0" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>', calm: '<path d="M41 59h18" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>', focus: '<path d="M43 59q7 4 14 0" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>', confident: '<path d="M40 58q10 8 20 0" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>' }[o.expression];
    const accessory = { none: '', glasses: '<circle cx="39" cy="44" r="9" fill="none" stroke="#183A5A" stroke-width="3"/><circle cx="61" cy="44" r="9" fill="none" stroke="#183A5A" stroke-width="3"/><path d="M48 44h4" stroke="#183A5A" stroke-width="3"/>', book: '<rect x="14" y="68" width="24" height="18" rx="3" fill="#fff" stroke="#B51F2B" stroke-width="3"/><path d="M26 68v18" stroke="#B51F2B" stroke-width="2"/>', microscope: '<path d="M70 70h15M78 50l9 13M70 48l8-8" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/><circle cx="67" cy="51" r="6" fill="#fff" stroke="#B51F2B" stroke-width="3"/>', laptop: '<rect x="64" y="67" width="24" height="15" rx="3" fill="#fff" stroke="#B51F2B" stroke-width="3"/><path d="M60 84h32" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>' }[o.accessory];
    return '<svg class="avatar avatar-character" viewBox="0 0 100 100" role="img" aria-label="' + escHtml(label || '캐릭터 아바타') + '">' +
      '<rect width="100" height="100" rx="50" fill="' + bg + '"/>' + hair + faceShape + eyes + mouth + accessory + '</svg>';
  }
};

// ──────────────────────────────────────────────
// 전역 유틸 (cap-auth.js와 동일한 이름 유지)
// ──────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(msg, duration) {
  duration = duration || 2200;
  let toast = document.getElementById('cap-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cap-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ──────────────────────────────────────────────
// 페이지 로드 시 실행
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
  await CAPAuth.restoreSession();
  setupMobileNav();
  CAPAuth.renderNav();
});

function setupMobileNav() {
  const shell = document.querySelector('.nav-shell');
  const nav   = document.querySelector('.nav-links');
  if (!shell || !nav || shell.querySelector('.nav-toggle')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav-toggle';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', '메뉴 열기');
  button.innerHTML = '<span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>';
  button.addEventListener('click', function () {
    const isOpen = shell.classList.toggle('nav-open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });
  shell.insertBefore(button, nav);
}

// 전역 노출 (기존 코드 호환)
window.CAPAuth     = CAPAuth;
window.CAPData     = CAPData;
window.CAPAvatar   = CAPAvatar;
window.escHtml     = escHtml;
window.showToast   = showToast;
window.getSupabase = getSupabase;
