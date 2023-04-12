import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import theme from "tools/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

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
    margin: "0 8px 0 16px",
    minWidth: "0px",
  };
  const styleInfo = {
    color: theme.white,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  return (
    <div css={styleBox}>
      <ArrowBackRoundedIcon
        style={styleIcon}
        onClick={() => history.goBack()}
      />
      <div css={styleInfoWrap}>
        <div css={{ ...theme.font18, ...styleInfo }}>{props.info?.name}</div>
        <div css={{ ...theme.font12, ...styleInfo }}>
          {props?.info?.from?.koName}&nbsp; → &nbsp;{props?.info?.to?.koName}
        </div>
      </div>
      <Link to={`/chatting/${props.info?._id}`} replace>
        <OpenInFullRoundedIcon style={{ ...styleIcon, fontSize: "22px" }} />
      </Link>
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
