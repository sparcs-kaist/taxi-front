import _axios from "axios";

import { backServer as baseURL } from "loadenv";

const axios = _axios.create({ baseURL, withCredentials: true });

export default axios;
