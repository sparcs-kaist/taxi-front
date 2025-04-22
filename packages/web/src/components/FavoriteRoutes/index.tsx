import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

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

  return (
    <div>
      <div style={styleTop}>으하하</div>
      {favoriteRoutes.data.map((route: FavoriteRouteType) => (
        <div key={route.from._id}>
          {route.from.koName} - {route.to.koName}
        </div>
      ))}
    </div>
  );
};

export default FavoriteRoutes;
