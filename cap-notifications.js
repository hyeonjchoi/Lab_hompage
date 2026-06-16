/**
 * cap-notifications.js — local PWA notification helpers.
 * Current reminders are based on this device's local LAB data.
 */

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
      eventHours: 24,
      urgentEventHours: 1,
      goalDays: 2,
      feedback: true,
      ...saved
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
    const permission = await Notification.requestPermission();
    const settings = this.getSettings();
    settings.enabled = permission === 'granted';
    this.saveSettings(settings);
    if (settings.enabled) {
      await navigator.serviceWorker.ready;
      showToast('알림을 켰습니다.');
      this.scanAndNotify();
    } else {
      showToast('알림 권한이 허용되지 않았습니다.');
    }
    this.renderNavButton();
  },

  disable() {
    const settings = this.getSettings();
    settings.enabled = false;
    this.saveSettings(settings);
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

  // 교수/관리자만 알림 세부 설정(알림 시점, 피드백 포함 여부)을 변경할 수 있음
  canConfigure() {
    return !!(window.CAPAuth && CAPAuth.isAdmin && CAPAuth.isAdmin());
  },

  openSettings() {
    if (!this.canConfigure()) return;
    this.closeSettings();
    const s = this.getSettings();
    const overlay = document.createElement('div');
    overlay.className = 'notif-settings-overlay';
    overlay.id = 'notif-settings-overlay';
    overlay.innerHTML =
      '<div class="notif-settings-panel inline-form">' +
        '<h4>알림 세부 설정</h4>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>일정 알림 (몇 시간 전)</label>' +
            '<input type="number" min="1" id="ns-eventHours" value="' + s.eventHours + '"></div>' +
          '<div class="form-group"><label>긴급 일정 알림 (몇 시간 전)</label>' +
            '<input type="number" min="1" id="ns-urgentEventHours" value="' + s.urgentEventHours + '"></div>' +
        '</div>' +
        '<div class="form-group"><label>목표 마감 알림 (며칠 전)</label>' +
          '<input type="number" min="1" id="ns-goalDays" value="' + s.goalDays + '"></div>' +
        '<div class="form-group">' +
          '<label style="display:flex;align-items:center;gap:8px;">' +
            '<input type="checkbox" id="ns-feedback" style="width:auto;margin:0;"' + (s.feedback ? ' checked' : '') + '> 피드백 알림 포함' +
          '</label>' +
        '</div>' +
        '<button class="save-btn" type="button" onclick="CAPNotifications.saveSettingsFromPanel()">저장</button>' +
        '<button class="btn-sm" type="button" style="margin-left:8px" onclick="CAPNotifications.closeSettings()">취소</button>' +
      '</div>';
    overlay.addEventListener('click', e => { if (e.target === overlay) this.closeSettings(); });
    document.body.appendChild(overlay);
  },

  closeSettings() {
    const overlay = document.getElementById('notif-settings-overlay');
    if (overlay) overlay.remove();
  },

  saveSettingsFromPanel() {
    const settings = this.getSettings();
    settings.eventHours = Math.max(1, parseInt(document.getElementById('ns-eventHours').value, 10) || settings.eventHours);
    settings.urgentEventHours = Math.max(1, parseInt(document.getElementById('ns-urgentEventHours').value, 10) || settings.urgentEventHours);
    settings.goalDays = Math.max(1, parseInt(document.getElementById('ns-goalDays').value, 10) || settings.goalDays);
    settings.feedback = document.getElementById('ns-feedback').checked;
    this.saveSettings(settings);
    this.closeSettings();
    if (window.showToast) showToast('알림 설정이 저장되었습니다.');
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
    const registration = await navigator.serviceWorker.ready;
    return registration.showNotification(reminder.title, {
      body: reminder.body,
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      tag: force ? reminder.id : 'cap-' + reminder.id,
      renotify: false,
      data: { url: reminder.url || 'lab.html' }
    });
  },

  buildReminderList(options) {
    options = options || {};
    const data = this.labData || this.readLabData();
    const settings = this.getSettings();
    const session = window.CAPAuth && CAPAuth.getSession ? CAPAuth.getSession() : null;
    const now = new Date();
    const reminders = [];

    (data.events || []).forEach(event => {
      const eventAt = this.parseDateTime(event.date, event.startTime);
      if (!eventAt) return;
      const hours = (eventAt - now) / 36e5;
      const typeLabel = event.type === 'meeting' ? '미팅' : event.type === 'conference' ? '학회/모임' : '일정';
      if (hours >= 0 && hours <= settings.eventHours) {
        reminders.push({
          id: 'event24_' + event.id + '_' + event.date,
          kind: typeLabel,
          title: event.title || '다가오는 일정',
          body: this.formatRelativeTime(eventAt) + ' · ' + this.formatDateTime(event),
          url: 'lab.html'
        });
      }
      if (hours >= 0 && hours <= settings.urgentEventHours) {
        reminders.push({
          id: 'event1_' + event.id + '_' + event.date,
          kind: '긴급 일정',
          title: event.title || '곧 시작되는 일정',
          body: '곧 시작합니다 · ' + this.formatDateTime(event),
          url: 'lab.html'
        });
      }
    });

    if (session) {
      (data.memberGoals || []).forEach(goal => {
        if (goal.memberId !== session.userId || goal.status === 'done') return;
        const endAt = this.parseDateTime(goal.endDate || goal.targetDate, '18:00');
        if (!endAt) return;
        const days = (endAt - now) / 864e5;
        if (days >= 0 && days <= settings.goalDays) {
          reminders.push({
            id: 'goal_' + goal.id + '_' + (goal.endDate || goal.targetDate),
            kind: '목표 마감',
            title: goal.title || '연구 목표 마감 임박',
            body: this.formatRelativeTime(endAt) + '까지 · ' + (goal.memo || goal.category || '목표를 확인하세요.'),
            url: 'lab-member.html?id=' + encodeURIComponent(session.userId)
          });
        }
      });

      if (settings.feedback) {
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
