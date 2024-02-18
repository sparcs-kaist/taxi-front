import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import event2024SpringInfoAtom from "@/atoms/event2024SpringInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";

export const useValueEvent2024SpringInfo = () =>
  useRecoilValue(event2024SpringInfoAtom);
export const useSetEvent2024SpringInfo = () =>
  useSetRecoilState(event2024SpringInfoAtom);
export const useFetchEvent2024SpringInfo = () => {
  const setEvent2024SpringInfo = useSetEvent2024SpringInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    if (eventMode === "2024spring") {
      axios({
        url: "/events/2024spring/globalState/",
        method: "get",
        onSuccess: (data) => setEvent2024SpringInfo(data),
        onError: onError,
      });
    } else {
      setEvent2024SpringInfo(null);
    }
  }, []);
};
