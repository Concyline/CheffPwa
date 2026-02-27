const CACHE_NAME = 'meuapp-cache-v1.4';

const urlsToCache = [
    '/',                     // raiz
    '/index.html',           // SPA principal
    '/offline.html',         // página para quando estiver offline
    '/manifest.json',
    '/img/icon-192.png',
    '/img/icon-512.png',
    '/img/icon-maskable-512.png',
    // adicione outros arquivos importantes aqui (JS, CSS, fontes...)
];

// INSTALAÇÃO – armazena os arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // força o SW novo a ser ativado imediatamente
});

// ATIVAÇÃO – remove versões antigas do cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim(); // pega controle imediatamente das páginas
});

// FETCH – responde com cache, ou rede, ou offline.html
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).catch(() => {
                // se for navegação (ex: clicou em link) e falhar, retorna offline.html
                if (
                    event.request.mode === 'navigate' ||
                    event.request.headers.get('accept')?.includes('text/html')
                ) {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});