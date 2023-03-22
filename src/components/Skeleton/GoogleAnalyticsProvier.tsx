import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import reactGA from "react-ga4";
import { gaTrackingId, nodeEnv } from "serverconf";

const GoogleAnalyticsProvier = () => {
  const gaInitialized = useRef(false);

  const location = useLocation();
  const { pathname, search } = location;
  const currentPath = pathname + search;

  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const userId = loginInfoDetail?.id;

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

  return null;
};

export default GoogleAnalyticsProvier;
