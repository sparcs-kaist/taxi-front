import { useEffect } from "react";

const CSSVariablesProvider = () => {
  useEffect(() => {
    const syncHeight = () =>
      document.documentElement.style.setProperty(
        "--window-inner-height",
        `${window.innerHeight}px`
      );

    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  return null;
};

export default CSSVariablesProvider;
