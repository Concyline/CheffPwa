const CACHE_NAME = 'v-1.3';

const urlsToCache = [
    '/',                     // raiz
    './index.html',           // SPA principal
    './offline.html',         // página para quando estiver offline
    './manifest.json',

    './img/avatar.png',
    './img/bedtime_24dp_49454F.png',
    './img/error_outline_72dp_49454F.png',
    './img/error_outline_72dp_CAC4D0.png',
    './img/favicon-32.png',
    './img/home_24dp_49454F.png',
    './img/home_24dp_CAC4D0.png',
    './img/icon-192.png',
    './img/icon-256.png',
    './img/icon-512.png',
    './img/icon-maskable-512.png',
    './img/icon-notification.png',
    './img/settings_24dp_49454F.png',
    './img/settings_24dp_CAC4D0.png',
    './img/sunny_24dp_CAC4D0.png',
    './img/Untitled-2.fw.png',

    './css/componentes.css',
    './css/geral.css',
    './css/loader.css',
    './css/menu_lateral.css',
    './css/top_bar.css',
    './css/variables.css',

    './js/apiService.js',
    './js/componentes.js',
    './js/gerenteToken.js',
    './js/jquery-3.6.0.min.js',
    './js/main.js',
    './js/menu_lateral.js',
    './js/ready.js',
    './js/serviceWorker.js',
    './js/tokenManager.js',
    './js/topProgressBar.js'
    // adicione outros arquivos importantes aqui (JS, CSS, fontes...)
];

// INSTALAÇÃO – armazena os arquivos no cache
// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(cache => {
//             return cache.addAll(urlsToCache);
//         })
//     );
//     self.skipWaiting(); // força o SW novo a ser ativado imediatamente
// });

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {

            for (const url of urlsToCache) {
                try {
                    await cache.add(url);
                    //console.log('Cacheado:', url);
                } catch (err) {
                    console.error('Erro ao cachear:', url);
                }
            }

        })
    );

    self.skipWaiting();
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

    // 🔹 Só intercepta GET
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    // 🔹 Só intercepta mesma origem
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        caches.match(event.request).then(cachedResponse => {

            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).catch(() => {

                // Se for navegação HTML
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }

                // fallback seguro
                return new Response('', { status: 404 });

            });

        })

    );

});

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(cachedResponse => {
//             if (cachedResponse) {
//                 return cachedResponse;
//             }

//             return fetch(event.request).catch(() => {
//                 // se for navegação (ex: clicou em link) e falhar, retorna offline.html
//                 if (
//                     event.request.mode === 'navigate' ||
//                     event.request.headers.get('accept')?.includes('text/html')
//                 ) {
//                     return caches.match('/offline.html');
//                 }
//             });
//         })
//     );
// });