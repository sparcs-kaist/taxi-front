import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChannelService from "./channelService";

import errorAtom from "atoms/error";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useRecoilValue } from "recoil";

import { channelTalkPluginKey } from "loadenv";

const ChannelTalkProvider = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const error = useRecoilValue(errorAtom);

  useEffect(() => {
    if (loginInfoDetail) {
      ChannelService.updateUser({
        profile: {
          name: loginInfoDetail?.name,
          email: loginInfoDetail?.email,
        },
      });
    }
  }, [loginInfoDetail]);

  useEffect(() => {
    ChannelService.boot({
      pluginKey: channelTalkPluginKey,
      // login 페이지와 error 페이지에서는 채널톡 버튼을 띄웁니다.
      hideChannelButtonOnBoot: !pathname.startsWith("/login") && !error,
      customLauncherSelector: ".popup-channeltalk",
    });
  }, [pathname, error]);
  return null;
};

export default ChannelTalkProvider;
