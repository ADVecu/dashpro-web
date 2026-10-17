/*
 * Service worker: makes the app open offline and update itself.
 * Bump CACHE_VERSION on every release so clients pick up the new files.
 */
const CACHE_VERSION = 'dashpro-v6';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/logo-amarillo.png',
  './icons/logo-rojo.png',
  './fonts/barlow-latin-400-normal.woff2',
  './fonts/barlow-latin-500-normal.woff2',
  './fonts/barlow-latin-600-normal.woff2',
  './fonts/chakra-petch-latin-600-normal.woff2',
  './fonts/chakra-petch-latin-700-normal.woff2',
  './fonts/chakra-petch-latin-700-italic.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* The page asks the new worker to take over when the user clicks "Recargar" */
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

/* Stale-while-revalidate for same-origin GETs: answer from cache, refresh in background */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
