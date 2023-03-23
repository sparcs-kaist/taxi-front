import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import errorAtom from "recoil/error";
import axios from "./axios";

type AxiosOption = {
  url: string;
  method: "get" | "post";
  data?: any;
  params?: any;
  onError?: (error: unknown) => void;
  onSuccess?: (data: any) => void;
};

const useAxios = () => {
  const history = useHistory();
  const location = useLocation();
  const setError = useSetRecoilState(errorAtom);
  const { pathname, search } = location;
  const currentPath = pathname + search;

  return useCallback(
    async ({ url, method, data, params, onError, onSuccess }: AxiosOption) => {
      try {
        const res = await axios({ url, method, data, params });
        if (res?.status === 403 && res.data?.error === "not logged in") {
          history.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
        } else if (res.status !== 200) {
          throw new Error("Status is not 200!");
        } else {
          if (onSuccess) onSuccess(res.data);
          return res.data;
        }
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
          setError({
            title: "일시적인 서버 오류",
            message: `"${url}"(${method}) API 호출에 실패했습니다.`,
            record: null,
          });
        }
      }
    },
    [history, currentPath]
  );
};

export default useAxios;
