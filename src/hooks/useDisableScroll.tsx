import { useEffect } from "react";

const useDisableScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      const container = document.getElementById("skeleton-container")!;
      container.style.overflow = "hidden";
      container.style.position = "fixed";

      return () => {
        container.style.overflow = "unset";
        container.style.position = "unset";
      };
    }
  }, [open]);
};

export default useDisableScroll;
