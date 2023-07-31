import { ForwardedRef, forwardRef } from "react";

import type { Chats, LayoutType } from "types/chat";

import useChatsForBody from "hooks/chat//useChatsForBody";

import LoadingChats from "./LoadingChats";

type MessagesBodyProps = {
  layoutType: LayoutType;
  chats: Chats;
};

const MessagesBody = (
  { layoutType, chats: _chats }: MessagesBodyProps,
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
    {useChatsForBody(_chats, layoutType)}
  </div>
);

export default forwardRef<HTMLDivElement, MessagesBodyProps>(MessagesBody);
