/**
 * cap-data.js — KW CAP Lab 데이터 레이어
 * 모든 데이터를 localStorage에 저장·관리한다.
 * 초기 방문 시 기본값(CAP_DEFAULTS)을 자동 로드한다.
 */

const CAP_DEFAULTS = {
  members: [
    {
      id: 'lee-bk',
      name: '이병관',
      studentId: 'ADMIN001',
      role: 'admin',
      group: 'professor',
      avatarChar: '이',
      profile: {
        enName: 'Byung-kwan Lee',
        position: '교수 · Professor / Principal Investigator',
        interest: '소비자 태도 및 광고 반응\n설득 커뮤니케이션',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'rim-hb',
      name: '임혜빈',
      studentId: 'ADMIN002',
      role: 'admin',
      group: 'professor',
      avatarChar: '임',
      profile: {
        enName: 'Hye Bin Rim',
        position: '교수 · Professor / Principal Investigator',
        interest: '소비자 심리\n젠더와 소비자 경험',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'park-je',
      name: '박정은',
      studentId: '',
      role: 'member',
      group: 'phd',
      avatarChar: '박',
      profile: {
        enName: '',
        position: '박사과정 · Ph.D. Student',
        interest: '',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'choi-hj',
      name: '최현정',
      studentId: '2022122708',
      role: 'member',
      group: 'phd',
      avatarChar: '최',
      profile: {
        enName: '',
        position: '박사과정 · Ph.D. Student',
        interest: '',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'kim-jy',
      name: '김재용',
      studentId: '',
      role: 'member',
      group: 'master',
      avatarChar: '재',
      profile: {
        enName: '',
        position: '석사과정 · M.A. Student',
        interest: '',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'kim-mj',
      name: '김민지',
      studentId: '',
      role: 'member',
      group: 'master',
      avatarChar: '민',
      profile: {
        enName: '',
        position: '석사과정 · M.A. Student',
        interest: '',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'lee-sb',
      name: '이수빈',
      studentId: '',
      role: 'member',
      group: 'master',
      avatarChar: '빈',
      profile: {
        enName: '',
        position: '석사과정 · M.A. Student',
        interest: '',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'kim-dw',
      name: '김동욱',
      studentId: '',
      role: 'member',
      group: 'ra',
      avatarChar: '동',
      profile: {
        enName: '',
        position: '학부연구생 · Research Assistant',
        interest: '연구 보조 및 실험 참여',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'oh-hh',
      name: '오현하',
      studentId: '',
      role: 'member',
      group: 'ra',
      avatarChar: '오',
      profile: {
        enName: '',
        position: '학부연구생 · Research Assistant',
        interest: '연구 보조 및 실험 참여',
        email: '',
        showEmail: false
      },
      updatedAt: null
    },
    {
      id: 'lee-gn',
      name: '이규나',
      studentId: '',
      role: 'member',
      group: 'ra',
      avatarChar: '규',
      profile: {
        enName: '',
        position: '학부연구생 · Research Assistant',
        interest: '연구 보조 및 실험 참여',
        email: '',
        showEmail: false
      },
      updatedAt: null
    }
  ],

  content: {
    home: {
      heroTitle: '광고와 소비자 경험 속\n마음의 움직임을 연구합니다.',
      heroLead: '광운대학교 소비자광고심리 연구실은 광고 반응, 소비자 판단, AI 서비스 상호작용, 식품 관련 의사결정, 여성 소비자 경험을 연구합니다.',
      heroLeadEn: 'KW CAP Lab investigates how consumers think, feel, and act in advertising, service, and AI-mediated contexts.'
    },
    pages: {
      people: {
        eyebrow: 'People',
        title: '구성원',
        description: '기본 프로필은 이모지 아바타로 제공하며, 사진과 이메일은 희망자에 한해 공개합니다.\n로그인한 구성원은 자신의 카드에서 직접 정보를 수정할 수 있습니다.',
        titleStyle: { color: '#FFFFFF', fontSize: '', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
        descriptionStyle: { color: '#D9E2EC', fontSize: '', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
      },
      research: {
        eyebrow: 'Research Areas',
        title: '진행 연구',
        description: '소비자가 광고, 서비스, AI 기반 상호작용에서 어떻게 생각하고 느끼며 행동하는지 탐구합니다.',
        titleStyle: { color: '#FFFFFF', fontSize: '', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
        descriptionStyle: { color: '#D9E2EC', fontSize: '', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
      },
      publications: {
        eyebrow: 'Publications',
        title: '연구 성과',
        description: '논문은 DOI와 저널 링크를 우선 제공합니다. 가능한 경우 학교 도서관 사이트와 연동합니다.',
        titleStyle: { color: '#FFFFFF', fontSize: '', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
        descriptionStyle: { color: '#D9E2EC', fontSize: '', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
      },
      reservation: {
        eyebrow: 'RSVN',
        title: '실험실 예약',
        description: '광운대학교 산업심리학과 학생 전용 실험실습실, 한울관 105호 예약 안내입니다.',
        titleStyle: { color: '#FFFFFF', fontSize: '', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
        descriptionStyle: { color: '#D9E2EC', fontSize: '', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
      },
      join: {
        eyebrow: 'Join Us',
        title: '지원하기',
        description: '대학원생 지원과 학부연구생 RA 모집은 절차가 다릅니다. 아래 안내를 확인하신 후 지원해 주세요.',
        titleStyle: { color: '#FFFFFF', fontSize: '', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
        descriptionStyle: { color: '#D9E2EC', fontSize: '', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
      }
    },
    research: {
      axes: [
        {
          id: 'axis1', axisNum: 1,
          title: '소비자 판단과 광고 반응',
          en: 'Consumer Judgment & Advertising Response',
          desc: '광고 메시지, 브랜드 단서, 설득 커뮤니케이션이 소비자의 태도 형성과 행동 의도에 미치는 영향을 다양한 맥락에서 연구합니다. 소비자가 광고를 어떻게 처리하고 반응하는지, 설득 지식과 저항이 어떤 역할을 하는지 탐구합니다.',
          tags: ['Regulatory Focus Theory', 'Construal Level Theory', 'Persuasion Knowledge Model', 'Elaboration Likelihood Model', 'Attribution Theory']
        },
        {
          id: 'axis2', axisNum: 2,
          title: '인간-AI 서비스 상호작용',
          en: 'Human-AI Service Interaction',
          desc: 'AI 추천 시스템, 자동화 서비스, 디지털 상담 환경에서 소비자의 신뢰, 수용, 저항 반응을 분석합니다. AI 의인화, 알고리즘 혐오, 자동화에 대한 소비자 심리를 탐구합니다.',
          tags: ['Algorithm Aversion', 'Anthropomorphism', 'Trust in Automation', 'Technology Acceptance Model', 'Uncanny Valley']
        },
        {
          id: 'axis3', axisNum: 3,
          title: '식품 관련 연구',
          en: 'Food-related Consumer Research',
          desc: '식품 선택, 건강 관련 메시지, 제품 정보 표시, 소비 상황이 소비자 판단과 행동 의도에 미치는 영향을 연구합니다. 식품 라벨, 영양 정보, 원산지 표시 등이 소비자 신뢰와 구매 결정에 어떻게 작용하는지 탐구합니다.',
          tags: ['Health Belief Model', 'Food Choice Motives', 'Risk Perception', 'Information Processing Theory']
        },
        {
          id: 'axis4', axisNum: 4,
          title: '여성에 관한 연구',
          en: 'Women, Gender & Consumer Psychology',
          desc: '여성 소비자 경험, 젠더 인식, 사회적 정체성과 소비자 심리의 관계를 탐구합니다. 광고와 미디어에서 여성 표현 방식이 소비자의 자아 인식, 태도, 행동에 미치는 영향을 연구합니다.',
          tags: ['Social Identity Theory', 'Gender Schema Theory', 'Stereotype Content Model', 'Objectification Theory', 'Self-Concept Theory']
        }
      ]
    },
    publications: {
      articles: [
        {
          id: 'a1',
          title: '논문 제목 예시 — 광고 메시지 유형과 소비자 태도 변화에 관한 연구',
          authors: '이병관, 임혜빈',
          journal: '한국광고학보',
          year: '2025',
          doi: ''
        },
        {
          id: 'a2',
          title: '두 번째 논문 제목 예시 — AI 추천 시스템에 대한 소비자 신뢰 연구',
          authors: '임혜빈',
          journal: 'Journal of Consumer Psychology',
          year: '2024',
          doi: ''
        },
        {
          id: 'a3',
          title: '세 번째 논문 제목 예시 — 식품 라벨과 소비자 구매 의도',
          authors: '이병관',
          journal: '소비자학연구',
          year: '2024',
          doi: ''
        }
      ],
      presentations: [
        {
          id: 'pr1',
          title: 'Consumer Responses to AI-Generated Advertisements',
          presenter: '발표자 추가 예정',
          venue: '학회명 추가 예정',
          year: '2025',
          type: '포스터 발표'
        },
        {
          id: 'pr2',
          title: '식품 선택 상황에서의 건강 메시지 효과',
          presenter: '발표자 추가 예정',
          venue: '한국소비자광고심리학회',
          year: '2024',
          type: '구두 발표'
        }
      ],
      awards: [
        {
          id: 'aw1',
          title: '수상내역 추가 예정',
          recipient: '수상자 추가 예정',
          venue: '기관명 추가 예정',
          year: '2026',
          desc: ''
        }
      ]
    }
  }
};

/* ---- 초기화 ---- */
function capInitData() {
  if (!localStorage.getItem('cap_members')) {
    localStorage.setItem('cap_members', JSON.stringify(CAP_DEFAULTS.members));
  } else {
    capApplyMemberCredentialMigrations();
  }
  if (!localStorage.getItem('cap_content')) {
    localStorage.setItem('cap_content', JSON.stringify(CAP_DEFAULTS.content));
  } else {
    capApplyContentMigrations();
  }
}

function capApplyMemberCredentialMigrations() {
  const members = JSON.parse(localStorage.getItem('cap_members') || '[]');
  let changed = false;
  members.forEach(member => {
    if (member.id === 'choi-hj' && !member.studentId) {
      member.studentId = '2022122708';
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem('cap_members', JSON.stringify(members));
  }
}

function capMergeDefaults(target, defaults) {
  Object.keys(defaults).forEach(key => {
    if (target[key] === undefined || target[key] === null) {
      target[key] = defaults[key];
    } else if (
      typeof target[key] === 'object' &&
      !Array.isArray(target[key]) &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      capMergeDefaults(target[key], defaults[key]);
    }
  });
  return target;
}

function capApplyContentMigrations() {
  const content = JSON.parse(localStorage.getItem('cap_content') || '{}');
  capMergeDefaults(content, CAP_DEFAULTS.content);
  if (content.pages) {
    Object.keys(content.pages).forEach(pageId => {
      const page = content.pages[pageId];
      if (page.titleStyle && page.titleStyle.color === '#183A5A') {
        page.titleStyle.color = '#FFFFFF';
      }
      if (page.descriptionStyle && page.descriptionStyle.color === '#667085') {
        page.descriptionStyle.color = '#D9E2EC';
      }
    });
  }
  localStorage.setItem('cap_content', JSON.stringify(content));
}

/* ---- CRUD ---- */
const CAPData = {
  /* Members */
  getMembers() {
    return JSON.parse(localStorage.getItem('cap_members') || '[]');
  },
  getMember(id) {
    return this.getMembers().find(m => m.id === id) || null;
  },
  updateMemberProfile(id, profileUpdates) {
    const members = this.getMembers();
    const idx = members.findIndex(m => m.id === id);
    if (idx === -1) return false;
    members[idx].profile = { ...members[idx].profile, ...profileUpdates };
    members[idx].updatedAt = new Date().toISOString();
    localStorage.setItem('cap_members', JSON.stringify(members));
    return true;
  },
  updateMember(id, updates) {
    const members = this.getMembers();
    const idx = members.findIndex(m => m.id === id);
    if (idx === -1) return false;
    members[idx] = { ...members[idx], ...updates };
    members[idx].updatedAt = new Date().toISOString();
    localStorage.setItem('cap_members', JSON.stringify(members));
    return true;
  },
  addMember(member) {
    const members = this.getMembers();
    member.id = member.id || 'member_' + Date.now();
    member.updatedAt = new Date().toISOString();
    members.push(member);
    localStorage.setItem('cap_members', JSON.stringify(members));
  },
  removeMember(id) {
    const members = this.getMembers().filter(m => m.id !== id);
    localStorage.setItem('cap_members', JSON.stringify(members));
  },

  /* Content */
  getContent() {
    return JSON.parse(localStorage.getItem('cap_content') || '{}');
  },
  updateHomeContent(updates) {
    const c = this.getContent();
    c.home = { ...c.home, ...updates };
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  getPageMeta(pageId) {
    const c = this.getContent();
    const fallback = CAP_DEFAULTS.content.pages?.[pageId] || {};
    return capMergeDefaults({ ...(c.pages?.[pageId] || {}) }, fallback);
  },
  updatePageMeta(pageId, updates) {
    const c = this.getContent();
    c.pages = c.pages || {};
    const current = this.getPageMeta(pageId);
    c.pages[pageId] = {
      ...current,
      ...updates,
      titleStyle: { ...(current.titleStyle || {}), ...(updates.titleStyle || {}) },
      descriptionStyle: { ...(current.descriptionStyle || {}), ...(updates.descriptionStyle || {}) }
    };
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  updateResearchAxis(axisId, updates) {
    const c = this.getContent();
    c.research = c.research || { axes: [] };
    const idx = c.research.axes.findIndex(a => a.id === axisId);
    if (idx !== -1) {
      c.research.axes[idx] = { ...c.research.axes[idx], ...updates };
      localStorage.setItem('cap_content', JSON.stringify(c));
    }
  },
  addResearchAxis(axis) {
    const c = this.getContent();
    c.research = c.research || { axes: [] };
    c.research.axes.push({
      id: 'axis_' + Date.now(),
      axisNum: c.research.axes.length + 1,
      title: axis.title || '새 연구 축',
      en: axis.en || 'New Research Axis',
      desc: axis.desc || '',
      tags: axis.tags || []
    });
    this.renumberResearchAxes(c);
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  removeResearchAxis(axisId) {
    const c = this.getContent();
    c.research = c.research || { axes: [] };
    c.research.axes = c.research.axes.filter(a => a.id !== axisId);
    this.renumberResearchAxes(c);
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  renumberResearchAxes(content) {
    if (!content.research || !content.research.axes) return;
    content.research.axes.forEach((a, idx) => { a.axisNum = idx + 1; });
  },

  /* Publications */
  getArticles() { return this.getContent().publications?.articles || []; },
  getPresentations() { return this.getContent().publications?.presentations || []; },
  getAwards() { return this.getContent().publications?.awards || []; },
  addArticle(item) {
    const c = this.getContent();
    c.publications = c.publications || {};
    c.publications.articles = c.publications.articles || [];
    c.publications.articles.unshift({ id: 'a_' + Date.now(), ...item });
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  removeArticle(id) {
    const c = this.getContent();
    c.publications = c.publications || {};
    c.publications.articles = c.publications.articles || [];
    c.publications.articles = c.publications.articles.filter(a => a.id !== id);
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  addPresentation(item) {
    const c = this.getContent();
    c.publications = c.publications || {};
    c.publications.presentations = c.publications.presentations || [];
    c.publications.presentations.unshift({ id: 'pr_' + Date.now(), ...item });
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  removePresentation(id) {
    const c = this.getContent();
    c.publications = c.publications || {};
    c.publications.presentations = c.publications.presentations || [];
    c.publications.presentations = c.publications.presentations.filter(p => p.id !== id);
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  addAward(item) {
    const c = this.getContent();
    c.publications = c.publications || {};
    c.publications.awards = c.publications.awards || [];
    c.publications.awards.unshift({ id: 'aw_' + Date.now(), ...item });
    localStorage.setItem('cap_content', JSON.stringify(c));
  },
  removeAward(id) {
    const c = this.getContent();
    c.publications = c.publications || {};
    c.publications.awards = c.publications.awards || [];
    c.publications.awards = c.publications.awards.filter(a => a.id !== id);
    localStorage.setItem('cap_content', JSON.stringify(c));
  },

  /* Reset (admin only) */
  resetToDefaults() {
    localStorage.setItem('cap_members', JSON.stringify(CAP_DEFAULTS.members));
    localStorage.setItem('cap_content', JSON.stringify(CAP_DEFAULTS.content));
  },

  /* Team Projects — internal helpers */
  _getLabData() {
    var raw = localStorage.getItem('cap_lab_data');
    var data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch(e) {}
    data.teamProjects = Array.isArray(data.teamProjects) ? data.teamProjects : [];
    return data;
  },
  _saveLabData(data) {
    localStorage.setItem('cap_lab_data', JSON.stringify(data));
  },

  /* Team Projects — CRUD */
  getTeamProjects() {
    return this._getLabData().teamProjects;
  },
  getTeamProject(id) {
    return this.getTeamProjects().find(function(p) { return p.id === id; }) || null;
  },
  addTeamProject(project) {
    var data = this._getLabData();
    project.id = 'project_' + Date.now();
    project.goals = Array.isArray(project.goals) ? project.goals : [];
    project.notes = Array.isArray(project.notes) ? project.notes : [];
    project.progress = Array.isArray(project.progress) ? project.progress : [];
    project.meetings = Array.isArray(project.meetings) ? project.meetings : [];
    project.status = project.status || 'active';
    project.createdAt = new Date().toISOString();
    project.updatedAt = new Date().toISOString();
    data.teamProjects.push(project);
    this._saveLabData(data);
    return project.id;
  },
  updateTeamProject(id, updates) {
    var data = this._getLabData();
    var idx = data.teamProjects.findIndex(function(p) { return p.id === id; });
    if (idx === -1) return false;
    data.teamProjects[idx] = Object.assign({}, data.teamProjects[idx], updates);
    data.teamProjects[idx].updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return true;
  },
  removeTeamProject(id) {
    var data = this._getLabData();
    data.teamProjects = data.teamProjects.filter(function(p) { return p.id !== id; });
    this._saveLabData(data);
  },
  getProjectsForMember(userId) {
    return this.getTeamProjects().filter(function(p) {
      return Array.isArray(p.memberIds) && p.memberIds.includes(userId);
    });
  },

  /* Project Goals */
  addProjectGoal(projectId, goal) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return null;
    goal.id = 'pgoal_' + Date.now();
    goal.createdAt = new Date().toISOString();
    goal.updatedAt = new Date().toISOString();
    project.goals = Array.isArray(project.goals) ? project.goals : [];
    project.goals.push(goal);
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return goal.id;
  },
  updateProjectGoal(projectId, goalId, updates) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return false;
    var idx = (project.goals || []).findIndex(function(g) { return g.id === goalId; });
    if (idx === -1) return false;
    project.goals[idx] = Object.assign({}, project.goals[idx], updates);
    project.goals[idx].updatedAt = new Date().toISOString();
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return true;
  },
  removeProjectGoal(projectId, goalId) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return;
    project.goals = (project.goals || []).filter(function(g) { return g.id !== goalId; });
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
  },

  /* Project Notes/Comments */
  addProjectNote(projectId, note) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return null;
    note.id = 'pnote_' + Date.now();
    note.done = !!note.done;
    note.createdAt = new Date().toISOString();
    note.updatedAt = new Date().toISOString();
    project.notes = Array.isArray(project.notes) ? project.notes : [];
    project.notes.push(note);
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return note.id;
  },
  updateProjectNote(projectId, noteId, updates) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return false;
    var idx = (project.notes || []).findIndex(function(n) { return n.id === noteId; });
    if (idx === -1) return false;
    project.notes[idx] = Object.assign({}, project.notes[idx], updates);
    project.notes[idx].updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return true;
  },
  removeProjectNote(projectId, noteId) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return;
    project.notes = (project.notes || []).filter(function(n) { return n.id !== noteId; });
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
  },

  /* Project Note Replies */
  addProjectNoteReply(projectId, noteId, reply) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return null;
    var note = (project.notes || []).find(function(n) { return n.id === noteId; });
    if (!note) return null;
    note.replies = Array.isArray(note.replies) ? note.replies : [];
    reply.id = 'preply_' + Date.now();
    reply.createdAt = new Date().toISOString();
    note.replies.push(reply);
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return reply.id;
  },
  removeProjectNoteReply(projectId, noteId, replyId) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return;
    var note = (project.notes || []).find(function(n) { return n.id === noteId; });
    if (!note) return;
    note.replies = (note.replies || []).filter(function(r) { return r.id !== replyId; });
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
  },

  /* Project Progress (per-member within project) */
  updateProjectProgress(projectId, memberId, status, memo) {
    var data = this._getLabData();
    var project = data.teamProjects.find(function(p) { return p.id === projectId; });
    if (!project) return false;
    project.progress = Array.isArray(project.progress) ? project.progress : [];
    var existing = project.progress.find(function(item) { return item.memberId === memberId; });
    if (existing) {
      existing.status = status;
      existing.memo = memo;
      existing.updatedAt = new Date().toISOString();
    } else {
      project.progress.push({ memberId: memberId, status: status, memo: memo, updatedAt: new Date().toISOString() });
    }
    project.updatedAt = new Date().toISOString();
    this._saveLabData(data);
    return true;
  }
};

window.CAP_DEFAULTS = CAP_DEFAULTS;
window.CAPData = CAPData;

capInitData();
