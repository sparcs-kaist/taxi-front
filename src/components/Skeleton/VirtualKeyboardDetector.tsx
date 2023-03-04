import { useEffect } from "react";
import { subscribe, isSupported } from "on-screen-keyboard-detector";

import { useSetRecoilState } from "recoil";
import isVirtualKeyboardDetectedAtom from "recoil/isVirtualKeyboardDetectedAtom";

const VirtualKeyboardDetector = () => {
  const setIsVKDetected = useSetRecoilState(isVirtualKeyboardDetectedAtom);

  useEffect(() => {
    if (isSupported()) {
      const unsubscribe = subscribe((visibility) => {
        if (visibility === "hidden") {
          setIsVKDetected(false);
        } else {
          setIsVKDetected(true);
        }
      });
      return unsubscribe;
    }
  }, []);
  return null;
};

export default VirtualKeyboardDetector;
