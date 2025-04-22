import { useCallback } from "react";

import useQuery, { useAxios } from "@/hooks/useTaxiAPI";

import theme from "@/tools/theme";

const { favoriteRoutesList } =
  useQuery.get("/users/getFavorite", {}, ["favoriteRoutesToken"])[1] || {};

const FavoriteRoutes = () => {
  const axios = useAxios();

  const getFavoriteRoutes = useCallback(async () => {
    const { data } = await axios({ url: "/users/getFavorite", method: "get" });
    return data;
  }, [axios]);

  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };

  return (
    <div>
      <div style={styleTop}>으하하</div>
      {favoriteRoutesList.map((route: any) => (
        <div key={route.from._id}>
          {route.from.koName} - {route.to.koName}
        </div>
      ))}
    </div>
  );
};

export default FavoriteRoutes;
