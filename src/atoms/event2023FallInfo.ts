import { Quest, QuestId } from "types/event2023fall";

import { atom } from "recoil";

export type Event2023FallInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  completedQuests: QuestId[];
  creditAmount: number;
  ticket1Amount: number;
  ticket2Amount: number;
  quests: Quest[];
}>;

const event2023FallInfoAtom = atom<Event2023FallInfoType>({
  key: "event2023FallInfoAtom",
  default: null,
});

export default event2023FallInfoAtom;
