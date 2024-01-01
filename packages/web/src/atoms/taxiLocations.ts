import type { Location } from "@/types/location";

import { atom } from "recoil";

export type TaxiLocationsType = Array<Location>;

const taxiLocationsAtom = atom<TaxiLocationsType>({
  key: "taxiLocationsAtom",
  default: [],
});

export default taxiLocationsAtom;
