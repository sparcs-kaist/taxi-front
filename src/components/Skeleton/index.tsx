import { ReactNode, useEffect, useState } from "react";
// import { useLocation, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useAxios } from "hooks/useTaxiAPI";

import HeaderBar from "components/HeaderBar";
import Error from "pages/Error";
import PopupPolicy from "pages/Mypage/PopupPolicy";

import Footer from "./Footer";
import Navigation from "./Navigation";

import deviceTokenAtom from "atoms/deviceToken";
import errorAtom from "atoms/error";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import myRoomAtom from "atoms/myRoom";
import notificationOptionsAtom from "atoms/notificationOptions";
import taxiLocationAtom from "atoms/taxiLocation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

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
  const deviceToken = useRecoilValue(deviceTokenAtom);
  const error = useRecoilValue(errorAtom);
  const { id: userId, agreeOnTermsOfService: isAgreeOnTermsOfService } =
    loginInfoDetail || {};

  const setTaxiLocation = useSetRecoilState(taxiLocationAtom);
  const setMyRoom = useSetRecoilState(myRoomAtom);
  const setNotificationOptions = useSetRecoilState(notificationOptionsAtom);

  const location = useLocation();
  const { pathname } = location;

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
    }
  }, [userId]);

  useEffect(() => {
    if (deviceToken) {
      // notificationOptions 초기화
      axios({
        url: "/notifications/options",
        method: "get",
        params: { deviceToken },
        onSuccess: (data) => setNotificationOptions(data),
      });
    }
  }, [deviceToken]);

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
      <PopupPolicy isOpen={!!userId && !isAgreeOnTermsOfService} />
    </Container>
  );
};

export default Skeleton;
