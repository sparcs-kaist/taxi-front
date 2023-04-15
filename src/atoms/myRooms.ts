import { atom } from "recoil";

export type MyRoomsType = Nullable<{
  ongoing: Array<any>; // FIXME: 방의 타입 정의
  done: Array<any>;
}>;

const myRoomsAtom = atom<MyRoomsType>({
  key: "myRoomsAtom",
  default: null,
});

export default myRoomsAtom;
