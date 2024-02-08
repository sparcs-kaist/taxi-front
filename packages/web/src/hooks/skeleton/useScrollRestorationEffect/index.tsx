import { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { getScrollPage, isBothStartsWith, scrollTo } from "./utils";

const defaultKey = "init-enter";

export default () => {
  const visitedUrl = useRef(new Map());
  const history = useHistory();
  const location = useLocation();
  const prevLocation = useRef(location);

  useEffect(() => {
    const key = prevLocation.current.key || defaultKey;
    const locationChanged =
      (location.pathname !== prevLocation.current.pathname ||
        location.search !== prevLocation.current.search) &&
      location.hash === "";
    const scroll = getScrollPage();

    if (locationChanged) {
      if (
        !isBothStartsWith(
          location.pathname,
          prevLocation.current.pathname,
          "/myroom"
        ) &&
        !isBothStartsWith(
          location.pathname,
          prevLocation.current.pathname,
          "/search"
        ) &&
        !isBothStartsWith(
          location.pathname,
          prevLocation.current.pathname,
          "/home"
        ) &&
        !isBothStartsWith(
          location.pathname,
          prevLocation.current.pathname,
          "/addroom"
        )
      ) {
        if (history.action === "POP") {
          const existingRecord = visitedUrl.current.get(key || defaultKey);
          if (existingRecord !== undefined) scrollTo(existingRecord);
        } else scrollTo(0);
      }
      visitedUrl.current.set(key, scroll);
    }
    prevLocation.current = location;
  }, [location.pathname, location.search, location.hash]);
};
