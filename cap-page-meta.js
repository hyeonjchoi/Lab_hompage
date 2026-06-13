/**
 * cap-page-meta.js — page hero title/description renderer.
 * Reads editable page metadata from CAPData and applies a small allowlist of styles.
 */

const CAPPageMeta = (function () {
  const DEFAULT_PAGE_META = {
    people: {
      eyebrow: 'People',
      title: '구성원',
      description: '기본 프로필은 이모지 아바타로 제공하며, 사진과 이메일은 희망자에 한해 공개합니다.\n로그인한 구성원은 자신의 카드에서 직접 정보를 수정할 수 있습니다.',
      titleStyle: { color: '#ffffff', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
      descriptionStyle: { color: '#ffffff', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
    },
    research: {
      eyebrow: 'Research Areas',
      title: '진행 연구',
      description: '소비자가 광고, 서비스, AI 기반 상호작용에서 어떻게 생각하고 느끼며 행동하는지 탐구합니다.',
      titleStyle: { color: '#ffffff', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
      descriptionStyle: { color: '#ffffff', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
    },
    publications: {
      eyebrow: 'Publications',
      title: '연구 성과',
      description: '논문은 DOI와 저널 링크를 우선 제공합니다. 가능한 경우 학교 도서관 사이트와 연동합니다.',
      titleStyle: { color: '#ffffff', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
      descriptionStyle: { color: '#ffffff', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
    },
    reservation: {
      eyebrow: 'RSVN',
      title: '실험실 예약',
      description: '광운대학교 산업심리학과 학생 전용 실험실습실, 한울관 105호 예약 안내입니다.',
      titleStyle: { color: '#ffffff', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
      descriptionStyle: { color: '#ffffff', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
    },
    join: {
      eyebrow: 'Join Us',
      title: '지원하기',
      description: '대학원생 지원과 학부연구생 RA 모집은 절차가 다릅니다. 아래 안내를 확인하신 후 지원해 주세요.',
      titleStyle: { color: '#ffffff', fontWeight: '900', fontStyle: 'normal', textAlign: 'left' },
      descriptionStyle: { color: '#ffffff', fontWeight: '400', fontStyle: 'normal', textAlign: 'left' }
    }
  };

  const STYLE_ALLOWLIST = {
    color: /^#[0-9a-fA-F]{6}$/,
    fontSize: /^\d{1,2}(\.\d{1,2})?rem$/,
    fontWeight: /^(400|700|800|900)$/,
    fontStyle: /^(normal|italic)$/,
    textAlign: /^(left|center|right)$/
  };

  function applyStyle(el, style) {
    if (!el || !style) return;
    Object.keys(STYLE_ALLOWLIST).forEach(function (key) {
      var value = style[key];
      if (value && STYLE_ALLOWLIST[key].test(String(value))) {
        el.style[key] = value;
      }
    });
  }

  function mergeMeta(base, saved) {
    saved = saved || {};
    return {
      ...base,
      ...saved,
      titleStyle: { ...(base.titleStyle || {}), ...(saved.titleStyle || {}) },
      descriptionStyle: { ...(base.descriptionStyle || {}), ...(saved.descriptionStyle || {}) }
    };
  }

  function readMeta(pageId) {
    var fallback = DEFAULT_PAGE_META[pageId] || {};
    var dataApi = window.CAPData || (typeof CAPData !== 'undefined' ? CAPData : null);
    if (dataApi && typeof dataApi.getPageMeta === 'function') {
      return mergeMeta(fallback, dataApi.getPageMeta(pageId));
    }
    try {
      var content = JSON.parse(localStorage.getItem('cap_content') || '{}');
      return mergeMeta(fallback, content.pages && content.pages[pageId]);
    } catch (err) {
      return fallback;
    }
  }

  function setMultilineText(el, text) {
    if (!el) return;
    el.textContent = '';
    String(text || '').split('\n').forEach(function (line, idx) {
      if (idx) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(line));
    });
  }

  function apply(pageId) {
    if (!pageId) return;
    var meta = readMeta(pageId);
    if (!meta) return;

    var root = document.querySelector('.page-hero-inner');
    if (!root) return;

    var eyebrow = root.querySelector('.tagline');
    var title = root.querySelector('h1');
    var description = root.querySelector('p');

    if (eyebrow) eyebrow.textContent = meta.eyebrow || '';
    if (title) title.textContent = meta.title || '';
    setMultilineText(description, meta.description || '');

    applyStyle(title, meta.titleStyle);
    applyStyle(description, meta.descriptionStyle);

    if (meta.title) {
      document.title = meta.title + ' | KW CAP Lab';
    }
  }

  return { apply: apply };
})();

window.CAPPageMeta = CAPPageMeta;

document.addEventListener('DOMContentLoaded', function () {
  try {
    var pageId = document.body && document.body.getAttribute('data-page-id');
    if (pageId) CAPPageMeta.apply(pageId);
  } catch (err) {
    console.warn('Page metadata could not be applied.', err);
  }
});
