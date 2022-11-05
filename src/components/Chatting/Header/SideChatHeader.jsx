import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import theme from "styles/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SideChatHeader = (props) => {
  const history = useHistory();
  const styleBox = {
    background: theme.purple,
    boxShadow: theme.shadow_3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
  };
  const styleIcon = { color: theme.white, ...theme.cursor() };
  const styleInfoWrap = {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    width: "100%",
    marginLeft: "16px",
  };
  const styleInfo = {
    color: theme.white,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };
  return (
    <div style={styleBox}>
      <ArrowBackRoundedIcon
        style={styleIcon}
        onClick={() => history.push("/myroom")}
      />
      <div style={styleInfoWrap}>
        <div style={{ ...theme.font18, ...styleInfo }}>{props.info?.name}</div>
        <div style={{ ...theme.font12, ...styleInfo }}>
          {props?.info?.from?.koName}&nbsp; → &nbsp;{props?.info?.to?.koName}
        </div>
      </div>
      <MenuRoundedIcon style={styleIcon} onClick={() => {}} />
    </div>
  );
};

SideChatHeader.propTypes = {
  info: PropTypes.object,
};
SideChatHeader.defaultProps = {
  info: {},
};

export default SideChatHeader;
