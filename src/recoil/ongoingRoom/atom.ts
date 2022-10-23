import { atom, RecoilState } from "recoil";

const ongoingRoomAtom = atom<Array<any>>({
  key: "ongoingRoomAtom",
  default: [],
});

export default ongoingRoomAtom;
