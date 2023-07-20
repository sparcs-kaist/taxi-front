import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChannelService from "./channelService";

import errorAtom from "atoms/error";
import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue } from "recoil";

import { channelTalkPluginKey } from "loadenv";

const ChannelTalkProvider = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const loginInfo = useRecoilValue(loginInfoAtom);
  const error = useRecoilValue(errorAtom);

  useEffect(() => {
    if (channelTalkPluginKey && loginInfo) {
      ChannelService.updateUser({
        profile: {
          name: loginInfo?.name,
          email: loginInfo?.email,
        },
      });
    }
  }, [loginInfo]);

  useEffect(() => {
    if (channelTalkPluginKey) {
      ChannelService.boot({
        pluginKey: channelTalkPluginKey,
        // login 페이지와 error 페이지에서는 채널톡 버튼을 띄웁니다.
        hideChannelButtonOnBoot: !pathname.startsWith("/login") && !error,
        customLauncherSelector: ".popup-channeltalk",
      });
    }
  }, [pathname, error]);
  return null;
};

export default ChannelTalkProvider;
