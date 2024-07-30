importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBckaFhDgzV3QTQ-X3krOJZbi4es0C-aR8",
  authDomain: "flight-status-12b8d.firebaseapp.com",
  projectId: "flight-status-12b8d",
  storageBucket: "flight-status-12b8d.appspot.com",
  messagingSenderId: "819818860906",
  appId:"1:819818860906:web:1895d161357bb5426a5513",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
