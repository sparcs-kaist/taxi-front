import { useEffect } from "react";

const useDisableScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      const body = document.body;
      body.style.overflow = "hidden";
      body.style.position = "fixed";

      return () => {
        body.style.overflow = "unset";
        body.style.position = "unset";
      };
    }
  }, [open]);
};

export default useDisableScroll;
