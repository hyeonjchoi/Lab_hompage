/**
 * cap-auth.js — KW CAP Lab 인증 레이어
 * 세션은 sessionStorage에 저장 (탭 닫으면 자동 로그아웃)
 * cap-data.js 이후에 로드해야 한다.
 */

const CAPAuth = {
  /**
   * 로그인: 이름 + 학번으로 검증
   * @returns {{ success: boolean, user?: object, error?: string }}
   */
  login(name, studentId) {
    if (!name || !studentId) {
      return { success: false, error: '이름과 학번을 모두 입력해주세요.' };
    }
    const members = CAPData.getMembers();
    const user = members.find(
      m => m.name.trim() === name.trim() && m.studentId.trim() === studentId.trim()
    );
    if (!user) {
      return { success: false, error: '이름 또는 학번이 일치하지 않습니다.' };
    }
    sessionStorage.setItem('cap_session', JSON.stringify({
      userId: user.id,
      name: user.name,
      role: user.role
    }));
    return { success: true, user };
  },

  logout() {
    sessionStorage.removeItem('cap_session');
  },

  getSession() {
    const raw = sessionStorage.getItem('cap_session');
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  isAdmin() {
    const s = this.getSession();
    return s && s.role === 'admin';
  },

  requireAdmin() {
    if (!this.isAdmin()) {
      window.location.href = 'index.html';
    }
  },

  requireLogin(redirectBack) {
    if (!this.isLoggedIn()) {
      const dest = redirectBack
        ? 'login.html?redirect=' + encodeURIComponent(window.location.href)
        : 'login.html';
      window.location.href = dest;
    }
  },

  /** 모든 페이지 nav의 #nav-auth 요소를 채운다 */
  renderNav() {
    const navAuth = document.getElementById('nav-auth');
    const session = this.getSession();
    document.querySelectorAll('.lab-nav-link').forEach(link => {
      link.hidden = !session;
    });
    if (!navAuth) return;
    if (session) {
      const labPageHref = session.role === 'admin'
        ? 'lab.html'
        : 'lab-member.html?id=' + encodeURIComponent(session.userId);
      navAuth.innerHTML =
        '<div class="nav-auth-stack">' +
          '<div class="nav-auth-row">' +
            '<span class="nav-user-name">' + escHtml(session.name) + '</span>' +
            '<a href="member-dashboard.html">내 프로필</a>' +
            '<a href="' + labPageHref + '">내 연구페이지</a>' +
          '</div>' +
          '<div class="nav-auth-row secondary">' +
            (session.role === 'admin' ? '<a class="nav-admin-link" href="admin.html">관리자</a>' : '') +
            (window.CAPNotifications ? '<button class="nav-notification" type="button" onclick="CAPNotifications.toggle()">' + escHtml(CAPNotifications.getNavLabel()) + '</button>' : '') +
            '<button class="nav-logout" onclick="CAPAuth.logout();window.location.reload();">로그아웃</button>' +
          '</div>' +
        '</div>';
    } else {
      navAuth.innerHTML = '<a class="nav-login-btn" href="login.html">로그인</a>';
    }
  }
};

var CAPAvatar = {
  defaults: {
    enabled: false,
    gender: 'female',
    face: 'round',
    expression: 'smile',
    background: 'blue',
    accessory: 'none'
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
    const bg = {
      blue: '#EAF2F8',
      red: '#FCE8EA',
      green: '#EAF7EF',
      gray: '#F1F3F5',
      navy: '#DDE8EF',
      lavender: '#EFEAFE'
    }[o.background];
    const accent = o.background === 'red' ? '#B51F2B' : '#183A5A';
    const hair = o.gender === 'female'
      ? '<path d="M24 44q0-29 26-29t26 29v20q-8-7-14-16-11 11-31 10-3 8-7 12z" fill="' + accent + '" opacity="0.96"/>'
      : '<path d="M27 36q8-19 23-19t23 19q-10-7-23-7t-23 7z" fill="' + accent + '" opacity="0.96"/>';
    const faceShape = {
      round: '<circle cx="50" cy="48" r="27" fill="#FFE2C4" stroke="#183A5A" stroke-width="3"/>',
      soft: '<rect x="24" y="21" width="52" height="58" rx="21" fill="#FFE2C4" stroke="#183A5A" stroke-width="3"/>',
      long: '<ellipse cx="50" cy="50" rx="24" ry="32" fill="#FFE2C4" stroke="#183A5A" stroke-width="3"/>'
    }[o.face];
    const eyes = o.expression === 'confident'
      ? '<path d="M35 43h10M55 43h10" stroke="#183A5A" stroke-width="4" stroke-linecap="round"/>'
      : '<circle cx="39" cy="44" r="3" fill="#183A5A"/><circle cx="61" cy="44" r="3" fill="#183A5A"/>';
    const mouth = {
      smile: '<path d="M39 58q11 12 22 0" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>',
      calm: '<path d="M41 59h18" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>',
      focus: '<path d="M43 59q7 4 14 0" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>',
      confident: '<path d="M40 58q10 8 20 0" fill="none" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>'
    }[o.expression];
    const accessory = {
      none: '',
      glasses: '<circle cx="39" cy="44" r="9" fill="none" stroke="#183A5A" stroke-width="3"/><circle cx="61" cy="44" r="9" fill="none" stroke="#183A5A" stroke-width="3"/><path d="M48 44h4" stroke="#183A5A" stroke-width="3"/>',
      book: '<rect x="14" y="68" width="24" height="18" rx="3" fill="#fff" stroke="#B51F2B" stroke-width="3"/><path d="M26 68v18" stroke="#B51F2B" stroke-width="2"/>',
      microscope: '<path d="M70 70h15M78 50l9 13M70 48l8-8" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/><circle cx="67" cy="51" r="6" fill="#fff" stroke="#B51F2B" stroke-width="3"/>',
      laptop: '<rect x="64" y="67" width="24" height="15" rx="3" fill="#fff" stroke="#B51F2B" stroke-width="3"/><path d="M60 84h32" stroke="#B51F2B" stroke-width="4" stroke-linecap="round"/>'
    }[o.accessory];

    return '<svg class="avatar avatar-character" viewBox="0 0 100 100" role="img" aria-label="' + escHtml(label || '캐릭터 아바타') + '">' +
      '<rect width="100" height="100" rx="50" fill="' + bg + '"/>' +
      hair + faceShape + eyes + mouth + accessory +
      '</svg>';
  }
};

/** HTML 특수문자 이스케이프 */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 토스트 메시지 */
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

document.addEventListener('DOMContentLoaded', function () {
  setupMobileNav();
  CAPAuth.renderNav();
});

function setupMobileNav() {
  const shell = document.querySelector('.nav-shell');
  const nav = document.querySelector('.nav-links');
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
