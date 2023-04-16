import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import {
  useSyncRecoilStateEffect,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";

import HeaderBar from "components/HeaderBar";
import Loading from "components/Loading";
import { ModalTerms } from "components/ModalPopup";
import Error from "pages/Error";

import Footer from "./Footer";
import Navigation from "./Navigation";

import errorAtom from "atoms/error";
import { useRecoilValue } from "recoil";

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
  const loginInfo = useValueRecoilState("loginInfo");
  const error = useRecoilValue(errorAtom);
  const { id: userId, agreeOnTermsOfService: isAgreeOnTermsOfService } =
    loginInfo || {};
  const isLoading = userId === null;

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
