import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";
import { AxiosOption } from "hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import myRoomsAtom from "atoms/myRooms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueMyRooms = () => useRecoilValue(myRoomsAtom);
export const useSetMyRooms = () => useSetRecoilState(myRoomsAtom);
export const useFetchMyRooms = () => {
  const setMyrooms = useSetMyRooms();
  const axios = useAxios();
  const { id: userId } = useValueRecoilState("loginInfo") || {};

  return useCallback(
    (onError?: AxiosOption["onError"]) => {
      if (userId) {
        axios({
          url: "/rooms/searchByUser",
          method: "get",
          onSuccess: (data) => setMyrooms(data),
          onError: onError,
        });
      } else {
        setMyrooms({
          ongoing: [],
          done: [],
        });
      }
    },
    [userId, setMyrooms, axios]
  );
};
