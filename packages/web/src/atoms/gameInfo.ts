import { Quest, QuestId } from "@/types/event2025spring";

import { atom } from "recoil";

type CompletedQuest = {
  questId: QuestId;
  completedAt: Date;
};

export type GameInfoType = Nullable<{
  isAgreeOnTermsOfEvent: boolean;
  isBanned: boolean;
  creditAmount: number;
  quests: Quest[];
  completedQuests: CompletedQuest[];
}>;

const gameInfoAtom = atom<GameInfoType>({
  key: "gameInfoAtom",
  default: null,
});

export default gameInfoAtom;
