import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "components/common/WhiteContainer";
import { theme } from "styles/theme";

import EditRoundedIcon from "@material-ui/icons/EditRounded";

const Name = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
  };
  const styleIcon = {
    width: "15px",
    height: "15px",
    marginLeft: "15px",
  };
  const styleName = {
    ...theme.font14,
    margin: "0px 8px 0px 6px",
    whiteSpace: "nowrap",
  };
  const styleInput = {
    ...theme.font14,
    width: "100%",
    padding: "6px 12px",
    borderRadius: "6px",
    backgroundColor: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    border: "none",
    outline: "none",
  };
  return (
    <WhiteContainer padding="9px">
      <div style={style}>
        <EditRoundedIcon style={styleIcon} />
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
