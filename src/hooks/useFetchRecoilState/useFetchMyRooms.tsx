import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import myRoomsAtom from "atoms/myRooms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueMyRooms = () => useRecoilValue(myRoomsAtom);
export const useSetMyRooms = () => useSetRecoilState(myRoomsAtom);
export const useFetchMyRooms = (onError?: AxiosOption["onError"]) => {
  const setMyrooms = useSetMyRooms();
  const axios = useAxios();
  const { id: userId } = useValueRecoilState("loginInfo") || {};

  return useCallback(() => {
    if (userId) {
      axios({
        url: "/rooms/searchByUser",
        method: "get",
        onSuccess: (data) => setMyrooms(data),
        onError: onError,
      });
    } else setMyrooms(null);
  }, [userId, setMyrooms, axios]);
};
