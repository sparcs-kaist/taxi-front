import { useCallback } from "react";

import { useGetMiniGameInfo } from "@/hooks/game/useMiniGame";
import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import gameInfoAtom from "@/atoms/gameInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueGameInfo = () => useRecoilValue(gameInfoAtom);
export const useSetGameInfo = () => useSetRecoilState(gameInfoAtom);
export const useFetchGameInfo = () => {
  const setGameInfo = useSetGameInfo();
  const axios = useAxios();
  const getMiniGameInfo = useGetMiniGameInfo();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      axios({
        url: "/game/globalState/",
        method: "get",
        onSuccess: (data) => {
          // Also fetch miniGame info to merge level
          getMiniGameInfo(
            (miniGameData) => {
              const miniGameStatus =
                miniGameData.miniGameStatus || miniGameData.newMiniGameStatus;
              if (miniGameStatus) {
                setGameInfo({ ...data, level: miniGameStatus.level });
              } else {
                setGameInfo(data);
              }
            },
            () => {
              // If miniGame fetch fails, just set gameInfo without level
              setGameInfo(data);
            }
          );
        },
        onError: onError,
      });
    },
    [axios, getMiniGameInfo, setGameInfo]
  );
};
