import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chatting from "../../Chatting/Chatting"
const SideChat = (props) => {
  return (
    <div>
      {props.id}
      <div>
        <Chatting/>
      </div>
    </div>
  );
};
SideChat.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func,
};

export default SideChat;
