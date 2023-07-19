import dayjs, { ConfigType, Dayjs } from "dayjs";
import "dayjs/locale/ko";
import localizedFormat from "dayjs/plugin/localizedFormat";

let timeDiffWithServer: Nullable<number> = null;

dayjs.locale("ko");
dayjs.extend(localizedFormat);

// back 서버와 시간 동기화를 합니다.
export const syncDayWithServer = (timeDiff: number) => {
  if (typeof timeDiffWithServer !== "number") timeDiffWithServer = timeDiff;
  timeDiffWithServer = Math.min(timeDiffWithServer, timeDiff);
};

// 클라이언트의 현재 시간을 반환합니다.
export const dayNowClient = () => {
  return dayjs();
};

// 서버의 현재 시간을 반환합니다.
export const dayNowServer = () => {
  const timeDiff = timeDiffWithServer ?? 0;
  return dayjs().add(timeDiff, "millisecond");
};

// 서버의 시각을 클라이언트의 시각으로 변환합니다.
export const dayServerToClient = (serverTime: ConfigType) => {
  const timeDiff = timeDiffWithServer ?? 0;
  return dayjs(serverTime).add(timeDiff, "millisecond");
};

// 클라이언트의 시각을 서버의 시각으로 변환합니다.
export const dayClientToServer = (clientTime: ConfigType) => {
  const timeDiff = timeDiffWithServer ?? 0;
  return dayjs(clientTime).subtract(timeDiff, "millisecond");
};

// 시각을 문자열로 변환합니다.
export const day2str = (day: Dayjs, format = "LLLL") => {
  return day.format(format);
};

export type { Dayjs };
export default dayjs;
