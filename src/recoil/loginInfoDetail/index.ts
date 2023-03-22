import loginInfoDetailAtom from "./atom";

export type LoginInfoDetailType = {
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
};

export default loginInfoDetailAtom;
