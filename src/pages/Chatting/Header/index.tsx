import FullChatHeader from "./FullChatHeader";
import SideChatHeader from "./SideChatHeader";

type HeaderProps = {
  layoutType: "sidechat" | "fullchat";
  info: any; // fixme
  recallEvent?: () => void; // fixme
};

const Header = ({ layoutType, info, recallEvent }: HeaderProps) =>
  layoutType === "sidechat" ? (
    <SideChatHeader info={info} />
  ) : (
    <FullChatHeader info={info} recallEvent={recallEvent} />
  );

export default Header;
