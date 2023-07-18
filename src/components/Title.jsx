import PropTypes from "prop-types";
import { memo } from "react";

import AdaptiveDiv from "components/AdaptiveDiv";

import theme from "tools/theme";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import FavoriteRoundedIocn from "@mui/icons-material/FavoriteRounded";
import FeedRounedIcon from "@mui/icons-material/FeedRounded";
import HailRoundedIcon from "@mui/icons-material/HailRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LocalTaxiRoundedIcon from "@mui/icons-material/LocalTaxiRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";

const iconStyle = {
  width: "24px",
  height: "24px",
  color: theme.purple,
};

const getIcon = (icon) => {
  switch (icon) {
    case "taxi":
      return <LocalTaxiRoundedIcon style={iconStyle} />;
    case "search":
      return <SearchRoundedIcon style={iconStyle} />;
    case "search_result":
      return <ManageSearchRoundedIcon style={iconStyle} />;
    case "add":
      return <AddRoundedIcon style={iconStyle} />;
    case "myroom":
      return <SubjectRoundedIcon style={iconStyle} />;
    case "current":
      return <HailRoundedIcon style={{ ...iconStyle, marginRight: "-3px" }} />;
    case "past":
      return <HistoryRoundedIcon style={iconStyle} />;
    case "chat":
      return <QuestionAnswerRoundedIcon style={iconStyle} />;
    case "mypage":
      return <PersonOutlineRoundedIcon style={iconStyle} />;
    case "error":
      return <ErrorOutlineRounded style={iconStyle} />;
    case "feed":
      return <FeedRounedIcon style={iconStyle} />;
    case "favorite":
      return <FavoriteRoundedIocn style={iconStyle} />;
    case "notice":
      return <NotificationsActiveRoundedIcon style={iconStyle} />;
    default:
      return <></>;
  }
};

const Title = (props) => {
  const title = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        padding: props.header ? "30px 0 25px" : undefined,
      }}
    >
      {getIcon(props.icon)}
      <div
        style={{
          ...theme.font20,
          color: theme.purple,
          marginLeft: "8px",
        }}
      >
        {props.children}
      </div>
    </div>
  );

  if (props.marginAuto) {
    return (
      <AdaptiveDiv
        type="butterfly"
        left={title}
        right={props.R2 ? <></> : null}
      />
    );
  }
  return title;
};

Title.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
  marginAuto: PropTypes.bool,
  header: PropTypes.bool,
  R2: PropTypes.bool,
};
Title.defaultProps = {
  marginAuto: false,
  header: false,
  R2: false,
};

export default memo(Title);
