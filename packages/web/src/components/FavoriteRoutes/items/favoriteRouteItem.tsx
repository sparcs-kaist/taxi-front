import { FavoriteRouteType } from "@/atoms/favoriteRoutes";
import theme from "@/tools/theme";
import useHoverProps from "@/hooks/theme/useHoverProps";

type FavoriteRouteItemProps = FavoriteRouteType & {
  onDelete: (id: string) => void;
  handler: (place: string[]) => void;
};

const FavoriteRouteItem = ({
  _id,
  from,
  to,
  onDelete,
  handler,
}: FavoriteRouteItemProps) => {
  const [hoverProps, isHover] = useHoverProps();

  const styleContainer: CSS = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "8px",
    background: isHover ? theme.purple_hover : theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    ...theme.cursor(),
    transitionDuration: theme.duration,
  };

  const styleText: CSS = {
    ...theme.font14,
    color: theme.black,
  };

  const styleButton: CSS = {
    ...theme.font12,
    color: theme.gray_text,
    ...theme.cursor(),
  };

  return (
    <div
      key={_id}
      style={styleContainer}
      onClick={() => {
        if (from._id && to._id) {
          handler([from._id, to._id]);
        }
      }}
      {...hoverProps}
    >
      <div style={styleText}>
        {from.koName} - {to.koName}
      </div>
      <div
        style={styleButton}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(_id || "");
        }}
      >
        삭제
      </div>
    </div>
  );
};

export default FavoriteRouteItem;
