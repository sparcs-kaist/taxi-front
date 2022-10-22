import { atom } from "recoil";

const ongoingRoomAtom = atom({
  key: "ongoingRoomAtom",
  default: null,
});

export default ongoingRoomAtom;
