import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import favoriteRoutesAtom from "@/atoms/favoriteRoutes";
import { useIsLogin } from "@/hooks/useFetchRecoilState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueFavoriteRoutes = () => useRecoilValue(favoriteRoutesAtom);
export const useSetFavoriteRoutes = () => useSetRecoilState(favoriteRoutesAtom);
export const useFetchFavoriteRoutes = () => {
  const setFavoriteRoutes = useSetFavoriteRoutes();
  const axios = useAxios();
  const isLogin = useIsLogin();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      if (!isLogin) {
        setFavoriteRoutes({ data: [] });
        return;
      }
      axios({
        url: "/users/getFavorite",
        method: "get",
        onSuccess: (data) => setFavoriteRoutes({ data: data }),
        onError: onError,
      });
    },
    [setFavoriteRoutes, axios, isLogin]
  );
};
