import { Quest, QuestId } from "@/types/event2025spring";

import { atom } from "recoil";

type CompletedQuest = {
  questId: QuestId;
  completedAt: Date;
};

export type Event2025SpringInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  isBanned: boolean;
  creditAmount: number;
  quests: Quest[];
  completedQuests: CompletedQuest[];
}>;

const event2025SpringInfoAtom = atom<Event2025SpringInfoType>({
  key: "event2025SpringInfoAtom",
  default: null,
});

export default event2025SpringInfoAtom;
