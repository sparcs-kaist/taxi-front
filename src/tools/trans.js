import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const date2str = (date, format = "LLLL") => {
  return moment(date).format(format);
};

const getToday10 = () => {
  const today = moment();
  while (today.minute() % 10 > 0) {
    today.add(1, "minutes");
  }
  return today;
};

const getS3Url = (x) => {
  return `${process.env.REACT_APP_S3_URL}${x}`;
};

export { date2str, getToday10, getS3Url };
