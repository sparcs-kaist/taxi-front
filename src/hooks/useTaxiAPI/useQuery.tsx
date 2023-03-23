import { useEffect, useRef, useState } from "react";

import useAxios from "./useAxios";

type Method = "get" | "post";

const wrapUseQuery =
  (method: Method) =>
  (url: string, data?: any, dep = []): [any, any, boolean] => {
    const axios = useAxios();
    const [res, setRes] = useState<any>({});
    const [loading, setLoading] = useState<any>(true);
    const latestReqID = useRef(0);

    useEffect(() => {
      const currentReqID = ++latestReqID.current;
      let isUnmounted = false;
      axios({
        url,
        method,
        data,
        onSuccess: (res) => {
          if (isUnmounted || currentReqID !== latestReqID.current) return;
          setRes({ error: null, data: res });
          setLoading(false);
        },
        onError: (e) => {
          if (isUnmounted || currentReqID !== latestReqID.current) return;
          setRes({ error: e, data: null });
          setLoading(false);
        },
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
