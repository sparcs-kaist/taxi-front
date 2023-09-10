import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import event2023FallInfoAtom from "atoms/event2023FallInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { eventMode } from "tools/loadenv";

export const useValueEvent2023FallInfo = () =>
  useRecoilValue(event2023FallInfoAtom);
export const useSetEvent2023FallInfo = () =>
  useSetRecoilState(event2023FallInfoAtom);
export const useFetchEvent2023FallInfo = () => {
  const setEvent2023FallInfo = useSetEvent2023FallInfo();
  const axios = useAxios();
  const { id: userId } = useValueRecoilState("loginInfo") || {};

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      if (userId && eventMode === "2023fall") {
        axios({
          url: "/events/2023fall/global-state/",
          method: "get",
          onSuccess: (data) => setEvent2023FallInfo(data),
          onError: onError,
        });
      } else {
        setEvent2023FallInfo(null);
      }
    },
    [userId]
  );
};
