import { Quest, QuestId } from "@/types/event2024fall";

import { atom } from "recoil";

type CompletedQuest = {
  questId: QuestId;
  completedAt: Date;
};

export type Event2024FallInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  isBanned: boolean;
  creditAmount: number;
  quests: Quest[];
  completedQuests: CompletedQuest[];
}>;

const event2024FallInfoAtom = atom<Event2024FallInfoType>({
  key: "event2024FallInfoAtom",
  default: null,
});

export default event2024FallInfoAtom;
