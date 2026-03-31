import { useMemo } from "react";

import type { Chats } from "@/types/chat";

type SettlementProps = {
  total: number;
  perPerson: number;
  participationCount: number;
};

export default (chats: Chats): Nullable<SettlementProps> => {
  return useMemo(() => {
    const settlementChats = chats
      .filter((chat) => chat.type === "settlement")
      .reverse();
    for (const chat of settlementChats) {
      if ("content" in chat && chat.content !== "") {
        const raw = String(chat.content).trim();
        // 오래된 방은 json 형식이 아닐 수 있음
        if (!(raw.startsWith("{") || raw.startsWith("["))) continue;
        try {
          return JSON.parse(raw) as SettlementProps;
        } catch {
          continue;
        }
      }
    }
    return null;
  }, [chats]);
};
