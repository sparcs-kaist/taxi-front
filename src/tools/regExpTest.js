// 모든 정규식들은 아래 링크의 규칙을 기반으로 함
// https://www.notion.so/sparcs/Input-value-Regular-Expression-4f3e778c3b884cfe9a1b5a733c8da8fb

const chatMsg = (x) => RegExp("^[\\s\\S]{1,500}$").test(x);

const nickname = (x) => {
  return RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{3,25}$").test(x);
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

export default { chatMsg, nickname, roomName, fromTo, reportMsg, account };
