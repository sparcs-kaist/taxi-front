import { useCallback, useEffect } from "react";

import { useSetMyRooms } from "@/hooks/useFetchRecoilState/useFetchMyRooms";
import { useAxios } from "@/hooks/useTaxiAPI";

/**
 * 채팅 읽음 상태를 관리하는 Hook
 *
 * @param {string} roomId - 채팅방의 ID
 * @param {boolean} [shouldRunEffect=false] - 화면이 활성화될 때 읽은 시간을 업데이트할지 여부
 * @returns {Function} - 채팅 읽기 요청을 실행하는 함수
 */
export default (roomId: string, shouldRunEffect = false) => {
  const axios = useAxios();
  const setMyRooms = useSetMyRooms();

  const handleRead = useCallback(async () => {
    try {
      await axios({
        url: "/chats/read",
        method: "post",
        data: { roomId },
      });

      // 최신 chatNum을 API로 가져오기 (타이밍 문제 방지)
      const { totalCount } = await axios({
        url: "/chats/count",
        method: "get",
        params: { roomId },
      });

      setMyRooms((prevMyRooms) => {
        if (!prevMyRooms) return prevMyRooms;

        // API에서 가져온 최신 totalCount 사용
        localStorage.setItem(`lastReadCount_${roomId}`, totalCount.toString());

        const updateRoomUnreadCount = (rooms: any[]) =>
          rooms.map((room) => {
            if (room._id === roomId) {
              return {
                ...room,
                unreadCount: 0, // 읽었으므로 unreadCount를 0으로 설정
                chatNum: totalCount, // 최신 chatNum도 업데이트
              };
            }
            return room;
          });

        return {
          ongoing: updateRoomUnreadCount(prevMyRooms.ongoing),
          done: updateRoomUnreadCount(prevMyRooms.done),
        };
      });
    } catch (error) {
      console.error('"/chats/read" API 요청 중 오류 발생: ', error);
    }
  }, [axios, roomId, setMyRooms]);

  // 화면이 활성화 될 때 읽은 시간 업데이트
  useEffect(() => {
    if (!shouldRunEffect) return;

    // ✅ 즉시 실행 (첫 마운트 시)
    handleRead();

    // ✅ 윈도우 포커스 이벤트 리스너 추가
    const onFocus = () => handleRead();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [roomId, shouldRunEffect, handleRead]);

  return handleRead;
};
