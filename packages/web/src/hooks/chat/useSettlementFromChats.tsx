import { useMemo } from "react";

import type { Chats } from "@/types/chat";

type SettlementProps = {
    total: number;
    perPerson: number;
    participationCount: number;
}

export default (chats: Chats): Nullable<SettlementProps> => {
  return useMemo(() => {
    const settlementChats = chats
      .filter((chat) => chat.type === "settlement")
      .reverse();
    for (const chat of settlementChats) {
      if ("content" in chat && chat.content !== "") {
        return JSON.parse(chat.content);
      }
    }
    return null;
  }, [chats]);
};
