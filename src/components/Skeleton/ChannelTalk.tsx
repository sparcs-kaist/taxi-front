import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import ChannelService from "tools/channelService";
import { channelTalkPluginKey } from "serverconf";
import { useLocation } from "react-router-dom";

const ChannelTalk = () => {
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

export default ChannelTalk;
