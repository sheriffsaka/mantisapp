// src/sw-push.js
// self.addEventListener('install', (event) => {
//   console.log('Service Worker installed');
// });

// self.addEventListener('activate', (event) => {
//   console.log('Service Worker activated');
// });
// src/sw-push.js

// Required install event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[SW] Installed');
});

// Required activate event
self.addEventListener('activate', (event) => {
  clients.claim();
  console.log('[SW] Activated');
});

// Optional: basic fetch handler
self.addEventListener('fetch', (event) => {
  // You can add caching logic here if needed
});

// Required for injectManifest to work
self.__WB_MANIFEST;