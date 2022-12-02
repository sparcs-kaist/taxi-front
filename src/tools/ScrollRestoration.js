import React from "react";
import _ScrollRestoration from "react-scroll-restoration";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  if (pathname === "/search") return null;
  return <_ScrollRestoration />;
};

export default ScrollRestoration;
