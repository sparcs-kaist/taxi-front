import { useCallback, useEffect } from "react";

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

  const handleRead = useCallback(async () => {
    try {
      await axios({
        url: "/chats/read",
        method: "post",
        data: { roomId },
      });
    } catch (error) {
      console.error('"/chats/read" API 요청 중 오류 발생: ', error);
    }
  }, [axios, roomId]);

  const syncWrapper = () => {
    handleRead().catch((error) => console.error("handleRead 에러:", error));
  };

  // 화면이 활성화 될 때 읽은 시간 업데이트
  useEffect(() => {
    if (!shouldRunEffect) return;

    syncWrapper(); // 맨 처음 컴포넌트가 마운트될 때 읽은 시간 업데이트 하는 함수 호출
    window.addEventListener("focus", syncWrapper);

    return () => {
      window.removeEventListener("focus", syncWrapper);
    };
  }, [roomId]);

  return handleRead;
};
