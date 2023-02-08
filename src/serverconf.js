import dotenv from "dotenv";

dotenv.config();

const env = { ...process.env, ...window["env"] };

const nodeEnv = env.NODE_ENV;
const backServer = env.REACT_APP_BACK_URL;
const ioServer = env.REACT_APP_IO_URL ?? backServer;
const s3BaseUrl = env.REACT_APP_S3_URL;
const channelTalkPluginKey = env.REACT_APP_CHANNELTALK_PLUGIN_KEY;
const gaTrackingId = env.REACT_APP_GA_TRACKING_ID;

export {
  nodeEnv,
  backServer,
  ioServer,
  s3BaseUrl,
  channelTalkPluginKey,
  gaTrackingId,
};
