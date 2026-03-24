import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

export type MiniGameInfo = {
  _id?: string;
  userId: string;
  level: number;
  creditAmount: number;
  updatedAt: Date;
};

export type ReinforcementResponse = {
  level: number;
  creditAmount: number;
};

export type UpdateCreditResponse = {
  updatedMiniGame: MiniGameInfo;
};

export const useGetMiniGameInfo = () => {
  const axios = useAxios();

  return useCallback(
    (
      onSuccess?: (
        data: {
          miniGameStatus?: MiniGameInfo;
          newMiniGameStatus?: MiniGameInfo;
        }
      ) => void,
      onError?: AxiosOption["onError"]
    ) => {
      axios({
        url: "/miniGame/miniGames/",
        method: "get",
        onSuccess: (data) => {
          if (onSuccess) onSuccess(data);
        },
        onError: onError,
      });
    },
    [axios]
  );
};

export const useReinforcement = () => {
  const axios = useAxios();

  return useCallback(
    (
      onSuccess?: (data: ReinforcementResponse) => void,
      onError?: AxiosOption["onError"]
    ) => {
      axios({
        url: "/miniGame/miniGames/reinforcement",
        method: "post",
        onSuccess: (data) => {
          if (onSuccess) onSuccess(data);
        },
        onError: onError,
      });
    },
    [axios]
  );
};

export const useUpdateCredit = () => {
  const axios = useAxios();

  return useCallback(
    (
      creditAmount: number,
      onSuccess?: (data: UpdateCreditResponse) => void,
      onError?: AxiosOption["onError"]
    ) => {
      axios({
        url: "/miniGame/miniGames/update",
        method: "post",
        data: { creditAmount },
        onSuccess: (data) => {
          if (onSuccess) onSuccess(data);
        },
        onError: onError,
      });
    },
    [axios]
  );
};
