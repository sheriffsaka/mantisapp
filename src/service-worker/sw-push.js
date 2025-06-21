// src/service-worker/sw-push.js

// Required for Workbox to inject manifest
self.__WB_MANIFEST;

self.addEventListener('install', (event) => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activated');
  clients.claim();
});
