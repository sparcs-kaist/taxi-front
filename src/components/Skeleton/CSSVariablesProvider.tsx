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

const CSSVariablesProvider = () => {
  useEffect(() => {
    syncHeight();
    window.addEventListener("resize", syncHeight);
    visualViewport?.addEventListener("resize", syncHeight);

    return () => {
      window.removeEventListener("resize", syncHeight);
      visualViewport?.removeEventListener("resize", syncHeight);
    };
  }, []);
  return null;
};

export default CSSVariablesProvider;
