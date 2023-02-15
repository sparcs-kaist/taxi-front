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

// 백그라운드 메시지가 도착했을 때 알림을 표시하는 이벤트 리스너를 추가합니다.
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload?.data?.title || "Title does not exist";
  const notificationOptions = {
    body: payload?.data?.body || "Body does not exist",
    icon: payload?.data?.icon || "/icons-512.png",
    data: {
      url: payload?.data?.url || "/",
    },
  };

  // 알림을 클릭했을 때 링크를 여는 이벤트 리스너를 추가합니다.
  self.addEventListener("notificationclick", (event) => {
    console.log("notificationclick", event);
    const urlToRedirect = event.notification.data.url;
    console.log(urlToRedirect);
    event.notification.close();
    event.waitUntil(self.clients.openWindow(urlToRedirect));
  });

  // Notification API를 사용하여 기기에서 알림을 표시합니다.
  self.registration.showNotification(notificationTitle, notificationOptions);
});
