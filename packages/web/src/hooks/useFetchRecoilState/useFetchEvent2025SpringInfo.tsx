import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import event2025SpringInfoAtom from "@/atoms/event2025SpringInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";

export const useValueEvent2025SpringInfo = () =>
  useRecoilValue(event2025SpringInfoAtom);
export const useSetEvent2025SpringInfo = () =>
  useSetRecoilState(event2025SpringInfoAtom);
export const useFetchEvent2025SpringInfo = () => {
  const setEvent2025SpringInfo = useSetEvent2025SpringInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    if (eventMode === "2025spring") {
      axios({
        url: "/events/2025spring/globalState/",
        method: "get",
        onSuccess: (data) => setEvent2025SpringInfo(data),
        onError: onError,
      });
    } else {
      setEvent2025SpringInfo(null);
    }
  }, []);
};
