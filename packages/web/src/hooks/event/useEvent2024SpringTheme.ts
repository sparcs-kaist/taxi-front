import { useLocation } from "react-router-dom";

export const useEvent2024SpringTheme = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return pathname === "/event/2024spring-missions";
};
