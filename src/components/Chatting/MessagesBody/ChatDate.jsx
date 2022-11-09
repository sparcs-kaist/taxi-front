import React from "react";
import PropTypes from "prop-types";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";

const ChatDate = (props) => {
  const year = props.date.year();
  const month = props.date.month() + 1;
  const date = props.date.date();

  return (
    <div
      style={{
        position: "relative",
        margin: "6px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <DottedLine />
      <div
        style={{
          ...theme.font10,
          margin: "0 12px",
          color: theme.gray_text,
          minWidth: "fit-content",
        }}
      >
        {year}년 {month}월 {date}일
      </div>
      <DottedLine />
    </div>
  );
};
ChatDate.propTypes = {
  date: PropTypes.any,
};

export default ChatDate;
