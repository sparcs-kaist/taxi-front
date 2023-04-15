import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import notificationOptionsAtom from "atoms/notificationOptions";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueNotificationOptions = () =>
  useRecoilValue(notificationOptionsAtom);
export const useSetNotificationOptions = () =>
  useSetRecoilState(notificationOptionsAtom);
export const useFetchNotificationOptions = (
  onError?: AxiosOption["onError"]
) => {
  const setNotificationOptions = useSetNotificationOptions();
  const axios = useAxios();
  const { deviceToken } = useValueRecoilState("loginInfo") || {};

  return useCallback(() => {
    if (deviceToken) {
      axios({
        url: "/notifications/options",
        method: "get",
        onSuccess: (data) => setNotificationOptions(data),
        onError: onError,
      });
    } else setNotificationOptions(null);
  }, [deviceToken, setNotificationOptions, axios]);
};
