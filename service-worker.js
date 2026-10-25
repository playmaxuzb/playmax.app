const CACHE = 'playmax-app-v14';
const APP_SHELL = ['./', './index.html', './core.js', './viewer3d.js', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('playmax-app-') && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      } catch (_) {
        return (await cache.match(request)) || (await cache.match('./index.html'));
      }
    }
    // code/data: always try the network first so GitHub updates reach installed apps; images: cache first
    const isCode = /\.(js|json|webmanifest|html|css)$/i.test(new URL(request.url).pathname);
    if (!isCode) { const cached = await cache.match(request); if (cached) return cached; }
    try {
      const fresh = await fetch(request);
      if (fresh.ok) cache.put(request, fresh.clone());
      return fresh;
    } catch (_) {
      return (await cache.match(request)) || new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
