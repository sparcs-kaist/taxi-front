import React, { useEffect } from "react";
import ChannelService from "tools/channelService";
import { channelTalkPluginKey } from "serverconf";
import { useLocation } from "react-router-dom";

const ChannelTalk = () => {
  const location = useLocation();
  const pathname = location.pathname;

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
