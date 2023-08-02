import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import {
  useSyncRecoilStateEffect,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";

import HeaderBar from "components/HeaderBar";
import Loading from "components/Loading";
import { ModalTerms } from "components/ModalPopup";
import Error from "pages/Error";

import Navigation from "./Navigation";
import SuggestAppTopBar from "./SuggestAppTopBar";

import errorAtom from "atoms/error";
import isAppAtom from "atoms/isApp";
import { useRecoilValue } from "recoil";

import isMobile from "tools/isMobile";

type ContainerProps = {
  children: ReactNode;
};

type SkeletonProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div
    css={{
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

const Skeleton = ({ children }: SkeletonProps) => {
  const {
    id: userId,
    agreeOnTermsOfService: isAgreeOnTermsOfService,
    deviceType,
  } = useValueRecoilState("loginInfo") || {};
  const error = useRecoilValue(errorAtom);
  const isLoading = userId === null;
  const isApp = useRecoilValue(isAppAtom) || deviceType === "app";
  const [isAndroid, isIOS] = isMobile();

  const location = useLocation();
  const { pathname } = location;

  // loginIngo, taxiLocations, myRooms, notificationOptions 초기화 및 동기화
  useSyncRecoilStateEffect();

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
    pathname.startsWith("/chatting") ||
    pathname.startsWith("/invite")
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
      {(isAndroid || isIOS) && !isApp && <SuggestAppTopBar />}
      {children}
      <ModalTerms isOpen={!!userId && !isAgreeOnTermsOfService} />
      <div css={{ height: "88px" }} />
    </Container>
  );
};

export default Skeleton;
