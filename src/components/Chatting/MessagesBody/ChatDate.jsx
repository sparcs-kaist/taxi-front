import React from "react";
import PropTypes from "prop-types";

const ChatDate = (props) => {
  const year = props.date.year();
  const month = props.date.month() + 1;
  const date = props.date.date();

  return (
    <div>
      <div style={{ height: "10px" }} />
      <div
        style={{
          position: "relative",
          marginLeft: "12px",
          marginRight: "12px",
          height: "12px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "0px",
            height: "1px",
            width: "calc(50% - 50px)",
            backgroundImage:
              "linear-gradient(to left, rgb(200, 200, 200) 50%, rgba(255, 255, 255, 0) 0%)",
            backgroundSize: "10px 1px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "5px",
            right: "0px",
            height: "1px",
            width: "calc(50% - 50px)",
            backgroundImage:
              "linear-gradient(to right, rgb(200, 200, 200) 50%, rgba(255, 255, 255, 0) 0%)",
            backgroundSize: "10px 1px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "calc(50% - 55px)",
            width: "110px",
            height: "12px",
            fontSize: "10px",
            lineHeight: "12px",
            textAlign: "center",
            color: "#888888",
          }}
        >
          {year}년 {month}월 {date}일
        </div>
      </div>
      <div style={{ height: "10px" }} />
    </div>
  );
};
ChatDate.propTypes = {
  date: PropTypes.any,
};

export default ChatDate;
