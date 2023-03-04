import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import isVirtualKeyboardDetectedAtom from "recoil/isVirtualKeyboardDetectedAtom";

const VirtualKeyboardDetector = () => {
  const setIsVKDetected = useSetRecoilState(isVirtualKeyboardDetectedAtom);

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
        const visualViewportHeight = visualViewport?.height;
        setIsVKDetected(
          visualViewportHeight && visualViewportHeight < initialClientHeight
            ? true
            : false
        );
      };
      visualViewport?.addEventListener("resize", resizeEvent);
      return () => visualViewport?.removeEventListener("resize", resizeEvent);
    }
    if (isIOS) {
      const onFocus = () => setIsVKDetected(true);
      const onBlur = () => setIsVKDetected(false);
      const resizeEvent = () => {
        const inputs = document.getElementsByTagName("input");
        Array.prototype.forEach.call(inputs, (element) => {
          element.addEventListener("focus", onFocus);
          element.addEventListener("blur", onBlur);
        });
      };
      visualViewport?.addEventListener("resize", resizeEvent);
      return () => visualViewport?.removeEventListener("resize", resizeEvent);
    }
    // console.log(userAgent, isAndroid, isIOS);
  }, []);
  return null;
};

export default VirtualKeyboardDetector;
