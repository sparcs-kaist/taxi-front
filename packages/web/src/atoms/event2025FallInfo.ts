import { Quest, QuestId } from "@/types/event2025fall";

import { atom } from "recoil";

type CompletedQuest = {
  questId: QuestId;
  completedAt: Date;
};

export type Event2025FallInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  isBanned: boolean;
  ticketAmount: number;
  quests: Quest[];
  completedQuests: CompletedQuest[];
}>;

const event2025FallInfoAtom = atom<Event2025FallInfoType>({
  key: "event2025FallInfoAtom",
  default: null,
});

export default event2025FallInfoAtom;
