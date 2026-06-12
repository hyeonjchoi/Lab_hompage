const CACHE_NAME = 'kw-cap-lab-v3';
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

  // Supabase API 요청: 항상 네트워크 우선 (캐시 안 함)
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 자주 바뀌는 화면/인증 파일은 모바일 캐시가 오래 남지 않도록 네트워크 우선
  if (
    event.request.method === 'GET' &&
    (url.pathname.endsWith('.html') ||
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
      }).catch(() => caches.match(event.request))
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
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match(`${BASE_PATH}/index.html`);
          }
        });
      })
    );
  }
});
