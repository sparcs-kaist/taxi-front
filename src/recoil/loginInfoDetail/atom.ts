import { atom } from "recoil";

type LoginInfoType = {
  agreeOnTermsOfService: boolean;
  ban: boolean;
  email: string;
  id: string;
  joinat: string;
  name: string;
  nickname: string;
  oid: string;
  profileImgUrl: string;
  subinfo: { kaist: string; sparcs: string; facebook: string; twitter: string };
  withdraw: boolean;
};

const loginInfoDetailAtom = atom<Nullable<LoginInfoType>>({
  key: "loginInfoDetailAtom",
  default: null,
});

export default loginInfoDetailAtom;
