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

      const { totalCount } = await axios({
        url: "/chats/count",
        method: "get",
        params: { roomId }, // GET 요청이므로 params 사용
      });

      // localStorage에 읽은 메시지 개수 저장
      localStorage.setItem(`lastReadCount_${roomId}`, totalCount.toString());
    } catch (error) {
      console.error('"/chats/read" API 요청 중 오류 발생: ', error);
    }
  }, [axios, roomId]);

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
