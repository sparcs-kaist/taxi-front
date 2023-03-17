import _axios from "axios";
import { backServer as baseURL } from "serverconf";

const axios = _axios.create({ baseURL, withCredentials: true });

export default axios;
