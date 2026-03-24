const CACHE_NAME = 'Versão : 1.75';

const urlsToCache = [
    '/',
    './index.html',
    './offline.html',
    './manifest.json',
    './service-worker.js',

    './pages/mesas.html',
    './pages/pratos.html',
    './pages/usuarios.html',
    './pages/pedido.html',
    './pages/inicio.html',

    './img/avatar.png',
    './img/bedtime_24dp_49454F.png',
    './img/error_outline_72dp_49454F.png',
    './img/error_outline_72dp_CAC4D0.png',
    './img/fastfood_24dp_49454F.png',
    './img/fastfood_24dp_CAC4D0.png',
    './img/favicon-32.png',
    './img/home_24dp_49454F.png',
    './img/home_24dp_CAC4D0.png',
    './img/icon-192.png',
    './img/icon-256.png',
    './img/icon-512.png',
    './img/icon-maskable-512.png',
    './img/icon-notification.png',
    './img/manage_accounts_24dp_49454F.png',
    './img/manage_accounts_24dp_CAC4D0.png',
    './img/person_add_24dp_49454F.png',
    './img/person_add_24dp_CAC4D0.png',
    './img/settings_24dp_49454F.png',
    './img/settings_24dp_CAC4D0.png',
    './img/sunny_24dp_CAC4D0.png',
    './img/table_restaurant_24dp_49454F.png',
    './img/table_restaurant_24dp_CAC4D0.png',
    './img/done_24dp_FFFFFF.png',
    './img/search_24dp_FFFFFF.png',
    './img/delete_24dp_FFFFFF.png',
    './img/edit_24dp_FFFFFF.png',
    './img/add_a_photo_24dp_FFFFFF.png',
    './img/camera_alt_24dp_49454F.png',
    './img/camera_alt_24dp_CAC4D0.png',
    './img/image_24dp_CAC4D0.png',
    './img/image_24dp_49454F.png',
    './img/close_24dp_FFFFFF.png',
    './img/crop_24dp_FFFFFF.png',
    './img/visibility_24dp_49454F.png',
    './img/visibility_24dp_CAC4D0.png',
    './img/logout_24dp_CAC4D0.png',
    './img/logout_24dp_49454F.png',
    './img/arrow_back_24dp_FFFFFF.png',
    './img/keyboard_arrow_down_24dp_49454F.png',
    './img/keyboard_arrow_down_24dp_CAC4D0.png',

    './css/componentes.css',
    './css/geral.css',
    './css/loader.css',
    './css/menu_lateral.css',
    './css/top_bar.css',
    './css/variables.css',
    './css/cropper.min.css',

    './css/pages/mesas.css',
    './css/pages/pratos.css',
    './css/pages/usuarios.css',
    './css/pages/pedido.css',
    './css/pages/inicio.css',

    './js/core/util/Constantes.js',
    './js/core/ApiClient.js',
    './js/ui/componentes/componentes.js',
    './js/core/jquery-3.6.0.min.js',
    './js/ui/componentes/menu_lateral.js',
    './js/core/Ready.js',
    './js/ui/Router.js',
    './js/core/StorageManager.js',
    './js/ui/componentes/topProgressBar.js',
    './js/core/cropper.min.js',
    './js/helpers/ErrorHelper.js',
    './js/services/UserService.js',
    '/js/services/DishService.js',
    './js/controllers/DishController.js',
    './js/core/Auth.js',
    './js/services/RestaurantTablesService.js',
    './js/controllers/RestaurantTablesController.js',

    './js/ui/pages/mesas.js',
    './js/ui/pages/pratos.js',
    './js/ui/pages/usuarios.js',
    './js/ui/pages/pedido.js',
    './js/ui/pages/inicio.js'
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

self.addEventListener("notificationclick", function (event) {

    event.notification.close();

    const url = event.notification.data.url;

    event.waitUntil(

        clients.matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {

                // for (const client of clientList) {

                //     // se já existe uma aba aberta
                //     if ("navigate" in client) {
                //         client.navigate(url);
                //         return client.focus();
                //     }

                // }

                for (const client of clientList) {

                    const clientUrl = new URL(client.url);

                    if (clientUrl.origin === self.location.origin) {

                        client.navigate(url);
                        return client.focus();

                    }

                }

                // se não existir nenhuma
                return clients.openWindow(url);

            })

    );

});


