import Chatting from "./index";

import theme from "tools/theme";

type SideChatProps = {
  roomId: string;
};

const SideChat = ({ roomId }: SideChatProps) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column" as any,
      height: "100%",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: theme.shadow,
      backgroundColor: theme.white,
    }}
  >
    <Chatting roomId={roomId} layoutType="sidechat" />
  </div>
);

export default SideChat;
