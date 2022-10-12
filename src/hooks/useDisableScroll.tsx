import { useEffect } from "react";

const useDisableScroll = (open: boolean) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
};

export default useDisableScroll;
