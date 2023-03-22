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
firebase.messaging();
