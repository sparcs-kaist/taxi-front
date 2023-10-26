import loginInfoAtom from "@/atoms/loginInfo";
import { gaTrackingId, nodeEnv } from "@/tools/loadenv";
import { useEffect, useRef } from "react";
import reactGA from "react-ga4";
import { useLocation } from "react-router-dom";

import { useRecoilValue } from "recoil";

export default () => {
  const gaInitialized = useRef(false);

  const location = useLocation();
  const { pathname, search } = location;
  const currentPath = pathname + search;

  const loginInfo = useRecoilValue(loginInfoAtom);
  const userId = loginInfo?.id;

  useEffect(() => {
    if (gaTrackingId) {
      if (!gaInitialized.current) {
        gaInitialized.current = true;
        reactGA.initialize(gaTrackingId, {
          testMode: nodeEnv === "development",
        });
      }
      reactGA.send({ hitType: "pageview", page: pathname });
    }
  }, [currentPath]);

  useEffect(() => {
    if (gaInitialized.current && userId) {
      reactGA.set({ userId });
    }
  }, [userId]);
};
