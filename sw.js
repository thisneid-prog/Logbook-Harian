const CACHE_NAME = 'ppl-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Menginstal Service Worker dan menyimpan file ke dalam memori Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache berhasil dibuka');
            return cache.addAll(urlsToCache);
        })
    );
});

// Mengambil file dari Cache jika sedang offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Jika ada di cache, gunakan itu. Jika tidak, ambil dari internet.
            return response || fetch(event.request);
        })
    );
});
