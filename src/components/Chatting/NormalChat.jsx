import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chatting from "@components/Chatting/Chatting";
import { useParams } from "react-router-dom";

const NormalChat = () => {
  const { roomId } = useParams();
  return <Chatting roomId={roomId} isSideChat={false} />;
};

export default NormalChat;
