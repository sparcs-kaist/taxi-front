import { firebaseConfig, s3BaseUrl } from "loadenv";

const getS3Url = (x) => `${s3BaseUrl}${x}`;

const getDynamicLink = (to, fallback = true) => {
  const { host, androidPacakgeName, iosAppBundleId } =
    firebaseConfig?.dinamicLink || {};
  const { origin } = window.location;

  if (!host) return `${origin}${to}`;
  const encodedLink = origin + encodeURIComponent(to);

  return fallback
    ? `${host}?link=${encodedLink}&apn=${androidPacakgeName}&afl=${encodedLink}&ibi=${iosAppBundleId}&ifl=${encodedLink}`
    : `${host}?link=${encodedLink}&apn=${androidPacakgeName}&ibi=${iosAppBundleId}`;
};

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

export { getS3Url, getDynamicLink, getLocationName, isNotificationOn };
