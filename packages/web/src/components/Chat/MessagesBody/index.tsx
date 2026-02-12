import { ForwardedRef, forwardRef } from "react";

import type { Chats, LayoutType } from "@/types/chat";

import useChatsForBody from "@/hooks/chat//useChatsForBody";

import LoadingChats from "./LoadingChats";

type MessagesBodyProps = {
  layoutType: LayoutType;
  roomInfo: Room;
  chats: Chats;
  readAtList: Array<Date>;
};

const MessagesBody = (
  { layoutType, roomInfo, chats: _chats, readAtList }: MessagesBodyProps,
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
          chat.type !== "wordChain" ||
          /첫 단어는\s*["'](.+?)["']입니다/.test(chat.content)
      ),
      layoutType,
      roomInfo,
      readAtList
    )}
  </div>
);

export default forwardRef<HTMLDivElement, MessagesBodyProps>(MessagesBody);
