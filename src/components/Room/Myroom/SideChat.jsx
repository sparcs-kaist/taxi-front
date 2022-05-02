import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chatting from "../../Chatting/Chatting"
const SideChat = ({roomId, onClose}) => {
  const styleChat = {
      width: "100px",
      height: "100px",
      backgroundColor: "yellow",
  }
  return (
    <div>
      {roomId}
      <div style={styleChat}>
        <Chatting roomId={roomId}/>
      </div>
    </div>
  );
};
SideChat.propTypes = {
  roomId: PropTypes.string,
  onClose: PropTypes.func,
};

export default SideChat;
