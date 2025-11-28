import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from "./index";

import gameInfoAtom from "@/atoms/gameInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

// loginInfo 가져오기 위해 필요

export const useValueGameInfo = () => useRecoilValue(gameInfoAtom);
export const useSetGameInfo = () => useSetRecoilState(gameInfoAtom);

export const useFetchGameInfo = () => {
  const setGameInfo = useSetGameInfo();
  const axios = useAxios();

  // [추가] 로그인 정보(userId) 가져오기
  const loginInfo = useValueRecoilState("loginInfo");
  const userId = loginInfo?.id;

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      // [수정] userId가 있을 때만 API 호출
      if (userId) {
        axios({
          url: "/miniGame/miniGames/",
          method: "get",
          onSuccess: (data) => setGameInfo(data.miniGameStatus),
          onError: onError,
        });
      } else {
        // [추가] 로그인이 안 되어 있으면 기본값(null 등)으로 설정하거나 아무것도 안 함
        // setGameInfo(null);
      }
    },
    [userId, axios, setGameInfo]
  ); // 의존성 배열에 userId 추가
};

export const useFetchEnforceGameInfo = () => {
  const setGameInfo = useSetGameInfo();
  const axios = useAxios();

  // [추가] 로그인 정보 가져오기
  const loginInfo = useValueRecoilState("loginInfo");
  const userId = loginInfo?.id;

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      // [수정] userId가 있을 때만 API 호출
      if (userId) {
        axios({
          url: "/miniGame/miniGames/reinforcement",
          method: "get",
          onSuccess: (data) => setGameInfo(data.miniGameStatus),
          onError: onError,
        });
      }
    },
    [userId, axios, setGameInfo]
  );
};
