const STUDENTS_CACHE = 'version-1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STUDENTS_CACHE).then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './src/App.jsx',
        './public/school icon.jpg',
        //additional resources to cache here
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      // If the request is in the cache, return it
      if (cacheResponse) {
        return cacheResponse;
      }

      // If the request is not in the cache, fetch it from the network
      return fetch(event.request).then((networkResponse) => {
        // Clone the network response to cache and return it
        const clonedResponse = networkResponse.clone();
        caches.open(STUDENTS_CACHE).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return networkResponse;
      });
    })
  );
});


