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

self.addEventListener('sync', (event) => {
  if (event.tag === 'syncData') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Fetch and synchronize data with the server
  const offlineData = JSON.parse(localStorage.getItem('offlineData'));

  if (offlineData) {
    try {
      const response = await fetch('http://localhost/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offlineData),
      });

      if (response.ok) {
        // Data synchronization successful
        localStorage.removeItem('offlineData');
      } else {
        console.error('Data synchronization failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during data synchronization:', error);
    }
  }
}


// Listen for the online event and trigger data synchronization
window.addEventListener('online', function () {
  syncData(); // Synchronize data when the network connection is established
  console.log('app is online')
});

