import { atom } from "recoil";

export type MyRoomType = {
  ongoing: Array<any>; // FIXME: 방의 타입 정의
  done: Array<any>;
};

const myRoomAtom = atom<Nullable<MyRoomType>>({
  key: "myRoomAtom",
  default: null,
});

export default myRoomAtom;
