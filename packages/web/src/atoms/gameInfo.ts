import { atom } from "recoil";

// prettier-ignore
export type GameInfoType = Nullable<{
  level: number;
  creditAmount: number;
  preventFail: number;
  preventBurst: number;
  bestRecord: number;
  usedCredit: number;
}>;

const gameInfoAtom = atom<GameInfoType>({
  key: "gameInfoAtom",
  default: null,
});

export default gameInfoAtom;
