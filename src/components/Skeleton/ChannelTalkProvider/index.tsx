import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import ChannelService from "./channelService";
import { channelTalkPluginKey } from "loadenv";
import { useLocation } from "react-router-dom";

const ChannelTalkProvider = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);

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
      hideChannelButtonOnBoot: !pathname.startsWith("/login"),
      customLauncherSelector: ".popup-channeltalk",
    });
  }, [pathname]);
  return null;
};

export default ChannelTalkProvider;
