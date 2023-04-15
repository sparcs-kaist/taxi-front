import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAxios } from "hooks/useTaxiAPI";

import HeaderBar from "components/HeaderBar";
import Loading from "components/Loading";
import { ModalTerms } from "components/ModalPopup";
import Error from "pages/Error";

import Footer from "./Footer";
import Navigation from "./Navigation";

import errorAtom from "atoms/error";
import loginInfoAtom from "atoms/loginInfo";
import myRoomsAtom from "atoms/myRooms";
import notificationOptionsAtom from "atoms/notificationOptions";
import taxiLocationsAtom from "atoms/taxiLocations";
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

  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom);
  const error = useRecoilValue(errorAtom);
  const {
    id: userId,
    agreeOnTermsOfService: isAgreeOnTermsOfService,
    deviceToken,
  } = loginInfo || {};

  const setTaxiLocations = useSetRecoilState(taxiLocationsAtom);
  const setMyRooms = useSetRecoilState(myRoomsAtom);
  const setNotificationOptions = useSetRecoilState(notificationOptionsAtom);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // userId 초기화
    axios({
      url: "/logininfo",
      method: "get",
      onSuccess: (data) => {
        setLoginInfo(data);
        setIsLoading(false);
      },
    });

    // locations 초기화
    axios({
      url: "/locations",
      method: "get",
      onSuccess: ({ locations }) => setTaxiLocations(locations),
    });
  }, []);

  useEffect(() => {
    if (userId) {
      // roomlist 초기화
      axios({
        url: "/rooms/searchByUser",
        method: "get",
        onSuccess: (data) => setMyRooms(data),
      });
    }
  }, [userId]);

  useEffect(() => {
    if (deviceToken) {
      // notificationOptions 초기화
      axios({
        url: "/notifications/options",
        method: "get",
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
        <Loading center />
      </Container>
    );
  }
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/logout") ||
    pathname.startsWith("/chatting")
  ) {
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
      <ModalTerms isOpen={!!userId && !isAgreeOnTermsOfService} />
    </Container>
  );
};

export default Skeleton;
