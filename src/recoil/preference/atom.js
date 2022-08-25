import { atom } from "recoil";

const preferenceAtom = atom({
  key: "preferenceAtom",
  default: {
    lang: "ko",
  },
});

export default preferenceAtom;
