import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import event2024FallInfoAtom from "@/atoms/event2024FallInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";

export const useValueEvent2024FallInfo = () =>
  useRecoilValue(event2024FallInfoAtom);
export const useSetEvent2024FallInfo = () =>
  useSetRecoilState(event2024FallInfoAtom);
export const useFetchEvent2024FallInfo = () => {
  const setEvent2024FallInfo = useSetEvent2024FallInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    if (eventMode === "2024fall") {
      axios({
        url: "/events/2024fall/global-state/",
        method: "get",
        onSuccess: (data) => setEvent2024FallInfo(data),
        onError: onError,
      });
    } else {
      setEvent2024FallInfo(null);
    }
  }, []);
};
