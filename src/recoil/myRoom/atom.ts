import { atom, RecoilState } from "recoil";
import { MyRoomType } from "./index";

const myRoomAtom = atom<Nullable<MyRoomType>>({
  key: "myRoomAtom",
  default: null,
});

export default myRoomAtom;
