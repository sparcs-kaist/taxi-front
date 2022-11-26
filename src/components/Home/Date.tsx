import React, { useState } from "react";
import theme from "styles/theme";
import MiniCircle from "components/common/MiniCircle";
import "components/common/room/Room.css";

type DateProps = {
  index: number;
  year: number;
  month: number;
  date: number;
  available: boolean | string;
  selected: boolean;
  onClick: (x: number, y: number, z: number) => void;
};

const Date = (props: DateProps) => {
  const [isHover, setHover] = useState(false);

  const styleBox: CSS = {
    width: "calc((100% - 36px) / 7)",
    height: "100%",
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
    ...theme.cursor(!props.available),
    transitionDuration: theme.duration,
  };
  const styleDate = {
    ...theme.font12,
    letterSpacing: undefined,
    marginTop: "1px",
    fontWeight: props.selected ? 500 : undefined,
    color: props.selected
      ? theme.white
      : props.available
      ? props.index === 0
        ? theme.red_text
        : props.index === 6
        ? theme.blue_text
        : theme.black
      : theme.gray_line,
  };
  const styleToday: CSS = {
    position: "absolute",
    top: "calc(50% + 8.5px)",
    left: "calc(50% - 2px)",
  };

  if (!props.date) return <div style={styleBox} />;
  return (
    <div
      style={styleBox}
      className="shadow"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => props.onClick(props.year, props.month, props.date)}
    >
      <div style={styleDate}>{props.date}</div>
      {props.available === "today" && (
        <div style={styleToday}>
          <MiniCircle type="date" isSelected={props.selected} />
        </div>
      )}
    </div>
  );
};

export default Date;
