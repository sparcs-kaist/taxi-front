import { atom } from "recoil";

export type ChatGameType = "wordChain" | "racing" | null;

const chatGameOverlayAtom = atom<ChatGameType>({
  key: "chatGameOverlay",
  default: null,
});

export default chatGameOverlayAtom;
