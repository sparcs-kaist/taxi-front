import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useAxios } from "hooks/useTaxiAPI";
// import { useCookies } from "react-cookie";
import reactGA from "react-ga4";
import registerTokenOnClick from "tools/firebase";
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
import Error from "components/Error";
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
  const axios = useAxios();
  const [userId, setUserId] = useState(undefined);
  const [showAgree, setShowAgree] = useState(false);
  const [taxiLocation, setTaxiLocation] = useRecoilState(taxiLocationAtom);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);
  const setMyRoom = useSetRecoilState(myRoomAtom);
  const error = useRecoilValue(errorAtom);
  // const setAlert = useSetRecoilState(alertAtom);
  const location = useLocation();
  const { pathname, search } = location;
  const currentPath = pathname + search;
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

  useEffect(() => {
    // userId 초기화
    axios({
      url: "/logininfo",
      method: "get",
      onSuccess: (loginInfo) => setUserId(loginInfo?.id ?? null),
    });
  }, []);

  useEffect(() => {
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
    axios({
      url: "/logininfo/detail",
      method: "get",
      onSuccess: (loginInfoDetail) => {
        console.log(loginInfoDetail); // REMOVE ME
        setLoginInfoDetail(loginInfoDetail);
        setShowAgree(loginInfoDetail?.agreeOnTermsOfService !== true);
      },
    });

    if (userId) {
      // locations atom 초기화
      axios({
        url: "/locations",
        method: "get",
        onSuccess: ({ locations }) => setTaxiLocation(locations),
      });
      axios({
        url: "/rooms/searchByUser",
        method: "get",
        onSuccess: (data) => setMyRoom(data),
      });

      // FCM 디바이스 토큰 등록
      registerTokenOnClick();
    }

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
