import { Quest, QuestId } from "@/types/event2026spring";

import { atom } from "recoil";

type CompletedQuest = {
  questId: QuestId;
  completedAt: Date;
};

export type Event2026SpringInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  isBanned: boolean;
  creditAmount: number;
  quests: Quest[];
  completedQuests: CompletedQuest[];
}>;

const event2026SpringInfoAtom = atom<Event2026SpringInfoType>({
  key: "event2026SpringInfoAtom",
  default: null,
});

export default event2026SpringInfoAtom;
