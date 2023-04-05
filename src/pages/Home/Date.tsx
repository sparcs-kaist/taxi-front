import { useState } from "react";

import MiniCircle from "components/MiniCircle";

import hoverEventSet from "tools/hoverEventSet";
import moment from "tools/moment";
import theme from "tools/theme";

type DateProps = {
  index: number;
  date: [number, number, number];
  type: Nullable<"today" | "all">;
  width: PixelValue;
  selected: boolean;
  onClick: (date: [number, number, number]) => void;
};

const Date = (props: DateProps) => {
  const [isHover, setHover] = useState(false);
  const week = moment(props.date).day();
  const koWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const style = {
    width: props.width,
  };
  const styleKey = {
    marginBottom: "4px",
    ...theme.font10,
    opacity: 0.632,
    color:
      week == 0 ? theme.red_text : week == 6 ? theme.blue_text : theme.black,
    textAlign: "center" as any,
  };
  const styleBox = {
    width: props.width,
    height: props.width,
    borderRadius: "8px",
    position: "relative" as any,
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
  const styleToday = {
    position: "absolute" as any,
    top: "calc(50% + 8px)",
    left: "calc(50% - 2px)",
  };

  if (!props.date) return <div style={styleBox} />;
  return (
    <div css={style}>
      <div css={styleKey}>{props.type !== "all" && koWeek[week]}</div>
      <div
        css={styleBox}
        onClick={() => props.onClick(props.date)}
        {...hoverEventSet(setHover)}
      >
        <div css={styleDate}>
          {props.type === "all" ? "전체" : props.date[2]}
        </div>
        {props.type === "today" && (
          <div css={styleToday}>
            <MiniCircle type="date" isSelected={props.selected} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Date;
