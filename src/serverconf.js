import dotenv from "dotenv";

dotenv.config();
const backServer = process.env.REACT_APP_BACK_URL;
const ioServer = process.env.REACT_APP_IO_URL ?? backServer;

export { backServer, ioServer };
