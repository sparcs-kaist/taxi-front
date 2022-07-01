import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chatting from "@components/Chatting/Chatting";

const SideChat = ({ roomId, onClose }) => {
  const styleSideChat = {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  return (
    <div style={styleSideChat}>
      <Chatting roomId={roomId} />
    </div>
  );
};

SideChat.propTypes = {
  roomId: PropTypes.string,
  onClose: PropTypes.func,
};

export default SideChat;
