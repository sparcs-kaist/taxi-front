import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import eventInfoAtom from "atoms/eventInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueEventInfo = () => useRecoilValue(eventInfoAtom);
export const useSetEventInfo = () => useSetRecoilState(eventInfoAtom);
export const useFetchEventInfo = () => {
  const setEventInfo = useSetEventInfo();
  const axios = useAxios();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      axios({
        url: "/events/2023fall/global-state/",
        method: "get",
        onSuccess: (data) => setEventInfo(data),
        onError: onError,
      });
    },
    [setEventInfo, axios]
  );
};
