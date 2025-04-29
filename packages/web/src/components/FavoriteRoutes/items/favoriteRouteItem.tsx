import { FavoriteRouteType } from "@/atoms/favoriteRoutes";

const FavoriteRouteItem = ({ _id, from, to }: FavoriteRouteType) => (
  <div key={_id}>
    {from.koName} - {to.koName}
  </div>
);

export default FavoriteRouteItem;
