import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const date2str = (date, format = "LLLL") => {
  return moment(date).format(format);
};

const getS3Url = (x) => {
  return `${process.env.REACT_APP_S3_URL}${x}`;
};

export { date2str, getS3Url };
