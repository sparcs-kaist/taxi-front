import dayjs, { ConfigType } from "dayjs";
import "dayjs/locale/ko";
import localizedFormat from "dayjs/plugin/localizedFormat";

let timeDiffWithServer: Nullable<number> = null;

dayjs.locale("ko");
dayjs.extend(localizedFormat);

/** back 서버와 시간 동기화를 합니다. */
export const syncDayWithServer = (timeDiff: number) => {
  if (typeof timeDiffWithServer !== "number") timeDiffWithServer = timeDiff;
  timeDiffWithServer = Math.min(timeDiffWithServer, timeDiff);
};

/** 클라이언트의 현재 시간을 반환합니다. */
export const dayNowClient = () => {
  return dayjs();
};

/** 서버의 현재 시간을 반환합니다. */
export const dayNowServer = () => {
  const timeDiff = timeDiffWithServer ?? 0;
  return dayjs().add(timeDiff, "millisecond");
};

/** 서버의 시각을 클라이언트의 시각으로 변환합니다. */
export const dayServerToClient = (serverTime: ConfigType) => {
  const timeDiff = timeDiffWithServer ?? 0;
  return dayjs(serverTime).add(timeDiff, "millisecond");
};

/** 클라이언트의 시각을 서버의 시각으로 변환합니다. */
export const dayClientToServer = (clientTime: ConfigType) => {
  const timeDiff = timeDiffWithServer ?? 0;
  return dayjs(clientTime).subtract(timeDiff, "millisecond");
};

/** 시각을 문자열로 변환합니다. */
export const day2str = (day: Dayjs, format = "LLLL") => {
  return day.format(format);
};

/** 일을 기준으로 특정 날짜까지의 D-DAY를 반환합니다. */
export const getDday = (dateString: string) => {
  const targetDate = dayjs(dateString);
  const currentDate = dayNowServer().startOf("day"); // Get current server time
  const diffDays = currentDate.diff(targetDate, "day");

  const sign = diffDays > 0 ? "+" : "-";
  return `D${sign}${
    diffDays !== 0 ? Math.abs(diffDays).toString().padStart(3, "0") : "DAY"
  }`;
};

/** 다음은 초, 분, 시간, 일, 월, 년을 고려하여 시간 차이를 문자열로 반환 */
export const dayDifference2str = (date1: Dayjs, date2: Dayjs) => {
  const diffInMilliseconds = date1.diff(date2);
  const absDiff = Math.abs(diffInMilliseconds);
  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // 대략적으로 월 평균 일수를 사용
  const years = Math.floor(days / 365.25); // 윤년을 고려한 평균 일수 사용

  if (years > 0) {
    return diffInMilliseconds > 0 ? `${years}년 후` : `${years}년 전`;
  } else if (months > 0) {
    return diffInMilliseconds > 0 ? `${months}개월 후` : `${months}개월 전`;
  } else if (days > 0) {
    return diffInMilliseconds > 0 ? `${days}일 후` : `${days}일 전`;
  } else if (hours > 0) {
    return diffInMilliseconds > 0 ? `${hours}시간 후` : `${hours}시간 전`;
  } else if (minutes > 0) {
    return diffInMilliseconds > 0 ? `${minutes}분 후` : `${minutes}분 전`;
  } else if (seconds > 0) {
    return diffInMilliseconds > 0 ? `${seconds}초 후` : `${seconds}초 전`;
  } else {
    return `지금`;
  }
};

export default dayjs;
