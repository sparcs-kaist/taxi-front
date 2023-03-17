import { useEffect, useState, useRef } from "react";
import axios from "./axios";

type Method = "get" | "post";

const wrapUseQuery =
  (method: Method) =>
  (url: string, data?: any, dep = []): [any, any, boolean] => {
    const [res, setRes] = useState<any>({});
    const [loading, setLoading] = useState<any>(true);
    const latestReqID = useRef(0);

    useEffect(() => {
      const currentReqID = ++latestReqID.current;
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

    return [res?.error, res?.data, loading];
  };

export default {
  get: wrapUseQuery("get"),
  post: wrapUseQuery("post"),
};
