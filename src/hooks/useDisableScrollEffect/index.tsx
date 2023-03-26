import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./index.css";

// cached value
let count = 0;

// if fix this name, change App.css
const SCOLL_LOCK_CLASSNAME = "lock-scroll";

const useDisableScrollEffect = (open: boolean) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // login 페이지는 useDisableScrollEffect 사용 시 페이지가 뭉개지는 현상이 있어서 예외처리
    if (pathname.startsWith("/login")) return;

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
  }, [open, pathname]);
};

export default useDisableScrollEffect;
