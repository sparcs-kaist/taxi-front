import dotenv from "dotenv";

dotenv.config();
const backServer = process.env.REACT_APP_BACK_URL;
console.log(backServer);

export { backServer };
