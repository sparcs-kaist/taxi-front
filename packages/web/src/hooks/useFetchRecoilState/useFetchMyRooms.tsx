import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import myRoomsAtom from "@/atoms/myRooms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueMyRooms = () => useRecoilValue(myRoomsAtom);
export const useSetMyRooms = () => useSetRecoilState(myRoomsAtom);

// 서버에서 이미 계산된 unreadCount를 사용하는 함수
const updateUnreadCount = async (
  rooms: any[],
  axios: any,
  userId?: string
): Promise<any[]> => {
  // 서버에서 이미 unreadCount가 계산되어 제공되므로 별도 계산 불필요
  return rooms.map((room) => ({
    ...room,
    // 서버에서 제공하는 unreadCount 사용, 없다면 0으로 설정
    unreadCount: typeof room.unreadCount === "number" ? room.unreadCount : 0,
  }));
};

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
          onSuccess: async (data) => {
            try {
              // 서버에서 이미 unreadCount가 계산되어 제공되므로 그대로 사용
              const [updatedOngoing, updatedDone] = await Promise.all([
                updateUnreadCount(data.ongoing || [], axios, userId),
                updateUnreadCount(data.done || [], axios, userId),
              ]);

              const updatedData = {
                ongoing: updatedOngoing,
                done: updatedDone,
              };

              setMyrooms(updatedData);
            } catch (error) {
              console.error("Error updating unread counts:", error);
              // 에러 발생 시 원본 데이터 사용
              setMyrooms({
                ongoing: data.ongoing || [],
                done: data.done || [],
              });
            }
          },
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
