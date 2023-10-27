importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

// 환경변수가 새로 설정된 경우, 환경변수에 따라 Firebase config를 설정합니다.
self.addEventListener("fetch", () => {
  const urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);
});

// 처음에 Firebase config가 설정되어 있지 않을 때 오류가 발생하지 않도록 주입될 기본 config입니다.
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Firebase app을 초기화합니다.
firebase.initializeApp(self.firebaseConfig || defaultConfig);

// 백그라운드 메시지를 처리할 수 있게 FCM 인스턴스를 생성합니다.
const messaging = firebase.messaging();

// 백그라운드 메시지가 도착했을 때 알림을 표시하는 이벤트 리스너를 추가합니다.
messaging.onBackgroundMessage((payload) => {
  // 알림의 제목을 설정하는 notificationTitle을 생성합니다.
  const notificationTitle = payload?.data?.title || "SPARCS Taxi";

  // 알림의 제목을 제외한 내용을 구성하는 notificationOption을 생성합니다.
  const body = payload?.data?.body || "There's a new message!";
  const icon = payload?.data?.icon || "/icons-512.png";
  const url = payload?.data?.url || "/";
  const notificationOptions = {
    body,
    icon,
    data: {
      url,
    },
  };

  // 알림을 클릭했을 때 링크를 여는 이벤트 리스너를 추가합니다.
  self.addEventListener("notificationclick", (event) => {
    const urlToRedirect = event.notification.data.url;
    event.notification.close();
    event.waitUntil(self.clients.openWindow(urlToRedirect));
  });

  // Notification API를 사용하여 기기에서 알림을 표시합니다.
  self.registration.showNotification(notificationTitle, notificationOptions);
});
