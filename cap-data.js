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
      studentId: '',
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
  }
  if (!localStorage.getItem('cap_content')) {
    localStorage.setItem('cap_content', JSON.stringify(CAP_DEFAULTS.content));
  }
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
  }
};

capInitData();
