import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

import useCSSVariablesEffect from "hooks/skeleton/useCSSVariablesEffect";
import useChannelTalkEffect from "hooks/skeleton/useChannelTalkEffect";
import useFirebaseMessagingEffect from "hooks/skeleton/useFirebaseMessagingEffect";
import useFlutterEventCommunicationEffect from "hooks/skeleton/useFlutterEventCommunicationEffect";
import useGoogleAnalyticsEffect from "hooks/skeleton/useGoogleAnalyticsEffect";
import useI18nextEffect from "hooks/skeleton/useI18nextEffect";
import useScrollRestorationEffect from "hooks/skeleton/useScrollRestorationEffect";
import useVirtualKeyboardDetectEffect from "hooks/skeleton/useVirtualKeyboardDetectEffect";
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
import { useRecoilValue } from "recoil";

import isMobile from "tools/isMobile";
import { deviceType } from "tools/loadenv";

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
  const { pathname } = useLocation();
  const error = useRecoilValue(errorAtom);
  const isLoading = userId === null;

  const isDisplayNavigation = useMemo(
    () =>
      !["/login", "/logout", "/chatting", "/invite"].some((prefix) =>
        pathname.startsWith(prefix)
      ),
    [pathname]
  );

  const [cookies, setCookies] = useCookies(["isOpposeSuggestApp"]);
  const isOpposeSuggestApp = !!cookies?.isOpposeSuggestApp;
  const [isAndroid, isIOS] = isMobile();
  const [isTryCloseSuggestApp, setIsTryCloseSuggestApp] = useState(false);
  const isSuggestApp = useMemo(
    () =>
      (isAndroid || isIOS) &&
      !deviceType.startsWith("app") &&
      !isOpposeSuggestApp &&
      !isTryCloseSuggestApp,
    [isAndroid, isIOS, isOpposeSuggestApp, isTryCloseSuggestApp]
  );
  const setIsOpenSuggestApp = useCallback(
    () => setIsTryCloseSuggestApp(true),
    []
  );

  // 앱 설치 유도 팝업 띄우기를 중단을 위한 쿠키를 설정합니다.
  useEffect(() => {
    if (!isOpposeSuggestApp) {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 10);
      setCookies("isOpposeSuggestApp", true, { expires: expirationDate });
      setIsTryCloseSuggestApp(true);
    }
  }, [isOpposeSuggestApp]);

  useSyncRecoilStateEffect(); // loginIngo, taxiLocations, myRooms, notificationOptions 초기화 및 동기화
  useI18nextEffect();
  useScrollRestorationEffect();
  useCSSVariablesEffect();
  useVirtualKeyboardDetectEffect();
  useChannelTalkEffect();
  useGoogleAnalyticsEffect();
  useFirebaseMessagingEffect();
  useFlutterEventCommunicationEffect();

  return (
    <Container>
      <HeaderBar />
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading center />
      ) : (
        <>
          {isDisplayNavigation && <Navigation />}
          {children}
          <ModalSuggestApp
            isOpen={isSuggestApp}
            onChangeIsOpen={setIsOpenSuggestApp}
          />
          <ModalTerms isOpen={!!userId && !isAgreeOnTermsOfService} />
          {isDisplayNavigation && <div css={{ height: "88px" }} />}
        </>
      )}
    </Container>
  );
};

export default Skeleton;
