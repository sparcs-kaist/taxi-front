import { useState } from "react";
import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";
import MiniCircle from "components/common/MiniCircle";

type DateProps = {
  index: number;
  date: [number, number, number];
  type: Nullable<"today" | "all">;
  selected: boolean;
  onClick: (date: [number, number, number]) => void;
};

const Date = (props: DateProps) => {
  const [isHover, setHover] = useState(false);

  const styleBox: CSS = {
    width: "calc((100% - 42px) / 8)",
    borderRadius: "8px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: props.selected
      ? isHover
        ? theme.purple_dark
        : theme.purple
      : isHover
      ? theme.purple_hover
      : theme.white,
    boxShadow: theme.shadow,
    ...theme.cursor(),
    transitionDuration: theme.duration,
  };
  const styleDate = {
    ...theme.font12,
    letterSpacing: undefined,
    marginTop: "2px",
    fontWeight: props.selected ? 500 : undefined,
    color: props.selected
      ? theme.white
      : props.index === 0
      ? theme.red_text
      : props.index === 6
      ? theme.blue_text
      : theme.black,
  };
  const styleToday: CSS = {
    position: "absolute",
    top: "calc(50% + 8px)",
    left: "calc(50% - 2px)",
  };

  if (!props.date) return <div style={styleBox} />;
  return (
    <div
      style={styleBox}
      onClick={() => props.onClick(props.date)}
      {...hoverEventSet(setHover)}
    >
      <div style={styleDate}>
        {props.type === "all" ? "전체" : props.date[2]}
      </div>
      {props.type === "today" && (
        <div style={styleToday}>
          <MiniCircle type="date" isSelected={props.selected} />
        </div>
      )}
    </div>
  );
};

export default Date;
