import axiosOri from "axios";
import { MutableRefObject, useCallback } from "react";

import useReadChat from "@/hooks/chat/useReadChat";
import { useAxios } from "@/hooks/useTaxiAPI";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import regExpTest from "@/tools/regExpTest";

export default (
  roomId: string,
  isSendingMessage: MutableRefObject<boolean>
) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);

  const handleRead = useReadChat(roomId);

  return useCallback(
    async (
      type:
        | "text"
        | "account"
        | "image"
        | "wordChain"
        | "racing"
        | "racingStart",
      { text, file }: { text?: string; file?: File }
    ): Promise<boolean> => {
      // 메시지 전송 중이라면 중복 전송을 막습니다.
      if (isSendingMessage.current) return false;

      try {
        if (
          ["text", "account", "wordChain", "racing", "racingStart"].includes(
            type
          )
        ) {
          // 메시지가 정규식 검사에서 통과하지 못했다면 전송을 막습니다.
          if (!text) throw new Error();
          if (
            ["text", "wordChain"].includes(type) &&
            !regExpTest.chatMsg(text) &&
            !regExpTest.chatMsgLength(text)
          )
            throw new Error();
          if (type === "account" && !regExpTest.account(text))
            throw new Error();

          isSendingMessage.current = true;
          const res = await axios({
            url: "/chats/send",
            method: "post",
            data: { roomId, type, content: text },
          });

          // Some endpoints like `racing` return `{success: ...}`, while others return `{result: ...}` depending on the route wrapper
          if (
            res?.result ||
            res?.success ||
            type === "racing" ||
            type === "racingStart"
          ) {
            // 채팅 읽은 시간 업데이트
            handleRead();
            isSendingMessage.current = false;
            return true;
          }
        }

        if (type === "image") {
          if (!file) throw new Error();

          isSendingMessage.current = true;
          const { url, id } = await axios({
            url: "chats/uploadChatImg/getPUrl",
            method: "post",
            data: { roomId, type: file.type },
          });
          if (!url || !id) throw new Error();

          await axiosOri({
            url,
            method: "put",
            data: file,
            headers: { "Content-Type": file.type },
          });

          const { result } = await axios({
            url: "chats/uploadChatImg/done",
            method: "post",
            data: { id },
          });
          if (result) {
            // 채팅 읽은 시간 업데이트
            handleRead();
            isSendingMessage.current = false;
            return true;
          }
        }
      } catch (e) {
        console.error(e);
      }

      setAlert("메시지 전송에 실패하였습니다.");
      isSendingMessage.current = false;
      return false;
    },
    [roomId, axios, setAlert]
  );
};
