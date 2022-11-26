import { useEffect } from "react";

// if fix this name, change App.css
const SCOLL_LOCK_CLASSNAME = "lock-scroll";

const useDisableScroll = (open: boolean) => {
  useEffect(() => {
    if (
      open &&
      !document.documentElement.classList.contains(SCOLL_LOCK_CLASSNAME)
    ) {
      document.documentElement.classList.add(SCOLL_LOCK_CLASSNAME);

      return () => {
        document.documentElement.classList.remove(SCOLL_LOCK_CLASSNAME);
      };
    }
  }, [open]);
};

export default useDisableScroll;
