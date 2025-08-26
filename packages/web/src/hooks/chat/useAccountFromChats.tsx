import { useMemo } from "react";

import type { Chat, Chats } from "@/types/chat";

export default (chats: Chats): string | null => {
  return useMemo(() => {
    const accountChats = chats
      .filter((chat: Chat) => chat.type === "account")
      .reverse();
    for (const chat of accountChats) {
      if ("content" in chat && chat.content !== "") {
        return chat.content;
      }
    }
    return null;
  }, [chats]);
};
