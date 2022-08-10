import React from "react";
import PropTypes from "prop-types";
import RLayout from "components/common/RLayout";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LocalTaxiRoundedIcon from "@material-ui/icons/LocalTaxiRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";

const iconStyle = {
  width: "24px",
  height: "24px",
  color: "var(--purple)",
};

const getIcon = (icon) => {
  switch (icon) {
    case "search":
      return <SearchRoundedIcon style={iconStyle} />;
    case "search_result":
      return <ListAltRoundedIcon style={iconStyle} />;
    case "add":
      return <LibraryAddRoundedIcon style={iconStyle} />;
    case "myroom":
      return <LibraryBooksRoundedIcon style={iconStyle} />;
    case "current":
      return <LocalTaxiRoundedIcon style={iconStyle} />;
    case "past":
      return <HistoryRoundedIcon style={iconStyle} />;
    case "chat":
      return <QuestionAnswerRoundedIcon style={iconStyle} />;
    case "mypage":
      return <AccountCircleRoundedIcon style={iconStyle} />;
    default:
      return <></>;
  }
};

const Title = (props) => {
  const title = (
    <div>
      <div style={{ height: props.header ? "30px" : "0px" }} />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {getIcon(props.icon)}
        <div
          style={{
            marginLeft: "8px",
            lineHeight: "23px",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.03em",
            color: "var(--purple)",
          }}
        >
          {props.children}
        </div>
      </div>
      <div style={{ height: props.header ? "25px" : "0px" }} />
    </div>
  );

  if (props.marginAuto) {
    return <RLayout.R1>{title}</RLayout.R1>;
  }
  return title;
};

Title.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
  marginAuto: PropTypes.bool,
  header: PropTypes.bool,
};
Title.defaultProps = {
  marginAuto: true,
  header: false,
};

export default Title;
