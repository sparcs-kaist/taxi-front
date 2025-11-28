import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import gameInfoAtom from "@/atoms/gameInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueGameInfo = () =>
  useRecoilValue(gameInfoAtom);
export const useSetGameInfo = () =>
  useSetRecoilState(gameInfoAtom);
export const useFetchGameInfo = () => {
  const setGameInfo = useSetGameInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    axios({
        url: "/game/globalState/",
        method: "get",
        onSuccess: (data) => setGameInfo(data),
        onError: onError,
      });
  }, []);
};
