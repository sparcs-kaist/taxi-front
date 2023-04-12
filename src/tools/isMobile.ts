const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const isAndroid: boolean = userAgent.includes("android");
  const isIOS: boolean =
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod") ||
    (userAgent.includes("macintosh") && maxTouchPoints > 1);

  return [isAndroid, isIOS];
};

export default isMobile;
