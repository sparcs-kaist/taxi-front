import loginInfoAtom from "@/atoms/loginInfo";
import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";
import { useCallback } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueLoginInfo = () => useRecoilValue(loginInfoAtom);
export const useSetLoginInfo = () => useSetRecoilState(loginInfoAtom);
export const useFetchLoginInfo = () => {
  const setLoginInfo = useSetLoginInfo();
  const axios = useAxios();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      axios({
        url: "/logininfo",
        method: "get",
        onSuccess: (data) => setLoginInfo(data),
        onError: onError,
      });
    },
    [setLoginInfo, axios]
  );
};
