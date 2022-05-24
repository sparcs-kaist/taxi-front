import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const date2str = (date, format = "LLLL") => {
  return moment(date).format(format);
};

export { date2str };
