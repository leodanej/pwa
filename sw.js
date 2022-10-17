//asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_awp';

//configurar los archivos del cache

var urlToCache = [
   // './',
    './css/style.css',
    './images/1.png',
    './images/2.png',
    './images/3.png',
    './images/4.png',
    './images/5.png',
    './images/6.png',
    './images/facebook.png',
    './images/favicon-16.png',
    './images/favicon-32.png',
    './images/favicon-64.png',
    './images/favicon-96.png',
    './images/favicon-128.png',
    './images/favicon-144.png',
    './images/favicon-192.png',
    './images/favicon-256.png',
    './images/favicon-384.png',
    './images/favicon-512.png',
    './images/favicon-1024.png',
    './images/favicon.png',
    './images/instagram.png',
    './images/twiter.png',
];

// Evento install
// Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                    return cache.addAll(urlToCache)
                           .then(() => {
                                self.skipWaiting();
                           })
                 })
                 .catch(err => {
                    console.log('No se ha registrado el cache', err);
                   })
    )
});

//Evento activate
self.addEventListener('activate', e =>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            // Borrar los elementos q no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
              })
              .then(() =>{
                //activar la cache
                self.clients.claim();
              })
    );
});

//Evento fetch

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo los datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
})

