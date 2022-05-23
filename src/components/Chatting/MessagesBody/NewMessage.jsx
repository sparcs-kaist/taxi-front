import React from "react";
import "../Style/NewMessage.css";
import { IoArrowDown } from "react-icons/io5";
import PropTypes from "prop-types";

const NewMessage = (props) => {
  const isReceieveChat = props.isReceieveChat;
  const onClick = props.onClick;
  return (
    <div
      className={"newMessage " + (isReceieveChat ? "on" : "off")}
      onClick={onClick}
    >
      <IoArrowDown className="arrow" />
      새로운 메시지
    </div>
  );
};

NewMessage.propTypes = {
  isReceieveChat: PropTypes.any,
  onClick: PropTypes.any,
};
export default NewMessage;
