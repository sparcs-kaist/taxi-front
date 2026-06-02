import { ForwardedRef, forwardRef } from "react";

import type { Chats, LayoutType } from "@/types/chat";

import useChatsForBody from "@/hooks/chat//useChatsForBody";

import LoadingChats from "./LoadingChats";

type ReplyTarget = {
  chatId: string;
  authorName: string;
  content: string;
};

type MessagesBodyProps = {
  layoutType: LayoutType;
  roomInfo: Room;
  chats: Chats;
  readAtList: Array<Date>;
  onSetReplyTarget?: (target: ReplyTarget) => void;
};

const MessagesBody = (
  { layoutType, roomInfo, chats: _chats, readAtList, onSetReplyTarget }: MessagesBodyProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <div
    className="chatting-body"
    css={{
      flexBasis: "1px",
      flexGrow: 1,
      position: "relative",
      overflow: "auto",
      boxSizing: "border-box",
      paddingBottom: "12px",
    }}
    ref={ref}
  >
    {_chats.length <= 0 && <LoadingChats />}
    {useChatsForBody(
      _chats.filter(
        (chat) =>
          (chat.type !== "wordChain" ||
            /첫 단어는\s*["'](.+?)["']입니다/.test(chat.content)) &&
          chat.type !== "raceLog" &&
          chat.type !== "gameRecommendation"
      ),
      layoutType,
      roomInfo,
      readAtList,
      onSetReplyTarget,
      typeof ref === "object" ? ref ?? undefined : undefined
    )}
  </div>
);

export default forwardRef<HTMLDivElement, MessagesBodyProps>(MessagesBody);
