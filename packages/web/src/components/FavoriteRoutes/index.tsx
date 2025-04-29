import { useCallback, useRef } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useFetchFavoriteRoutes } from "@/hooks/useFetchRecoilState/useFetchFavoriteRoutes";
import { useAxios } from "@/hooks/useTaxiAPI";

import { FavoriteRouteType } from "@/atoms/favoriteRoutes";

import theme from "@/tools/theme";

const FavoriteRoutes = () => {
  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };
  const favoriteRoutes = useValueRecoilState("favoriteRoutes") || [];
  const isAxiosCalled = useRef(false);
  const axios = useAxios();
  const fetchFavoriteRoutes = useFetchFavoriteRoutes();

  const onCreateFavorite = useCallback(
    async (from: string, to: string) => {
      if (isAxiosCalled.current) return;
      isAxiosCalled.current = true;
      const data = {
        from: from,
        to: to,
      };
      await axios({
        url: "/users/createFavorite",
        method: "post",
        data,
      }).then(() => {
        fetchFavoriteRoutes();
        isAxiosCalled.current = false;
      });
    },
    [fetchFavoriteRoutes, isAxiosCalled]
  );

  return (
    <div>
      <div
        style={styleTop}
        onClick={() => {
          onCreateFavorite(
            "67985fcebe99bc902387d0c3",
            "67985fcebe99bc902387d0c9"
          );
        }}
      >
        으하하
      </div>
      {favoriteRoutes.data.map((route: FavoriteRouteType) => (
        <div key={route.from._id}>
          {route.from.koName} - {route.to.koName}
        </div>
      ))}
    </div>
  );
};

export default FavoriteRoutes;
