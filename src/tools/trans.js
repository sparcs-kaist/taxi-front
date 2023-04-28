import { s3BaseUrl } from "loadenv";

const getS3Url = (x) => `${s3BaseUrl}${x}`;

const getLocationName = (location, langPreference) => {
  if (!location) return "";
  if (langPreference === "en") return location.enName;
  return location.koName;
};

const isNotificationOn = (notificationOptions) => {
  const isOn =
    // notificationOptions?.advertisement ||
    // notificationOptions?.beforeDepart ||
    notificationOptions?.chatting || notificationOptions?.notice;
  // notificationOptions?.keywords?.length;
  return !!isOn;
};

export { getS3Url, getLocationName, isNotificationOn };
