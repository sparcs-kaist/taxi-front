import React from "react";
import PropTypes from "prop-types"

Chat.propTypes = {
  author: PropTypes.string,
  text: PropTypes.string,
  time: PropTypes.string
}
export default function Chat(props) {
  // const [chat, setChat] = useState<chat>({ author: props.author, text: props.text, time: props.time })
  // FIXME chat을 state로서 유지하고 싶다면?
  const handleClick = () => {
    console.log("hello");
  }

  return (
    <tr>
      <td className="author">{props.author}</td>
      <td className="chatText">{props.text}</td>
      <td className="time">{new Date(props.time).toLocaleTimeString("ko-KR")}</td>
      <td><input type="button" onClick={handleClick} /></td>
    </tr>
  );
}