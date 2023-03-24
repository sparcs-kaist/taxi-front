import { useEffect } from "react";
import "./index.css";

// cached value
let count = 0;

// if fix this name, change App.css
const SCOLL_LOCK_CLASSNAME = "lock-scroll";

const useDisableScrollEffect = (open: boolean) => {
  useEffect(() => {
    if (open) {
      count++;
      if (
        count > 0 &&
        !document.documentElement.classList.contains(SCOLL_LOCK_CLASSNAME)
      ) {
        document.documentElement.classList.add(SCOLL_LOCK_CLASSNAME);
      }

      return () => {
        count--;
        if (count <= 0) {
          document.documentElement.classList.remove(SCOLL_LOCK_CLASSNAME);
        }
      };
    }
  }, [open]);
};

export default useDisableScrollEffect;
