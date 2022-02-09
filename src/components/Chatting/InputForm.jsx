import React, { useState } from "react";
import { Socket } from "socket.io-client";
import PropTypes from "prop-types";

InputForm.propTypes = {
  socket: PropTypes.any,
};
export default function InputForm(props) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    props.socket.emit("chatEvent", { text: text, time: new Date() });
    setText("");
  };

  const handleKeyDown = (e) => {
    const code = e.code;
    if (code === "Enter") handleClick();
    else return;
  };

  return (
    <div id="inputForm" onKeyDown={handleKeyDown}>
      <input
        type="text"
        name="text"
        className="chatInput"
        onChange={handleChange}
        value={text}
      />
      <input type="button" value="Send" onClick={handleClick} />
    </div>
  );
}
