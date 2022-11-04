import React from "react";
import { theme } from "styles/theme";

type MiniCircleProps = {
  type: "from" | "to";
  isRequired?: boolean;
};

const MiniCircle = ({ type, isRequired = false }: MiniCircleProps) => {
  const style: CSS = {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    boxSizing: "border-box",
    backgroundColor:
      type === "from" ? undefined : isRequired ? theme.black : theme.gray_text,
    border: `1px solid ${isRequired ? theme.black : theme.gray_text}`,
  };
  return <div style={style} />;
};

export default MiniCircle;
