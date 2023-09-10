import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import event2023FallInfoAtom from "atoms/event2023FallInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueEvent2023FallInfo = () =>
  useRecoilValue(event2023FallInfoAtom);
export const useSetEvent2023FallInfo = () =>
  useSetRecoilState(event2023FallInfoAtom);
export const useFetchEvent2023FallInfo = () => {
  const setEvent2023FallInfo = useSetEvent2023FallInfo();
  const axios = useAxios();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      axios({
        url: "/events/2023fall/global-state/",
        method: "get",
        onSuccess: (data) => setEvent2023FallInfo(data),
        onError: onError,
      });
    },
    [setEvent2023FallInfo, axios]
  );
};
