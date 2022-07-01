import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "@frames/WhiteContainer/WhiteContainer";

import CreateIcon from "@material-ui/icons/Create";

const Name = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
  };
  const styleIcon = {
    width: "14px",
    height: "14px",
    marginLeft: "15px",
    marginBottom: "2px",
  };
  const styleName = {
    height: "28px",
    lineHeight: "28px",
    marginLeft: "6px",
    marginRight: "6px",
    whiteSpace: "nowrap",
    fontSize: "14px",
  };
  const styleInput = {
    height: "28px",
    width: "100%",
    paddingLeft: "12px",
    paddingRight: "12px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    backgroundColor: "#FAFAFA",
    boxShadow: "inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
    fontSize: "14px",
  };
  return (
    <WhiteContainer marginAuto={false} padding="9px">
      <div style={style}>
        <CreateIcon style={styleIcon} />
        <div style={styleName}>방 이름 :</div>
        <input
          onChange={(e) => props.handler(e.target.value)}
          type="text"
          style={styleInput}
          value={props.value}
        />
      </div>
    </WhiteContainer>
  );
};
Name.propTypes = {
  value: PropTypes.string,
  handler: PropTypes.func,
};

export default Name;
