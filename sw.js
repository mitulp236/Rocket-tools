/* Rocket Tools service worker — caches the app shell + pinned CDN assets so
   the suite installs and works offline. PeerDrop has its own worker scoped to
   /peerdrop/. All tool data lives in localStorage, never here. */

const CACHE = 'rocket-tools-v7';
const SHELL = [
  './',
  './index.html',
  './vault.html',
  './whiteboard.html',
  './notes.html',
  './todo.html',
  './json.html',
  './markdown.html',
  './image.html',
  './pdf.html',
  './color.html',
  './csv.html',
  './qr.html',
  './record.html',
  './sandbox.html',
  './diagram.html',
  './meet.html',
  './peerdrop.html',
  './theme.css',
  './manifest.webmanifest',
  './icon.svg',
  './icon-maskable.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    // network-first so updates land; cache fallback for offline
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() =>
          caches.match(event.request, { ignoreSearch: true })
            .then((hit) => hit || caches.match('./index.html'))
        )
    );
    return;
  }

  // version-pinned CDN assets: cache-first
  event.respondWith(
    caches.match(event.request).then(
      (hit) =>
        hit ||
        fetch(event.request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
    )
  );
});
