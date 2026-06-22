/**
 * cap-notifications.js — Web Push 구독 관리 + (보조용) 로컬 알림 헬퍼.
 * 실제 알림 발송은 서버(Edge Function + DB 트리거/cron)가 담당하며,
 * 이 파일은 "알림 허용" 클릭 시 이 기기를 push_subscriptions에 등록/해지하는 역할을 한다.
 */

// supabase/functions/_shared/push.ts 의 VAPID_PRIVATE_KEY와 짝을 이루는 공개키 (공개되어도 안전)
const VAPID_PUBLIC_KEY = 'BL3h0AMJexi3nUJSEUCoNJEDR0eWElH_i81jkE9cEqpKLAUsjsFEOG7FSOtxzrY31r8Zhn8_FbCNU8h7Q2owzIU';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

// 각 타이밍 옵션의 설명과 알림 창 정의
// KST 자연어 날짜·시간 (서버 formatKSTDatetime과 동일 로직)
function formatKSTDatetime(dateStr, timeStr) {
  var timeShort = (timeStr || '09:00').slice(0, 5);
  var at = new Date(dateStr + 'T' + timeShort + ':00+09:00');
  if (isNaN(at.getTime())) return dateStr;
  var nowKST = new Date(Date.now() + 9 * 3600 * 1000);
  var todayKST    = nowKST.toISOString().slice(0, 10);
  var tomorrowKST = new Date(nowKST.getTime() + 864e5).toISOString().slice(0, 10);
  var hKST = at.getUTCHours() + 9;
  var m    = at.getUTCMinutes();
  var ampm = hKST < 12 ? '오전' : '오후';
  var h12  = hKST % 12 || 12;
  var mStr = ':' + String(m).padStart(2, '0');
  var timeLabel = ampm + ' ' + h12 + mStr;
  if (dateStr === todayKST)    return '오늘 ' + timeLabel;
  if (dateStr === tomorrowKST) return '내일 ' + timeLabel;
  return dateStr.slice(5).replace('-', '/') + ' ' + timeLabel;
}

// 서버(push-reminders) 창과 일치: [low, high) 구간이 겹치지 않음.
const TIMING_DEFS = {
  day1:     { label: '1일 전',       low: 1380, high: 1500 },
  morning9: { label: '당일 오전 9시', special: 'morning9' },
  min30:    { label: '30분 전',       low: 27,   high: 33 },
  min15:    { label: '15분 전',       low: 12,   high: 18 },
  min5:     { label: '5분 전',        low: 5,    high: 10 },
  atStart:  { label: '시작 시간',     low: 0,    high: 5 },
};

const CAPNotifications = {
  SETTINGS_KEY: 'cap_notification_settings',
  SENT_KEY: 'cap_notification_sent',

  getSettings() {
    const raw = localStorage.getItem(this.SETTINGS_KEY);
    let saved = {};
    try {
      saved = raw ? JSON.parse(raw) : {};
    } catch (err) {
      saved = {};
    }
    return {
      enabled: false,
      types: {
        class: true,
        meeting: true,
        conference: true,
        goal: true,
        feedback: true,
      },
      timings: ['day1', 'atStart'],
      // 하위 호환 legacy 필드
      eventHours: 24,
      urgentEventHours: 1,
      goalDays: 2,
      feedback: true,
      ...saved,
      // types 객체는 deep merge
      types: Object.assign(
        { class: true, meeting: true, conference: true, goal: true, feedback: true },
        saved.types || {}
      ),
    };
  },

  saveSettings(settings) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  },

  getSent() {
    const raw = localStorage.getItem(this.SENT_KEY);
    try {
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  },

  saveSent(sent) {
    localStorage.setItem(this.SENT_KEY, JSON.stringify(sent));
  },

  isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  },

  async enable() {
    if (!this.isSupported()) {
      showToast('이 브라우저는 알림을 지원하지 않습니다.');
      this.renderNavButton();
      return;
    }
    const session = window.CAPAuth && CAPAuth.getSession();
    if (!session) {
      showToast('로그인 후 알림을 켤 수 있습니다.');
      return;
    }
    const permission = await Notification.requestPermission();
    const settings = this.getSettings();
    settings.enabled = permission === 'granted';
    this.saveSettings(settings);
    if (settings.enabled) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
        await CAPData.addPushSubscription(session.userId, subscription);
        showToast('알림을 켰습니다.');
      } catch (e) {
        showToast('알림 등록에 실패했습니다: ' + e.message);
        settings.enabled = false;
        this.saveSettings(settings);
      }
    } else {
      showToast('알림 권한이 허용되지 않았습니다.');
    }
    this.renderNavButton();
  },

  async disable() {
    const settings = this.getSettings();
    settings.enabled = false;
    this.saveSettings(settings);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await CAPData.removePushSubscription(subscription.endpoint);
        await subscription.unsubscribe();
      }
    } catch (e) { /* 구독 해지 실패는 조용히 무시 — 다음 enable 시 upsert로 정리됨 */ }
    this.renderNavButton();
    showToast('알림을 껐습니다.');
  },

  toggle() {
    const settings = this.getSettings();
    if (settings.enabled && this.isSupported() && Notification.permission === 'granted') {
      this.disable();
      return;
    }
    this.enable();
  },

  getNavLabel() {
    if (!this.isSupported()) return '알림 불가';
    const settings = this.getSettings();
    if (Notification.permission === 'denied') return '알림 차단됨';
    return settings.enabled && Notification.permission === 'granted' ? '알림 끄기' : '알림 허용';
  },

  renderNavButton() {
    if (window.CAPAuth && CAPAuth.renderNav) CAPAuth.renderNav();
    document.querySelectorAll('.nav-notification').forEach(button => {
      button.textContent = this.getNavLabel();
      button.disabled = !this.isSupported();
    });
  },

  async sendTest() {
    if (!this.isSupported() || Notification.permission !== 'granted') {
      await this.enable();
      if (Notification.permission !== 'granted') return;
    }
    await this.show({
      id: 'test_' + Date.now(),
      title: 'KW CAP Lab 알림 테스트',
      body: '알림이 정상적으로 표시됩니다.',
      url: 'lab.html'
    }, true);
  },

  init(labData, options) {
    this.labData = labData || this.readLabData();
    this.options = options || {};
    this.renderNavButton();
    this.scanAndNotify();
  },

  readLabData() {
    try {
      const data = JSON.parse(localStorage.getItem('cap_lab_data') || '{}');
      data.events = Array.isArray(data.events) ? data.events : [];
      data.memberGoals = Array.isArray(data.memberGoals) ? data.memberGoals : [];
      data.memberNotes = Array.isArray(data.memberNotes) ? data.memberNotes : [];
      return data;
    } catch (err) {
      return { events: [], memberGoals: [], memberNotes: [] };
    }
  },

  async scanAndNotify() {
    const settings = this.getSettings();
    if (!settings.enabled || !this.isSupported() || Notification.permission !== 'granted') return;
    const due = this.buildReminderList({ dueOnly: true });
    const sent = this.getSent();
    for (const reminder of due) {
      if (sent[reminder.id]) continue;
      await this.show(reminder);
      sent[reminder.id] = new Date().toISOString();
    }
    this.saveSent(sent);
  },

  async show(reminder, force) {
    const settings = this.getSettings();
    const registration = await navigator.serviceWorker.ready;
    const notifOptions = {
      body: reminder.body,
      icon: 'icons/icon-192.png',
      tag: force ? reminder.id : 'cap-' + reminder.id,
      renotify: false,
      data: { url: reminder.url || 'lab.html' }
    };
    return registration.showNotification(reminder.title, notifOptions);
  },

  buildReminderList(options) {
    options = options || {};
    const data = this.labData || this.readLabData();
    const settings = this.getSettings();
    const types = settings.types || {};
    const timings = Array.isArray(settings.timings) && settings.timings.length > 0
      ? settings.timings
      : ['day1'];
    const session = window.CAPAuth && CAPAuth.getSession ? CAPAuth.getSession() : null;
    const now = new Date();
    const reminders = [];

    (data.events || []).forEach(event => {
      const eventType = event.type || 'meeting';
      if (types[eventType] === false) return;

      const eventAt = this.parseDateTime(event.date, event.startTime);
      if (!eventAt) return;

      const minutesUntil = (eventAt - now) / 60000;
      const typeLabel = eventType === 'meeting' ? '미팅' : eventType === 'conference' ? '학회/모임' : '일정';
      const dtLabel = formatKSTDatetime(event.date, event.startTime || '09:00');

      timings.forEach(timing => {
        const def = TIMING_DEFS[timing];
        if (!def) return;

        if (def.special === 'morning9') {
          // 당일 오전 9:00~9:14 사이에 접속했을 때 알림 (서버 창과 동일)
          const nowKST = new Date(now.getTime() + 9 * 3600 * 1000);
          const todayKST = nowKST.toISOString().slice(0, 10);
          if (event.date === todayKST) {
            const totalMin = nowKST.getUTCHours() * 60 + nowKST.getUTCMinutes();
            if (totalMin >= 9 * 60 && totalMin < 9 * 60 + 14) {
              reminders.push({
                id: 'event_morning9_' + event.id + '_' + event.date,
                kind: typeLabel,
                title: (event.title || '오늘의 일정') + ' · ' + dtLabel,
                body: '오늘의 일정 · ' + typeLabel,
                url: 'lab.html'
              });
            }
          }
        } else {
          if (minutesUntil >= def.low && minutesUntil < def.high) {
            reminders.push({
              id: 'event_' + timing + '_' + event.id + '_' + event.date,
              kind: typeLabel,
              title: (event.title || '다가오는 일정') + ' · ' + dtLabel,
              body: def.label + ' · ' + typeLabel,
              url: 'lab.html'
            });
          }
        }
      });
    });

    if (session) {
      if (types.goal !== false) {
        (data.memberGoals || []).forEach(goal => {
          if (goal.memberId !== session.userId || goal.status === 'done') return;
          const endAt = this.parseDateTime(goal.endDate || goal.targetDate, '18:00');
          if (!endAt) return;
          const days = (endAt - now) / 864e5;
          if (days >= 0 && days <= (settings.goalDays || 2)) {
            reminders.push({
              id: 'goal_' + goal.id + '_' + (goal.endDate || goal.targetDate),
              kind: '목표 마감',
              title: goal.title || '연구 목표 마감 임박',
              body: this.formatRelativeTime(endAt) + '까지 · ' + (goal.memo || goal.category || '목표를 확인하세요.'),
              url: 'lab-member.html?id=' + encodeURIComponent(session.userId)
            });
          }
        });
      }

      if (types.feedback !== false) {
        (data.memberNotes || []).forEach(note => {
          if (note.memberId !== session.userId || note.type !== 'feedback' || note.done) return;
          reminders.push({
            id: 'feedback_' + note.id,
            kind: '피드백',
            title: '새 피드백이 있습니다',
            body: (note.authorName ? note.authorName + ' · ' : '') + (note.text || '').slice(0, 80),
            url: 'lab-member.html?id=' + encodeURIComponent(session.userId)
          });
        });
      }
    }

    reminders.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    if (options.dueOnly) return reminders;
    return reminders;
  },

  parseDateTime(dateValue, timeValue) {
    if (!dateValue) return null;
    const time = timeValue || '09:00';
    const date = new Date(dateValue + 'T' + time);
    return isNaN(date.getTime()) ? null : date;
  },

  formatDateTime(event) {
    const time = event.startTime ? ' ' + event.startTime : '';
    return event.date + time;
  },

  formatRelativeTime(date) {
    const diffMinutes = Math.max(0, Math.round((date - new Date()) / 60000));
    if (diffMinutes < 60) return diffMinutes + '분 후';
    const hours = Math.round(diffMinutes / 60);
    if (hours < 24) return hours + '시간 후';
    return Math.round(hours / 24) + '일 후';
  }
};

window.CAPNotifications = CAPNotifications;

document.addEventListener('DOMContentLoaded', function () {
  CAPNotifications.renderNavButton();
});
