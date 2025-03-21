// 모든 정규식들은 아래 링크의 규칙을 기반으로 함
// https://www.notion.so/sparcs/Input-value-Regular-Expression-4f3e778c3b884cfe9a1b5a733c8da8fb

const chatMsg = (x) => RegExp("^\\s{0,}\\S{1}[\\s\\S]{0,}$").test(x);
const chatMsgLength = (x) => RegExp("^[\\s\\S]{1,140}$").test(x);
// chatMsgLength 수정 시, packages/web/components/Chat/MessageForm/InputText/BodyText.tsx의 maxChatMsgLength 도 수정해 주세요

const nickname = (x) => {
  return RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{3,25}$").test(x);
};

const phoneNumber = (x) => {
  return RegExp("^010-?([0-9]{3,4})-?([0-9]{4})$").test(x);
};

const roomName = (x) => {
  return RegExp(
    "^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ,.?! _~/#'\\\\@=\"\\-\\^()+*<>{}[\\]]{1,50}$" // ,.?/#'\@="-^()+*<>{}[]
  ).test(x);
};

const fromTo = (x) => {
  return RegExp("^[A-Za-z0-9가-힣 -]{1,20}$").test(x);
};

const reportMsg = (x) => {
  return RegExp("^[\\s\\S]{1,500}$").test(x);
};

const account = (x) => {
  return RegExp("^[A-Za-z가-힣]{2,7} [0-9]{10,14}$|^$").test(x);
};

const eventCouponCode = (x) => {
  return RegExp("^[A-Za-z0-9]+$").test(x);
};

export default {
  chatMsg,
  chatMsgLength,
  nickname,
  phoneNumber,
  roomName,
  fromTo,
  reportMsg,
  account,
  eventCouponCode,
};
