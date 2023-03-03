import { useRef, useEffect, memo } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { scrollTo, getScrollPage } from "./utils";

export const DefaultKey = "init-enter";

interface IProps {
  visitedUrl: Map<string, number>;
}

const ScrollRestorationBody = ({
  history,
  visitedUrl,
}: RouteComponentProps & IProps) => {
  const handlePopStateChange = () => {
    const { location } = history;
    const { key } = location;
    const existingRecord = visitedUrl.get(key || DefaultKey);

    if (existingRecord !== undefined) {
      scrollTo(existingRecord);
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopStateChange);
    return () => {
      window.removeEventListener("popstate", handlePopStateChange);
    };
  }, []);

  return null;
};

const ScrollRestoration = withRouter(
  memo(ScrollRestorationBody, (prevProps, nextProps) => {
    const { location: prevLoaction, visitedUrl, history } = prevProps;
    const { location: nextLoaction } = nextProps;

    const key = prevLoaction.key || DefaultKey;

    const locationChanged =
      (nextLoaction.pathname !== prevLoaction.pathname ||
        nextLoaction.search !== prevLoaction.search) &&
      nextLoaction.hash === "";

    const scroll = getScrollPage();

    if (locationChanged) {
      if (history.action !== "POP") {
        scrollTo(0);
        visitedUrl.set(key, scroll);
      } else {
        visitedUrl.set(key, scroll);
      }
    }

    return false;
  })
);

export default function Wrapper() {
  const visitedUrl = useRef(new Map());

  return <ScrollRestoration visitedUrl={visitedUrl.current} />;
}
