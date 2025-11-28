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
  preventFail: number;
  preventBurst: number;
}>;

const gameInfoAtom = atom<GameInfoType>({
  key: "gameInfoAtom",
  default: null,
});

export default gameInfoAtom;
