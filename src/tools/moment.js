import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const getToday = () => moment();

const getToday10 = () => {
  const today = getToday();
  while (today.minute() % 10 > 0) {
    today.add(1, "minutes");
  }
  return today;
};

const get2digit = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};

const date2str = (date, format = "LLLL") => moment(date).format(format);

export default moment;
export { getToday, getToday10, get2digit, date2str };
