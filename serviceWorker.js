const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@18/umd/react.production.min.js",
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
];

const CACHE_NAME = "v1_cache_contador_react";

// self es similar a this
// esto es para instalar el serviceWorker 
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            }).catch(console.log);
        })
    );
});

// esto es para activar el serviceWorker y eliminar una version vieja del mismo
self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
       caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheNames) => {
                // si el cache no existe, lo elimina
                cacheWhitelist.indexOf(cacheNames) === -1 && caches.delete(cacheNames);
            })
        )
       }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});