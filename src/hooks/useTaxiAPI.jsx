import React, { useEffect, useState, useRef } from "react";
import axios from "tools/axios";

const wrapUseTaxiAPI =
  (method) =>
  (url, data, dep = []) => {
    const [res, setRes] = useState({});
    const [loading, setLoading] = useState(false);
    const latestReqID = useRef(0);

    useEffect(() => {
      const currentReqID = ++latestReqID.current;
      setLoading(true);
      let isUnmounted = false;
      const asyncFun = async () => {
        const res = await axios({ url, method, data });
        if (res.status !== 200) {
          throw new Error("Status is not 200!");
        }
        // Put Additional Data Validation Here
        if (isUnmounted || currentReqID !== latestReqID.current) return;
        setRes({ error: null, data: res.data });
        setLoading(false);
      };

      asyncFun().catch((e) => {
        if (isUnmounted || currentReqID !== latestReqID.current) return;
        setRes({ error: e, data: null });
        setLoading(false);
      });

      return () => {
        isUnmounted = true;
      };
    }, [url, JSON.stringify(dep), JSON.stringify(data)]);

    return [res.error, res.data, loading];
  };

const useTaxiAPI = {
  get: wrapUseTaxiAPI("get"),
  post: wrapUseTaxiAPI("post"),
};
export default useTaxiAPI;

const get = useTaxiAPI.get;
const post = useTaxiAPI.post;
export { get, post };
