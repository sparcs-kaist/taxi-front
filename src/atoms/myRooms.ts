import { atom } from "recoil";

export type MyRoomsType = {
  ongoing: Array<any>; // FIXME: 방의 타입 정의
  done: Array<any>;
};

const myRoomsAtom = atom<MyRoomsType>({
  key: "myRoomsAtom",
  default: {
    ongoing: [],
    done: [],
  },
});

export default myRoomsAtom;
