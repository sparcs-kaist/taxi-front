import React from "react";

type Direction = "row" | "column";

type LineProps = {
  direction: Direction;
};

const DottedLine = ({ direction }: LineProps) => {
  const Wrapper = {
    height: direction == "row" ? 1 : "100%",
    width: direction == "row" ? "100%" : 1,
  };
  const line = {
    height: direction == "row" ? undefined : "calc(100% + 5px)",
    width: direction == "row" ? "calc(100% + 5px)" : undefined,
    borderLeft: direction == "row" ? undefined : "5px dotted #C8C8C8",
    borderTop: direction == "row" ? "5px dotted #C8C8C8" : undefined,
    marginLeft: direction == "row" ? -2.5 : undefined,
    marginTop: direction == "row" ? undefined : -2.5,
  };
  return (
    <div style={{ ...Wrapper, overflow: "hidden" }}>
      <div style={line}></div>
    </div>
  );
};

export default DottedLine;
