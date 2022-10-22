const getS3Url = (x) => {
  return `${process.env.REACT_APP_S3_URL}${x}`;
};

const getLocationName = (location, langPreference = "ko") => {
  if (!location) return "";
  if (langPreference === "en") return location.enName;
  return location.koName;
};

export { getS3Url, getLocationName };
