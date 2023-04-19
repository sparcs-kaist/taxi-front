import moment from "moment";
import "moment/locale/ko";

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

const time2str = (num) => num.toString().padStart(2, "0");

const date2str = (date, format = "LLLL") => moment(date).format(format);

export default moment;
export { getToday, getToday10, time2str, date2str };
