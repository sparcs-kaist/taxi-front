import { Quest, QuestId } from "@/types/event2024fall";

import { atom } from "recoil";

export type Event2024FallInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  completedQuests: QuestId[];
  creditAmount: number;
  ticket1Amount: number;
  ticket2Amount: number;
  quests: Quest[];
}>;

const event2024FallInfoAtom = atom<Event2024FallInfoType>({
  key: "event2024FallInfoAtom",
  default: null,
});

export default event2024FallInfoAtom;
