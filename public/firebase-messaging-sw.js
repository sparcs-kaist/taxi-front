importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDHXTGYqV4gxXppv2Q1IQiegT6YhQLKN1c",
  authDomain: "taxi-app-d226a.firebaseapp.com",
  projectId: "taxi-app-d226a",
  storageBucket: "taxi-app-d226a.appspot.com",
  messagingSenderId: "595225681170",
  appId: "1:595225681170:web:b49bfd19de352984e227cb",
  measurementId: "G-1CZN13H363",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
});
