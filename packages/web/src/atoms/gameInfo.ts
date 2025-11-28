import { Quest, QuestId } from "@/types/event2025spring";

import { atom } from "recoil";

type CompletedQuest = {
  questId: QuestId;
  completedAt: Date;
};

// prettier-ignore
export type GameInfoType = Nullable<{
  level: number;
  creditAmount: number;
  quests: Quest[];
  completedQuests: CompletedQuest[];
}>;

const gameInfoAtom = atom<GameInfoType>({
  key: "gameInfoAtom",
  default: null,
});

export default gameInfoAtom;
