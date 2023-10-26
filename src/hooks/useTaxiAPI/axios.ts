import { backServer as baseURL } from "@/tools/loadenv";
import _axios from "axios";

const axios = _axios.create({ baseURL, withCredentials: true });

export default axios;
