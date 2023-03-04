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
    /*
     * https://channel.io/ko/blog/cross_browsing_ios15
     * Android와 iOS는 키보드 활성화 여부를 판단하는 기준이 다릅니다.
     * iOS는 input에 focus가 되었는지 여부로 키보드가 활성화 되었는지 알 수 있습니다.
     * 하지만, Android는 input의 focus 여부가 키보드 활성화 여부와 일치하지 않습니다.
     * Android에서는 window의 resize이벤트 핸들러를 등록하여 키보드 활성화 여부를 알 수 있습니다.
     */
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
      const root = document.getElementById("root");
      const observer = new MutationObserver((mutations) => {
        const addedList = mutations.filter(
          (mutation) => mutation.addedNodes.length > 0
        );
        if (addedList.length > 0) {
          const inputs = document.getElementsByTagName("input");
          Array.prototype.forEach.call(inputs, (element) => {
            element.addEventListener("focus", onFocus);
            element.addEventListener("blur", onBlur);
          });
        }
      });
      if (!root) return;
      observer.observe(root, { childList: true, subtree: true });
      return observer.disconnect;
    }
  }, []);
  return null;
};

export default VirtualKeyboardDetector;
