import { useEffect, useRef, useState } from "react";

import useAxios from "./useAxios";

type Method = "get" | "post";

interface QueryOptions {
  skip?: boolean;
}

const wrapUseQuery =
  (method: Method) =>
  (
    url: string,
    data?: any,
    dep?: any[],
    options?: QueryOptions
  ): [any, any, boolean] => {
    const axios = useAxios();
    const [res, setRes] = useState<{ error: any; data: any }>({
      error: null,
      data: null,
    });
    const [loading, setLoading] = useState(true);
    const latestReqID = useRef(0);

    useEffect(() => {
      // skip 옵션이 true이면 API 호출을 건너뛰고 loading 상태를 false로 설정
      if (options?.skip) {
        setLoading(false);
        return;
      }

      setLoading(true);
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
    }, [url, JSON.stringify(dep), JSON.stringify(data), options?.skip]);

    return [res?.error, res?.data, loading];
  };

export default {
  get: wrapUseQuery("get"),
  post: wrapUseQuery("post"),
};
