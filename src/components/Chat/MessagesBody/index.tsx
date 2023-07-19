import { ForwardedRef, forwardRef } from "react";

import { LayoutType } from "types/chatting";

import useChatsForBody from "hooks/chat//useChatsForBody";

import { Chats } from "tools/chat/chats";

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
    {useChatsForBody(_chats, layoutType)}
  </div>
);

export default forwardRef<HTMLDivElement, MessagesBodyProps>(MessagesBody);
