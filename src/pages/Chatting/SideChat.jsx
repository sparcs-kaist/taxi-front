import PropTypes from "prop-types";
import Chatting from "pages/Chatting/Chatting";
import theme from "tools/theme";

const SideChat = ({ roomId }) => {
  const styleSideChat = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: theme.shadow,
    backgroundColor: theme.white,
  };
  return (
    <div style={styleSideChat}>
      <Chatting roomId={roomId} isSideChat />
    </div>
  );
};

SideChat.propTypes = {
  roomId: PropTypes.string,
};

export default SideChat;
