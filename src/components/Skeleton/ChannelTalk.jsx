import React, { useEffect } from "react";
import ChannelService from "tools/channelService";
import { channelTalkPluginKey } from "serverconf";

const ChannelTalk = () => {
  useEffect(() => {
    ChannelService.boot({
      pluginKey: channelTalkPluginKey, //please fill with your plugin key
      hideChannelButtonOnBoot: true,
      customLauncherSelector: ".popup-channeltalk",
    });
    return () => {
      ChannelService.shutdown();
    };
  }, []);
  return null;
};

export default ChannelTalk;
