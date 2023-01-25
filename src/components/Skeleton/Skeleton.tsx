import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useLocation, Redirect } from "react-router-dom";
// import { useCookies } from "react-cookie";
import reactGA from "react-ga4";
import axios from "tools/axios";
import { gaTrackingId, nodeEnv } from "serverconf";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import taxiLocationAtom from "recoil/taxiLocation";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import myRoomAtom from "recoil/myRoom";
import errorAtom from "recoil/error";
// import alertAtom from "recoil/alert";

import HeaderBar from "components/common/HeaderBar";
import Navigation from "components/Skeleton/Navigation";
import Footer from "components/Skeleton/Footer";
import PopupPolicy from "components/Mypage/PopupPolicy";
import Error from "components/Error/Error";
import useWindowInnerHeight from "hooks/useWindowInnerHeight";
// import betaNotice from "static/betaNotice";

type ContainerProps = {
  children: ReactNode;
};

type SkeletonProps = {
  children: ReactNode;
};

const Container = (props: ContainerProps) => {
  return (
    <div
      id="skeleton-container" // For useDisableScroll
      style={{
        width: "100%",
        height: "calc(100% - env(safe-area-inset-bottom))",
        position: "relative",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {props.children}
    </div>
  );
};

const Skeleton = (props: SkeletonProps) => {
  const [userId, setUserId] = useState(undefined);
  const [showAgree, setShowAgree] = useState(false);
  const [taxiLocation, setTaxiLocation] = useRecoilState(taxiLocationAtom);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);
  const setMyRoom = useSetRecoilState(myRoomAtom);
  const error = useRecoilValue(errorAtom);
  // const setAlert = useSetRecoilState(alertAtom);
  const location = useLocation();
  const pathname = location.pathname;
  const currentPath = location.pathname + location.search;
  const gaInitialized = useRef(false);
  useWindowInnerHeight();

  // 베타 서비스 안내창 띄우기 중지
  // const [cookies, setCookie] = useCookies(["betaNoticed"]);
  // useEffect(() => {
  //   if (!cookies.betaNoticed) {
  //     const expires = new Date();
  //     expires.setHours(5);
  //     expires.setMinutes(0);
  //     if (expires.getTime() < new Date().getTime())
  //       expires.setDate(expires.getDate() + 1);

  //     setCookie("betaNoticed", true, { path: "/", expires: expires });
  //     setAlert(betaNotice);
  //   }
  // }, []);

  const initializeGlobalInfo = useCallback(() => {
    const getLocation = axios.get("/locations");
    const getRoomList = axios.get("/rooms/searchByUser");
    Promise.all([getLocation, getRoomList]).then(
      ([{ data: locationData }, { data: roomData }]) => {
        setTaxiLocation(locationData.locations);
        setMyRoom(roomData);
      }
    );
  }, []);

  useEffect(() => {
    // path가 수정될 때 마다 logininfo 요청
    axios
      .get("/logininfo")
      .then(({ data }) => {
        setUserId(data?.id ?? null);
      })
      .catch((e) => {
        // FIXME
      });

    // Google Analytics
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
    // 로그인 정보 수정될 때 요청
    axios
      .get("/logininfo/detail")
      .then(({ data }) => {
        setLoginInfoDetail(data);
        setShowAgree(data?.agreeOnTermsOfService !== true);
      })
      .catch((e) => {
        // FIXME
      });

    // recoil-state 초기화
    if (userId) initializeGlobalInfo();

    // Google Analytics
    if (gaInitialized.current && userId) {
      reactGA.set({ userId });
    }
  }, [userId]);

  if (error) {
    return (
      <Container>
        <HeaderBar />
        <Error />
      </Container>
    );
  }

  if (userId === null && !pathname.startsWith("/login")) {
    return (
      <Redirect to={`/login?redirect=${encodeURIComponent(currentPath)}`} />
    );
  }

  if (userId === undefined) {
    return (
      <Container>
        <HeaderBar />
      </Container>
    );
  }
  if (pathname.startsWith("/login") || pathname.startsWith("/logout")) {
    return <Container>{props.children}</Container>;
  }
  if (taxiLocation.length === 0 || loginInfoDetail === null) {
    /**
     * @todo 로딩 화면 추가
     */
    return <HeaderBar />;
  }
  if (pathname.startsWith("/chatting")) {
    return (
      <Container>
        <HeaderBar />
        {props.children}
      </Container>
    );
  }
  return (
    <Container>
      <Navigation />
      <HeaderBar />
      {props.children}
      <Footer />
      <PopupPolicy isOpen={showAgree} onClose={() => setShowAgree(false)} />
    </Container>
  );
};

export default Skeleton;
