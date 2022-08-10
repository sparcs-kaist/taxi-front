import React from "react";
import PropTypes from "prop-types";

const ChatInOut = (props) => {
  const endText = props.type === "in" ? "입장하였습니다" : "퇴장하였습니다";
  return (
    <div>
      <div style={{ height: "5px" }} />
      <div
        style={{
          display: "flex",
          marginLeft: "12px",
          marginRight: "12px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "3px",
            paddingBottom: "3px",
            lineHieght: "11px",
            fontSize: "9px",
            color: "#888888",
            background: "#EEEEEE",
            borderRadius: "9px",
            textAlign: "center",
          }}
        >
          {props.users.join(" 님, ")} 님이 {endText}
        </div>
      </div>
      <div style={{ height: "5px" }} />
    </div>
  );
};

ChatInOut.propTypes = {
  type: PropTypes.string,
  users: PropTypes.array,
};

export default ChatInOut;
