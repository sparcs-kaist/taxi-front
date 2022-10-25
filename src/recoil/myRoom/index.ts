import myRoomAtom from "./atom";

export type MyRoomType = {
  ongoing: Array<any>; // FIXME: 방의 타입 정의
  done: Array<any>;
};

export default myRoomAtom;
