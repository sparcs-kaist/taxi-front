import React from "react";
import { theme } from "styles/theme";

type Direction = "row" | "column";

type LineProps = {
  direction: Direction;
  margin?: number;
};

const DottedLine = ({ direction, margin = 0 }: LineProps) => {
  const wrapper = {
    height: direction === "row" ? 1 : "100%",
    width: direction === "row" ? `calc(100% - ${2 * margin}px)` : 1,
    margin: direction === "row" ? `0px ${margin}px` : undefined,
  };
  const line = {
    height: direction === "row" ? undefined : "calc(100% + 4px)",
    width: direction === "row" ? "calc(100% + 4px)" : undefined,
    // Row direction
    borderTop:
      direction === "row" ? `5px dotted ${theme.gray_line}` : undefined,
    marginLeft: direction === "row" ? -2 : undefined,
    // Column direction
    borderLeft:
      direction === "column" ? `5px dotted ${theme.gray_line}` : undefined,
    marginTop: direction === "column" ? -2 : undefined,
  };
  return (
    <div style={{ ...wrapper, overflow: "hidden", boxSizing: "border-box" }}>
      <div style={line}></div>
    </div>
  );
};

export default DottedLine;
