import React from "react";
import PropTypes from "prop-types";
import Chatting from "@components/Chatting/Chatting";

const Chat = (props) => {
  return (
    <div>
      <Chatting roomId={props.roomId} />
    </div>
  );
};

Chat.propTypes = {
  roomId: PropTypes.string,
};

export default Chat;
