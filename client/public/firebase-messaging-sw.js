importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDLjOo8L8CVrWNX_Y2k6C9whHf0eerUqts",
  authDomain: "reward-system-ee063.firebaseapp.com",
  projectId: "reward-system-ee063",
  storageBucket: "reward-system-ee063.appspot.com",
  messagingSenderId: "357842628043",
  appId: "1:357842628043:web:f6b6c546c4e9759ab29a4e",
  measurementId: "G-MEELP4RQ69"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});