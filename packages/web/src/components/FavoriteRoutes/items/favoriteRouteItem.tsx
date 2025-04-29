import { FavoriteRouteType } from "@/atoms/favoriteRoutes";

type FavoriteRouteItemProps = FavoriteRouteType & {
  onDelete: (id: string) => void;
};

const FavoriteRouteItem = ({
  _id,
  from,
  to,
  onDelete,
}: FavoriteRouteItemProps) => (
  <div key={_id} onClick={() => onDelete(_id || "")}>
    {from.koName} - {to.koName}
  </div>
);

export default FavoriteRouteItem;
