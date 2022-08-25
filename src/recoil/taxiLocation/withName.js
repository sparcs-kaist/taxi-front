import { selector } from "recoil";
import taxiLocationAtom from "./atom";
import preferenceAtom from "recoil/preference";

const taxiLocataionWithName = selector({
  key: "locationWithName",
  get: ({ get }) =>
    get(taxiLocationAtom).reduce((acc, place) => {
      acc.push({
        ...place,
        name: get(preferenceAtom).lang === "ko" ? place.koName : place.enName,
      });
      return acc;
    }, []),
});

export default taxiLocataionWithName;
