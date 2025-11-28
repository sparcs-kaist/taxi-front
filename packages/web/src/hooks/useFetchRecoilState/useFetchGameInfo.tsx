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

<<<<<<< HEAD
  return useCallback((onError?: AxiosOption["onError"]) => {
    axios({
      url: "/miniGame/miniGames/",
      method: "get",
      onSuccess: (data) => setGameInfo(data),
      onError: onError,
    });
  }, []);
};
export const useFetchEnforceGameInfo = () => {
  const setGameInfo = useSetGameInfo();
  const axios = useAxios();

  return useCallback((onError?: AxiosOption["onError"]) => {
    axios({
      url: "/miniGame/miniGames/reinforcement",
      method: "get",
      onSuccess: (data) => setGameInfo(data),
      onError: onError,
    });
  }, []);
=======
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
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
};
