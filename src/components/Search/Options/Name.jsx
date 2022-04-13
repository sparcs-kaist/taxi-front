import React, { useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";

const Name = (props) => {
  const style = {
    display: "flex",
    alignContent: "row",
    alginItems: "center",
  };
  const styleIcon = {
    width: "14px",
    height: "20px",
    marginLeft: "15px",
    marginTop: "2px",
    fill: "black",
  };
  const styleName = {
    marginLeft: "5px",
    fontSize: "16px",
    color: "black",
  };
  const styleInput = {
    height: "28px",
    width: "calc(100% - 110px)",
    marginLeft: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    backgroundColor: "#FAFAFA",
    boxShadow: "inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
    color: "black",
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
