// firebase-messaging-sw.js
// Questo file VA caricato nella STESSA cartella di famiglia.html su GitHub

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBIULZU-xPRvWIeM4Gv0igKotbEX2DzRnc",
  authDomain: "app-family-ff2ff.firebaseapp.com",
  projectId: "app-family-ff2ff",
  storageBucket: "app-family-ff2ff.firebasestorage.app",
  messagingSenderId: "451030699741",
  appId: "1:451030699741:web:0996d1f452cd2d992bd534"
});

const messaging = firebase.messaging();

// Gestisce notifiche quando l'app è in background o chiusa
messaging.onBackgroundMessage(function(payload) {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Our Family', {
    body: body || '',
    icon: icon || '/famiglia/icon-192.png',
    badge: '/famiglia/icon-192.png',
    tag: payload.data?.tag || 'transaction',
    data: payload.data || {},
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: '📊 Apri app' }
    ]
  });
});

// Click sulla notifica → apre l'app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = 'https://vianellomattia2-arch.github.io/famiglia/famiglia.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('famiglia') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
