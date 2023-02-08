import { s3BaseUrl } from "serverconf";

const getS3Url = (x) => `${s3BaseUrl}${x}`;

const getLocationName = (location, langPreference) => {
  if (!location) return "";
  if (langPreference === "en") return location.enName;
  return location.koName;
};

export { getS3Url, getLocationName };
