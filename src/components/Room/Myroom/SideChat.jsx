import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SideChat = (props) => {
  return <div>{props.id}</div>;
};
SideChat.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func,
};

export default SideChat;
