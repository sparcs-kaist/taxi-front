import { useState, useEffect, ReactNode } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useAxios } from "hooks/useTaxiAPI";
import registerTokenOnClick from "tools/firebase";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import taxiLocationAtom from "atoms/taxiLocation";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import myRoomAtom from "atoms/myRoom";
import errorAtom from "atoms/error";

import HeaderBar from "components/common/HeaderBar";
import Navigation from "components/Skeleton/Navigation";
import Footer from "components/Skeleton/Footer";
import PopupPolicy from "components/Mypage/PopupPolicy";
import Error from "components/Error";

type ContainerProps = {
  children: ReactNode;
};

type SkeletonProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
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
      {children}
    </div>
  );
};

const Skeleton = ({ children }: SkeletonProps) => {
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(true);

  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);
  const error = useRecoilValue(errorAtom);
  const setTaxiLocation = useSetRecoilState(taxiLocationAtom);
  const setMyRoom = useSetRecoilState(myRoomAtom);
  const userId = loginInfoDetail?.id;

  const location = useLocation();
  const { pathname, search } = location;
  const currentPath = pathname + search;

  useEffect(() => {
    // userId 초기화
    axios({
      url: "/logininfo/detail",
      method: "get",
      onSuccess: (data) => {
        setLoginInfoDetail(data);
        setIsLoading(false);
      },
    });

    // locations 초기화
    axios({
      url: "/locations",
      method: "get",
      onSuccess: ({ locations }) => setTaxiLocation(locations),
    });
  }, []);

  useEffect(() => {
    if (userId) {
      // roomlist 초기화
      axios({
        url: "/rooms/searchByUser",
        method: "get",
        onSuccess: (data) => setMyRoom(data),
      });

      // FCM 디바이스 토큰 등록
      registerTokenOnClick();
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
  if (isLoading) {
    return (
      <Container>
        <HeaderBar />
      </Container>
    );
  }
  if (!userId && !pathname.startsWith("/login")) {
    return (
      <Redirect to={`/login?redirect=${encodeURIComponent(currentPath)}`} />
    );
  }
  if (pathname.startsWith("/login") || pathname.startsWith("/logout")) {
    return <Container>{children}</Container>;
  }
  if (pathname.startsWith("/chatting")) {
    return (
      <Container>
        <HeaderBar />
        {children}
      </Container>
    );
  }
  return (
    <Container>
      <Navigation />
      <HeaderBar />
      {children}
      <Footer />
      <PopupPolicy isOpen={!loginInfoDetail?.agreeOnTermsOfService} />
    </Container>
  );
};

export default Skeleton;
