import { useEffect } from "react";

const useWindowInnerHeight = () => {
  useEffect(() => {
    function syncHeight() {
      document.documentElement.style.setProperty(
        "--window-inner-height",
        `${window.innerHeight}px`
      );
    }

    window.addEventListener("resize", syncHeight);
    return () => {
      window.removeEventListener("resize", syncHeight);
    };
  }, []);
};

export default useWindowInnerHeight;
