importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
 
if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './nav.html', revision: '1' },
    { url: './detail-team.html', revision: '1' },
    { url: './favorite.html', revision: '1' },
    { url: './css/materialize.min.css', revision: '1' },
    { url: './css/styles.css', revision: '1' },
    { url: './js/materialize.min.js', revision: '1' },
    { url: './js/nav.js', revision: '1' },
    { url: './js/sw-register.js', revision: '1' },
    { url: './js/idb.js', revision: '1' },
    { url: './js/api.js', revision: '1' },
    { url: './js/db.js', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './push.js', revision: '1' },
    { url: './fonts/Cabin-Regular.ttf', revision: '1' },
    { url: './fonts/Cabin-Bold.ttf', revision: '1' },
    { url: './img/favicon.png', revision: '1' },
    { url: './img/apple-touch-icon-ipad-76x76.png', revision: '1' },
    { url: './img/apple-touch-icon-ipad-retina-152x152.png', revision: '1' },
    { url: './img/apple-touch-icon-iphone-60x60.png', revision: '1' },
    { url: './img/apple-touch-icon-iphone-retina-120x120.png', revision: '1' },
    { url: './img/banner-home.jpg', revision: '1' },
    { url: './img/soccer-512x512.png', revision: '1' },
    { url: './img/arrow-back.png', revision: '1' },
  ], {
    ignoreURLParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/detail-team.html?'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'detail-team'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api'
    })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: './img/soccer-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
