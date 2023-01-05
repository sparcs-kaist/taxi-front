import React from "react";
import PropTypes from "prop-types";
import theme from "styles/theme";

const ChatInOut = (props) => {
  const endText = props.type === "in" ? "입장하였습니다" : "퇴장하였습니다";
  return (
    <div style={{ paddingTop: "10px" }}>
      <div
        style={{
          padding: "4px 8px 3px",
          ...theme.font10,
          color: theme.gray_text,
          background: theme.gray_background,
          borderRadius: "10px",
          textAlign: "center",
          width: "fit-content",
          margin: "auto",
        }}
      >
        {props.users.join(" 님, ")} 님이 {endText}
      </div>
    </div>
  );
};

ChatInOut.propTypes = {
  type: PropTypes.string,
  users: PropTypes.array,
};

export default ChatInOut;
