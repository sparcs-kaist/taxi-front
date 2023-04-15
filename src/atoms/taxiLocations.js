import { atom } from "recoil";

const taxiLocationsAtom = atom({
  key: "taxiLocationsAtom",
  default: [],
});

export default taxiLocationsAtom;
