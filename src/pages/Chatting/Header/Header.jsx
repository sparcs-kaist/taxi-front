import PropTypes from "prop-types";

import FullChatHeader from "./FullChatHeader";
import SideChatHeader from "./SideChatHeader";

const Header = (props) => {
  return props.isSideChat ? (
    <SideChatHeader info={props.info} />
  ) : (
    <FullChatHeader info={props.info} recallEvent={props.recallEvent} />
  );
};

Header.propTypes = {
  isSideChat: PropTypes.bool,
  info: PropTypes.any,
  recallEvent: PropTypes.func,
};

export default Header;
