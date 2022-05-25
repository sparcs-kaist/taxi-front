import _axios from "axios";
import { backServer } from "serverconf";

const axios = _axios.create({ baseURL: backServer, withCredentials: true });

export default axios;
