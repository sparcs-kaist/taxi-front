import type { Chats } from "@/types/chat";
import { useMemo } from "react";

export default (chats: Chats): Nullable<string> => {
  return useMemo(() => {
    const accountChats = chats
      .filter((chat) => chat.type === "account")
      .reverse();
    for (const chat of accountChats) {
      if ("content" in chat && chat.content !== "") {
        return chat.content;
      }
    }
    return null;
  }, [chats]);
};
