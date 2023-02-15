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
const getMessageBody = (type, body) => {
  // TODO: 채팅 메시지 유형에 따라 Body를 다르게 표시합니다.
  if (type === "text") {
    // 채팅 메시지 유형이 텍스트인 경우
    // body는 "${nickname}: ${content}입니다."
    // 본문은 "${nickname}: ${content}"가 됩니다.
    return body;
  } else if (type === "s3img") {
    // 채팅 유형이 이미지인 경우
    // body는 메시지 작성자의 nickname입니다.
    // TODO: 일단, 본문은 "${nickname} 님이 이미지를 전송하였습니다"가 됩니다. 쿠키로 언어를 가져올 수 있으면 개선할 수 있다고 생각합니다.
    const suffix = " 님이 이미지를 전송하였습니다.";
    return `${body} ${suffix}`;
  } else {
    // 채팅 메시지 type이 "in"이거나 "out"인 경우
    // body는 입/퇴장한 사람의 nickname입니다.
    // TODO: 일단, 본문은 "${nickname} 님이 입장하였습니다" 또는 "${nickname} 님이 퇴장하였습니다"가 됩니다. 쿠키로 언어를 가져올 수 있으면 개선할 수 있다고 생각합니다.
    const suffix =
      type === "in" ? " 님이 입장하였습니다" : "님이 퇴장하였습니다";
    return `${body} ${suffix}`;
  }
};

// 백그라운드 메시지가 도착했을 때 알림을 표시하는 이벤트 리스너를 추가합니다.
messaging.onBackgroundMessage((payload) => {
  // 알림의 제목을 설정하는 notificationTitle을 생성합니다.
  const notificationTitle = payload?.data?.title || "Title does not exist";

  // 알림의 제목을 제외한 내용을 구성하는 notificationOption을 생성합니다.
  const type = payload?.data?.type || "text";
  const body = getMessageBody(
    type,
    payload?.data?.body || "Body does not exist"
  );
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
