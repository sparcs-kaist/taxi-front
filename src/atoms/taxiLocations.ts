import { atom } from "recoil";

export type TaxiLocationsType = Array<any>;

const taxiLocationsAtom = atom<TaxiLocationsType>({
  key: "taxiLocationsAtom",
  default: [],
});

export default taxiLocationsAtom;
