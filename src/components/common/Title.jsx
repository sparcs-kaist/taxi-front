import React from "react";
import PropTypes from "prop-types";
import RLayout from "components/common/RLayout";
import theme from "styles/theme";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import HailRoundedIcon from "@mui/icons-material/HailRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";

const iconStyle = {
  width: "24px",
  height: "24px",
  color: theme.purple,
};

const getIcon = (icon) => {
  switch (icon) {
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
      <RLayout.R2
        left={title}
        right={props.R2 ? <></> : null}
        priority="left"
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

export default Title;
