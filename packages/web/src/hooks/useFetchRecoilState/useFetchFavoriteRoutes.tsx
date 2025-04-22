import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import favoriteRoutesAtom from "@/atoms/favoriteRoutes";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueFavoriteRoutes = () => useRecoilValue(favoriteRoutesAtom);
export const useSetFavoriteRoutes = () => useSetRecoilState(favoriteRoutesAtom);
export const useFetchFavoriteRoutes = () => {
  const setFavoriteRoutes = useSetFavoriteRoutes();
  const axios = useAxios();

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      axios({
        url: "/users/getFavorite",
        method: "get",
        onSuccess: (data) => setFavoriteRoutes({ data: data }),
        onError: onError,
      });
    },
    [setFavoriteRoutes, axios]
  );
};
