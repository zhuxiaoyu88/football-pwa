const CACHE_NAME = "football-v01";
const urlsToCache = [
  "./",
  "./index.html",
  "./detail-team.html",
  "./favorite.html",
  "./img/favicon.png",
  "./img/apple-touch-icon-ipad-76x76.png",
  "./img/apple-touch-icon-ipad-retina-152x152.png",
  "./img/apple-touch-icon-iphone-60x60.png",
  "./img/apple-touch-icon-iphone-retina-120x120.png",
  "./img/banner-home.jpg",
  "./img/soccer-512x512.png",
  "./img/arrow-back.png",
  "./fonts/Cabin-Regular.ttf",
  "./fonts/Cabin-Bold.ttf",
  "./css/materialize.min.css",
  "./css/styles.css",
  "./js/materialize.min.js",
  "./js/notif.js",
  "./js/sw-register.js",
  "./js/api.js",
  "./js/idb.js",
  "./js/db.js",
  "./service-worker.js",
  "./manifest.json",
];
 
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const base_url = "https://api.football-data.org/v2";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then((response) => {
          return response || fetch (event.request);
        })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then( (cacheNames) => {
      return Promise.all(
        cacheNames.map( (cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});