import _axios from 'axios';
import backAddress from '../../serverconf'

const axios = _axios.create({ baseURL: backAddress, withCredentials: true });

export default axios;