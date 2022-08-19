import dotenv from "dotenv";

dotenv.config();
const backServer = process.env.REACT_APP_BACK_URL;
const ioServer = process.env.REACT_APP_IO_URL ?? backServer;
const channelTalkPluginKey = process.env.REACT_APP_CHANNELTALK_PLUGIN_KEY;

export { backServer, ioServer, channelTalkPluginKey };
