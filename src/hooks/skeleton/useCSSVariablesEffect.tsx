import { useEffect } from "react";

const syncHeight = () => {
  const innerHeight = window.innerHeight || 0;
  const visualHeight = visualViewport?.height || innerHeight;

  document.documentElement.style.setProperty(
    "--window-inner-height",
    `${innerHeight}px`
  );
  document.documentElement.style.setProperty(
    "--window-visual-height",
    `${visualHeight}px`
  );
};

const syncScroll = () => {
  const scrollY = Math.max(window.scrollY || 0, 0);
  document.documentElement.style.setProperty(
    "--window-scroll-y",
    `${scrollY}px`
  );
};

export default () => {
  useEffect(() => {
    syncHeight();
    syncScroll();
    window.addEventListener("resize", syncHeight);
    window.addEventListener("scroll", syncScroll);
    visualViewport?.addEventListener("resize", syncHeight);

    return () => {
      window.removeEventListener("resize", syncHeight);
      window.removeEventListener("scroll", syncScroll);
      visualViewport?.removeEventListener("resize", syncHeight);
    };
  }, []);
};
