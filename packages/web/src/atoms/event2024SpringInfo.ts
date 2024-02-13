import { Quest, QuestId } from "@/types/event2024spring";

import { atom } from "recoil";

export type Event2024SpringInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  completedQuests: QuestId[];
  creditAmount: number;
  ticket1Amount: number;
  ticket2Amount: number;
  quests: Quest[];
}>;

const event2024SpringInfoAtom = atom<Event2024SpringInfoType>({
  key: "event2024SpringInfoAtom",
  default: null,
});

export default event2024SpringInfoAtom;
