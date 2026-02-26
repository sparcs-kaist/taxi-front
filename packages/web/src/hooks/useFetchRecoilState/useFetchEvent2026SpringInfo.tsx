import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import event2026SpringInfoAtom from "@/atoms/event2026SpringInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";

export const useValueEvent2026SpringInfo = () =>
  useRecoilValue(event2026SpringInfoAtom);
export const useSetEvent2026SpringInfo = () =>
  useSetRecoilState(event2026SpringInfoAtom);
export const useFetchEvent2026SpringInfo = () => {
  const setEvent2026SpringInfo = useSetEvent2026SpringInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    if (eventMode === "2026spring") {
      axios({
        url: "/events/2026spring/globalState/",
        method: "get",
        onSuccess: (data) => setEvent2026SpringInfo(data),
        onError: onError,
      });
    } else {
      setEvent2026SpringInfo(null);
    }
  }, []);
};
