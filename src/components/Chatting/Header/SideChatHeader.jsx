import React from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import theme from "styles/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SideChatHeader = (props) => {
  const history = useHistory();
  const { roomId } = useParams();

  const styleBox = {
    background: theme.purple,
    boxShadow: theme.shadow_3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
  };
  const styleIcon = { color: theme.white, cursor: theme.cursor() };
  const styleInfoWrap = {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    width: "100%",
    marginLeft: "16px",
    minWidth: "0px",
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
      <FullscreenRoundedIcon
        style={{ ...styleIcon, marginRight: "12px" }}
        onClick={() => history.replace(`/chatting/${roomId}`)}
      />
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
