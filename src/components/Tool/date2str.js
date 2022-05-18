import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const date2str = (date) => {
  return moment(date).format("LLLL");
};

export default date2str;
