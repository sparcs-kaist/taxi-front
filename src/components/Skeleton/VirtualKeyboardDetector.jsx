import { useEffect } from "react";

const VirtualKeyboardDetector = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = userAgent.includes("android");
  const isIOS =
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod");

  useEffect(() => {
    if (isAndroid) {
      const initialClientHeight = window.innerHeight;
      const resizeEvent = () => {
        if (window.visualViewport.height < initialClientHeight) {
          console.log("open");
        } else {
          console.log("close");
        }
      };
      window.addEventListener("resize", resizeEvent);
      return () => window.removeEventListener("resize", resizeEvent);
    }
    if (isIOS) {
      console.log(123);
    }
    // console.log(userAgent, isAndroid, isIOS);
  }, []);
  return null;
};

export default VirtualKeyboardDetector;
