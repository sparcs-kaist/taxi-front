import { atom } from "recoil";

export type LoginInfoDetailType = Nullable<{
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
  account: string;
  deviceToken: Nullable<string>;
  deviceType: "web" | "app";
}>;

const loginInfoDetailAtom = atom<LoginInfoDetailType>({
  key: "loginInfoDetailAtom",
  default: null,
});

export default loginInfoDetailAtom;
