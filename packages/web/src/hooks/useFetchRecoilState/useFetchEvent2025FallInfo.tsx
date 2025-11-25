import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import event2025FallInfoAtom from "@/atoms/event2025FallInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";

export const useValueEvent2025FallInfo = () =>
  useRecoilValue(event2025FallInfoAtom);
export const useSetEvent2025FallInfo = () =>
  useSetRecoilState(event2025FallInfoAtom);
export const useFetchEvent2025FallInfo = () => {
  const setEvent2025FallInfo = useSetEvent2025FallInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    if (eventMode === "2025fall") {
      axios({
        url: "/events/2025fall/globalState/",
        method: "get",
        onSuccess: (data) => setEvent2025FallInfo(data),
        onError: onError,
      });
    } else {
      setEvent2025FallInfo(null);
    }
  }, []);
};
