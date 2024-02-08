import { atom } from "recoil";

export type LoginInfoType = Nullable<{
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
  phoneNumber?: string;
  account: string;
  // deviceType: "web" | "app"; // #580 - loadenv의 deviceType을 사용하여야 합니다.
  deviceToken: Nullable<string>;
  accessToken: Nullable<string>;
  refreshToken: Nullable<string>;
}>;

const loginInfoAtom = atom<LoginInfoType>({
  key: "loginInfoAtom",
  default: null,
});

export default loginInfoAtom;
