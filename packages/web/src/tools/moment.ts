import moment from "moment";
import "moment/dist/locale/ko";

moment.locale("ko");

const getToday = () => moment();

const getToday10 = () => {
  const today = getToday();
  today.add(1, "minutes");
  while (today.minute() % 10 > 0) {
    today.add(1, "minutes");
  }
  return today;
};

const time2str = (num: any) => num.toString().padStart(2, "0");

// includeYear: date string에 연도를 포함할 지 유무
const date2str = (date: any, format = "LLLL", includeYear = true) => {
  const locale = moment.locale();
  const dateString = moment(date).format(format);

  if (includeYear) {
    return dateString;
  }

  if (locale === "ko") {
    return dateString.replace(/[0-9]{4}년 /, "");
  } else if (locale === "en") {
    return dateString.replace(/, [0-9]{4}/, "");
  } else {
    return dateString;
  }
};

export default moment;
export { getToday, getToday10, time2str, date2str };
