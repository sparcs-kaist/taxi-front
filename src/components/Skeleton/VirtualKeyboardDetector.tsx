import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import isVirtualKeyboardDetectedAtom from "atoms/isVirtualKeyboardDetected";

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
      const minKeyboardHeight = 300;
      const resizeEvent = () => {
        const visualViewportHeight = visualViewport?.height;
        const windowScreenHeight = window.screen.height;
        setIsVKDetected(
          visualViewportHeight &&
            visualViewportHeight < windowScreenHeight - minKeyboardHeight
            ? true
            : false
        );
      };
      visualViewport?.addEventListener("resize", resizeEvent);
      return () => visualViewport?.removeEventListener("resize", resizeEvent);
    }
    if (isIOS) {
      let isVKDetected = false;
      const onFocus = () => {
        isVKDetected = true;
        setIsVKDetected(true);
      };
      const onBlur = () => {
        isVKDetected = false;
        setIsVKDetected(false);
      };
      const root = document.getElementById("root");
      const observer = new MutationObserver((mutations) => {
        const addedList = mutations.filter(
          (mutation) => mutation.addedNodes.length > 0
        );
        if (addedList.length > 0) {
          const inputs = document.getElementsByTagName("input");
          const textareas = document.getElementsByTagName("textarea");
          const callback = (element: HTMLElement) => {
            element.addEventListener("focus", onFocus);
            element.addEventListener("blur", onBlur);
          };
          Array.prototype.forEach.call(inputs, callback);
          Array.prototype.forEach.call(textareas, callback);
        }
      });
      if (root) observer.observe(root, { childList: true, subtree: true });

      let prevVVHeight = 0;
      const resizeEvent = () => {
        const currentVVHeight = visualViewport?.height;
        if (!currentVVHeight) return;
        if (
          prevVVHeight - 30 > currentVVHeight &&
          prevVVHeight - 100 < currentVVHeight &&
          isVKDetected
        ) {
          const scrollHeight = window?.document?.scrollingElement?.scrollHeight;
          if (!scrollHeight) return;

          const scrollTop = scrollHeight - currentVVHeight;
          window.scrollTo(0, scrollTop);
        }
        prevVVHeight = currentVVHeight;
      };
      visualViewport?.addEventListener("resize", resizeEvent);

      return () => {
        observer.disconnect();
        visualViewport?.removeEventListener("resize", resizeEvent);
      };
    }
  }, []);
  return null;
};

export default VirtualKeyboardDetector;
