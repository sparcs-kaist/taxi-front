import { useCallback, useEffect } from "react";
import useSWR from "swr";

import useAxios from "./useAxios";

type Method = "get" | "post";

const wrapUseSWR =
  (method: Method) =>
  (
    url: string,
    requestData?: any,
    dep?: [any],
    config?: any
  ): [any, any, boolean] => {
    const axios = useAxios();
    const fetcher = useCallback(
      (url: string) => {
        return axios({
          url,
          method,
          data: requestData,
        }).then((res) => res.data);
      },
      [JSON.stringify(requestData)]
    );

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, config);

    useEffect(() => {
      if (dep) {
        mutate();
      }
    }, [dep]);

    return [error, data, isLoading];
  };

export default {
  get: wrapUseSWR("get"),
  post: wrapUseSWR("post"),
};
