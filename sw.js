const APP_CACHE = 'pokemon-kartenalbum-app-v15';
const CONTENT_CACHE = 'pokemon-kartenalbum-content-v15';
const APP_FILES = ['./','./index.html','./styles.css?v=15','./app.js?v=15','./manifest.webmanifest','./icon.svg','./apple-touch-icon.png','./icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => ![APP_CACHE, CONTENT_CACHE].includes(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function cacheFirst(request) {
  const hit = await caches.match(request);
  if (hit) return hit;
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) {
      const cache = await caches.open(CONTENT_CACHE);
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (error) {
    const url = new URL(request.url);
    if (url.pathname.endsWith('/high.webp')) {
      const fallback = new Request(request.url.replace('/high.webp', '/low.webp'), { mode: 'no-cors' });
      const low = await caches.match(fallback) || await caches.match(fallback.url);
      if (low) return low;
    }
    throw error;
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(APP_CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      }).catch(() => caches.match('./index.html')))
    );
    return;
  }
  if (url.hostname.includes('tcgdex.net') || url.hostname.includes('limitlesstcg') || url.hostname.includes('deckshop.de') || url.hostname.includes('lotticards.de')) event.respondWith(cacheFirst(event.request));
});
