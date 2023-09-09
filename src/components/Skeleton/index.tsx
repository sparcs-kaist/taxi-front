import { ReactNode, useMemo } from "react";
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
import Error from "pages/Error";

import Navigation from "./Navigation";
import SuggestAppTopBar from "./SuggestAppTopBar";

import errorAtom from "atoms/error";
import { useRecoilValue } from "recoil";

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
      !["/login", "/logout", "/chatting"].some((prefix) =>
        pathname.startsWith(prefix)
      ),
    [pathname]
  );

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
          {isDisplayNavigation && !deviceType.startsWith("mobile/") && (
            <SuggestAppTopBar />
          )}
          {children}
          <ModalTerms isOpen={!!userId && !isAgreeOnTermsOfService} />
          {isDisplayNavigation && <div css={{ height: "88px" }} />}
        </>
      )}
    </Container>
  );
};

export default Skeleton;
