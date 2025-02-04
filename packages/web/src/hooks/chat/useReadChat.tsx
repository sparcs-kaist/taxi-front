import { useCallback, useEffect } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";

export default (roomId: string) => {
  const axios = useAxios();

  const handleRead = useCallback(async () => {
    try {
      await axios({
        url: "/chats/read",
        method: "post",
        data: { roomId },
      });
      console.log("채팅을 읽음");
    } catch (error) {
      console.error("API 요청 중 오류 발생: ", error);
    }
  }, [axios, roomId]);

  const syncWrapper = () => {
    handleRead().catch((error) => console.error("handleRead 에러:", error));
  };

  useEffect(() => {
    // console.log("=== useEffect 작동 ===");

    // 맨 처음 마운트될 때 읽은 시간 업데이트 하는 함수 호출
    syncWrapper();
    window.addEventListener("focus", syncWrapper);

    return () => {
      window.removeEventListener("focus", syncWrapper);
    };
  }, [roomId]);

  return handleRead;
};
