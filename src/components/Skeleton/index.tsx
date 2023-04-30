import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

import {
  useSyncRecoilStateEffect,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";

import HeaderBar from "components/HeaderBar";
import Loading from "components/Loading";
import { ModalTerms } from "components/ModalPopup";
import ModalSuggestApp from "components/ModalPopup/ModalSuggestApp";
import Error from "pages/Error";

import Navigation from "./Navigation";

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
  const { id: userId, agreeOnTermsOfService: isAgreeOnTermsOfService } =
    useValueRecoilState("loginInfo") || {};
  const error = useRecoilValue(errorAtom);
  const isLoading = userId === null;

  const location = useLocation();
  const { pathname } = location;

  const [cookies, setCookies] = useCookies(["isOpposeSuggestApp"]);
  const isOpposeSuggestApp = !!cookies?.isOpposeSuggestApp;
  const isApp = useRecoilValue(isAppAtom);
  const [isAndroid, isIOS] = isMobile();
  const [isTryCloseSuggestApp, setIsTryCloseSuggestApp] = useState(false);
  const isSuggestApp = useMemo(
    () => isAndroid && !isApp && !isOpposeSuggestApp && !isTryCloseSuggestApp,
    [isAndroid, isIOS, isApp, isOpposeSuggestApp, isTryCloseSuggestApp]
  );
  const setIsOpenSuggestApp = useCallback(
    () => setIsTryCloseSuggestApp(true),
    []
  );

  // 앱 웹뷰일 경우, 앱 설치 유도 팝업 띄우기를 중단합니다 그리고 쿠키를 설정합니다.
  useEffect(() => {
    if (isApp && !isOpposeSuggestApp) {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 10);
      setCookies("isOpposeSuggestApp", true, {
        expires: expirationDate,
      });
      setIsTryCloseSuggestApp(true);
    }
  }, [isApp, isOpposeSuggestApp]);

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
      <ModalSuggestApp
        isOpen={isSuggestApp}
        onChangeIsOpen={setIsOpenSuggestApp}
      />
      <ModalTerms isOpen={!!userId && !isAgreeOnTermsOfService} />
      <div css={{ height: "88px" }} />
    </Container>
  );
};

export default Skeleton;
