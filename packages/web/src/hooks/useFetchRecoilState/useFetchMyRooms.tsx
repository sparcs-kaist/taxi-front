import { useCallback } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";
import { AxiosOption } from "@/hooks/useTaxiAPI/useAxios";

import { useValueRecoilState } from ".";

import myRoomsAtom from "@/atoms/myRooms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useValueMyRooms = () => useRecoilValue(myRoomsAtom);
export const useSetMyRooms = () => useSetRecoilState(myRoomsAtom);

// unreadCount 업데이트 로직을 위한 유틸리티 함수
const updateUnreadCount = async (rooms: Room[], axios: any) => {
  const updatedRooms = await Promise.all(
    rooms.map(async (room) => {
      try {
        // /chats/count API로 현재 총 메시지 개수 가져오기
        const { totalCount } = await axios({
          url: "/chats/count",
          method: "get",
          params: { roomId: room._id }, // roomId로 수정
        });

        const updatedUnreadCount = calculateUnreadCount(room, totalCount);
        console.log(
          `Updated unreadCount for room ${room._id}:`,
          updatedUnreadCount
        );
        return {
          ...room,
          unreadCount: updatedUnreadCount,
          chatNum: totalCount,
        };
      } catch (error) {
        console.error(
          `Error updating unread count for room ${room._id}:`,
          error
        );
        // 에러 발생 시 기존 unreadCount 사용
        return {
          ...room,
          unreadCount: 0,
          chatNum: 0,
        };
      }
    })
  );

  return updatedRooms;
};

// unreadCount 계산 함수 - totalCount 기반
const calculateUnreadCount = (room: any, totalCount?: number) => {
  try {
    // 1. API에서 제공하는 unreadCount가 있으면 우선 사용
    if (typeof room.unreadCount === "number") {
      return room.unreadCount;
    }

    // 2. localStorage에서 해당 방의 마지막 읽은 메시지 개수 확인
    const lastReadCountKey = `lastReadCount_${room._id}`;
    const lastReadCountStr = localStorage.getItem(lastReadCountKey);

    if (!lastReadCountStr) {
      // 마지막 읽은 개수가 없으면 totalCount을 unread로 간주
      return totalCount || 0;
    }

    const lastReadCount = parseInt(lastReadCountStr, 10);
    const currentChatNum = totalCount || room.chatNum || 0;

    // 3. 현재 채팅 개수와 마지막으로 읽은 개수의 차이가 unread 개수
    const unreadCount = currentChatNum - lastReadCount;

    return Math.max(0, unreadCount); // 음수가 되지 않도록 보정
  } catch (error) {
    console.error("calculateUnreadCount error:", error);
    // 에러 발생 시 기본값 반환
    return totalCount || 0;
  }
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
              // API 응답 데이터에서 unreadCount 업데이트
              const [updatedOngoing, updatedDone] = await Promise.all([
                updateUnreadCount(data.ongoing || [], axios),
                updateUnreadCount(data.done || [], axios),
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
