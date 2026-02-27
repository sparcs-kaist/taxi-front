import { atom } from "recoil";

export type FavoriteRouteType = {
  _id?: string;
  from: {
    _id?: string;
    enName: string;
    koName: string;
  };
  to: {
    _id?: string;
    enName: string;
    koName: string;
  };
};

export type FavoriteRoutesType = {
  data: FavoriteRouteType[];
};

const favoriteRoutesAtom = atom<FavoriteRoutesType>({
  key: "favoriteRoutesAtom",
  default: {
    data: [],
  },
});

export default favoriteRoutesAtom;
