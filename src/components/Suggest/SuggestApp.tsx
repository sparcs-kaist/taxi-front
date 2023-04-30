import isAppAtom from "atoms/isApp";
import { useRecoilValue } from "recoil";

import isMobile from "tools/isMobile";
import { getDynamicLink } from "tools/trans";

const SuggestApp = () => {
  const isApp = useRecoilValue(isAppAtom);
  const [isAndroid, isIOS] = isMobile();
  const isSuggestAndroidApp = isAndroid && !isApp;
  const isSuggestIOSApp = isIOS && !isApp;

  getDynamicLink("/12");
  if (isSuggestAndroidApp) {
    return <div></div>;
  }
  if (isSuggestIOSApp) {
    return <div></div>;
  }
  return null;
};

export default SuggestApp;
