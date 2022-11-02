import dotenv from "dotenv";

dotenv.config();
const nodeEnv = process.env.NODE_ENV;
const backServer = process.env.REACT_APP_BACK_URL;
const ioServer = process.env.REACT_APP_IO_URL ?? backServer;
const channelTalkPluginKey = process.env.REACT_APP_CHANNELTALK_PLUGIN_KEY;
const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;

export { nodeEnv, backServer, ioServer, channelTalkPluginKey, gaTrackingId };
