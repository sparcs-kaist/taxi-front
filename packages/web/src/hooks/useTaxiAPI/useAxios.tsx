import { AxiosError } from "axios";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import axios from "./axios";

import errorAtom from "@/atoms/error";
import { useSetRecoilState } from "recoil";

import dayjs, { dayNowClient, syncDayWithServer } from "@/tools/day";

export type AxiosOption = {
  url: string;
  method: "get" | "post";
  data?: any;
  params?: any;
  onError?: (error: unknown) => void;
  onSuccess?: (data: any) => void;
};

const useAxios = () => {
  const history = useHistory();
  const setError = useSetRecoilState(errorAtom);
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;

  return useCallback(
    async ({ url, method, data, params, onError, onSuccess }: AxiosOption) => {
      try {
        const timeClient = dayNowClient(); // client 의 요청 시각
        const res = await axios({ url, method, data, params }); // server의 API 호출 결과

        const dateServer = res?.headers?.date;
        const timeServer = dayjs(dateServer); // server의 응답 시각

        if (dateServer && timeServer.isValid()) {
          syncDayWithServer(timeServer.diff(timeClient));
        }
        if (res?.status === 403 && res.data?.error === "not logged in") {
          history.replace(
            `/logout?redirect=${encodeURIComponent(
              `/login?redirect=${encodeURIComponent(currentPath)}`
            )}`
          );
        } else if (res.status !== 200) {
          throw new Error("Status is not 200!");
        } else {
          if (onSuccess) onSuccess(res.data);
          return res.data;
        }
      } catch (e: AxiosError | any) {
        if (
          e?.response &&
          e?.response?.status === 403 &&
          e?.response?.data?.error === "not logged in"
        ) {
          history.replace(
            `/logout?redirect=${encodeURIComponent(
              `/login?redirect=${encodeURIComponent(currentPath)}`
            )}`
          );
        } else if (onError) {
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
