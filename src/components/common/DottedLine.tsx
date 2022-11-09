import React from "react";
import theme from "styles/theme";

type Direction = "row" | "column";

type LineProps = {
  direction?: Direction;
  margin?: Exclude<
    Margin,
    `${PixelValue}` | `${PixelValue} ${PixelValue} ${PixelValue} ${PixelValue}`
  >;
};

const DottedLine = ({ direction = "row", margin = "0 0" }: LineProps) => {
  const wrapper = {
    height: direction === "row" ? "1px" : undefined,
    width:
      direction === "row"
        ? `calc(100%${
            margin ? " - 2 * " + margin.toString().split(" ")[1] + "px" : ""
          })`
        : "1px",
    margin: direction === "row" ? margin : undefined,
  };
  const line = {
    height: direction === "row" ? undefined : "calc(100% + 4px)",
    width: direction === "row" ? "calc(100% + 4px)" : undefined,
    // Row direction
    borderTop:
      direction === "row" ? `5px dotted ${theme.gray_line}` : undefined,
    marginLeft: direction === "row" ? "-2px" : undefined,
    // Column direction
    borderLeft:
      direction === "column" ? `5px dotted ${theme.gray_line}` : undefined,
    marginTop: direction === "column" ? "-2px" : undefined,
  };
  return (
    <div style={{ ...wrapper, overflow: "hidden", boxSizing: "border-box" }}>
      <div style={line}></div>
    </div>
  );
};

export default DottedLine;
