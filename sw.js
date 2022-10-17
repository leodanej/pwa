//asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_awp';

//configurar los archivos del cache

var urlToCache = [
   // './',
    'css/style.css',
    'imagen/facebook.png',
    'imagen/favicon-16.png',
    'imagen/favicon-32.png',
    'imagen/favicon-64.png',
    'imagen/favicon-96.png',
    'imagen/favicon-128.png',
    'imagen/favicon-144.png',
    'imagen/favicon-192.png',
    'imagen/favicon-256.png',
    'imagen/favicon-384.png',
    'imagen/favicon-512.png',
    'imagen/favicon-1024.png',
    'imagen/favicon.png',
    'images/instagram.png',
    'imagen/twiter.png',
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

