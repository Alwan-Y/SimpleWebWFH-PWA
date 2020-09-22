const CACHE_NAME = 'WFH-v3'
let linkToCache = [
    '/',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/js/script.js',
    '/js/registerServiceWorker.js',
    '/css/style.css',
    '/img/Recomen/1.jpg',
    '/img/Recomen/2.jpg',
    '/img/Recomen/3.jpg',
    '/img/Recomen/4.jpg',
    '/img/Recomen/5.jpg',
    '/img/Recomen/6.jpg',
    '/img/Recomen/7.jpg',
    '/img/Recomen/8.jpg',
    '/img/desktop.jpg',
    '/img/laptop.jpg',
    '/img/mobile.jpg',
    '/page/about.html',
    '/page/contact.html',
    '/page/home.html',
    '/page/recomended gear.html',
    '/index.html',
    '/img/mnfest/64.png',
    '/img/mnfest/128.png',
    '/img/mnfest/256.png',
    '/img/mnfest/512.png',
    '/manifest.json',
    '/page/nav.html'

]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(linkToCache);
        })
    );
})

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log(`ServiceWorker : Gunakan aset dari cache: ${response.url}`)
                return response;
            }

            console.log(`ServiceWorker: Memuat aset dari server: ${event.request.url}`)
            return fetch(event.request)
        })
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})