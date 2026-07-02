const CACHE_NAME = 'kw-cap-lab-v20';
const BASE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, '');

const PRECACHE_ASSETS = [
  'index.html',
  'people.html',
  'research.html',
  'publications.html',
  'reservation.html',
  'join.html',
  'login.html',
  'style.css',
  'cap-auth.js',
  'cap-notifications.js',
  'cap-page-meta.js',
  'cap-data.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
].map(path => `${BASE_PATH}/${path}`);

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 서버(Edge Function)가 보낸 Web Push 수신 — 앱이 닫혀 있어도 동작한다
self.addEventListener('push', event => {
  let data = { title: 'KW CAP Lab', body: '새 알림이 있습니다.' };
  try { if (event.data) data = event.data.json(); } catch (e) { /* keep default */ }
  const tag = data.tag || ('cap-push-' + (data.title || '').replace(/\s/g, '').slice(0, 24));
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icons/icon-192.png',
      tag: tag,
      renotify: false,
      data: { url: data.url || 'lab.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : 'lab.html';
  const url = new URL(targetUrl, self.registration.scope).href;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client && client.url === url) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for API/Supabase, cache-first for static assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // http(s) 이외 스킴(chrome-extension: 등)은 Cache API가 지원하지 않으므로 가로채지 않는다.
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Supabase API 요청: 항상 네트워크 우선 (캐시 안 함)
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 자주 바뀌는 화면/인증 파일은 모바일 캐시가 오래 남지 않도록 네트워크 우선.
  // 홈 화면(standalone)에서 첫 진입 시 요청되는 "/" 같은 루트 내비게이션도
  // (확장자가 없어 .html로 안 끝남) 반드시 이 분기를 타야 한다 — 그래야 네트워크
  // 요청이 실패해도 캐시된 index.html로 안전하게 복구된다.
  if (
    event.request.method === 'GET' &&
    (event.request.mode === 'navigate' ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js'))
  ) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match(`${BASE_PATH}/index.html`)))
    );
    return;
  }

  // 정적 에셋: cache-first
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // HTML 페이지는 캐시에 저장
          if (response.ok && (
            event.request.url.endsWith('.html') ||
            event.request.url.endsWith('.css') ||
            event.request.url.endsWith('.js') ||
            event.request.url.endsWith('.png')
          )) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          // 오프라인 시 캐시된 index.html 반환
          if ((event.request.headers.get('accept') || '').includes('text/html')) {
            return caches.match(`${BASE_PATH}/index.html`);
          }
        });
      })
    );
  }
});
