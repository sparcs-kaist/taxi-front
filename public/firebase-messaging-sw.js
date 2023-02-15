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

// 메시지 payload를 확인하여 메시지 유형에 따라 알림 팝업 내용을 설정합니다.
const getMessageContext = (payload) => {
  const result = { notificationTitle: "", notificationOptions: {} };
  result.notificationTitle = payload?.data?.title || "Title does not exist";

  const type = payload?.data?.type || "text";
  const body = payload?.data?.content || "Body does not exist";
  const icon = payload?.data?.icon || "/icons-512.png";
  const url = payload?.data?.url || "/";
  if (type === "text") {
    // 채팅 메시지 유형이 텍스트인 경우
    result.notificationOptions = {
      body,
      icon,
      data: {
        url,
      },
    };
  } else if (type === "s3img") {
    // TODO: 이미지일 때 "Image"라는 본문 대신 미리보기를 표시하면 좋겠다고 생각합니다.
    result.notificationOptions = {
      body: "Image",
      icon,
      data: {
        url,
      },
    };
  } else {
    // 채팅 메시지 유형이 입퇴장 메시지인 경우
    // 일단 본문은 "nickname: in" 또는 "nickname: out"이 됩니다.
    // TODO: 쿠키로 언어를 가져올 수 있으면 개선할 수 있다고 생각합니다.
    result.notificationOptions = {
      body: type,
      icon,
      data: {
        url,
      },
    };
  }
  return result;
};

// 백그라운드 메시지가 도착했을 때 알림을 표시하는 이벤트 리스너를 추가합니다.
messaging.onBackgroundMessage((payload) => {
  const { notificationTitle, notificationOptions } = getMessageContext(payload);

  // 알림을 클릭했을 때 링크를 여는 이벤트 리스너를 추가합니다.
  self.addEventListener("notificationclick", (event) => {
    const urlToRedirect = event.notification.data.url;
    event.notification.close();
    event.waitUntil(self.clients.openWindow(urlToRedirect));
  });

  // Notification API를 사용하여 기기에서 알림을 표시합니다.
  self.registration.showNotification(notificationTitle, notificationOptions);
});
