import { MutableRefObject, useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import convertImg from "tools/convertImg";
import regExpTest from "tools/regExpTest";

export default (
  roomId: string,
  isSendingMessage: MutableRefObject<boolean>
) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  return useCallback(
    async (
      type: "text" | "account" | "image",
      { text, file }: { text?: string; file?: File }
    ): Promise<boolean> => {
      // 메시지 전송 중이라면 중복 전송을 막습니다.
      if (isSendingMessage.current) return false;

      try {
        if (["text", "account"].includes(type)) {
          // 메시지가 정규식 검사에서 통과하지 못했다면 전송을 막습니다.
          if (!text) throw new Error();
          if (type === "text" && !regExpTest.chatMsg(text)) throw new Error();
          if (type === "account" && !regExpTest.account(text))
            throw new Error();

          isSendingMessage.current = true;
          const { result } = await axios({
            url: "/chats/send",
            method: "post",
            data: { roomId, type, content: text },
          });
          if (result) return true;
        }

        if (type === "image") {
          isSendingMessage.current = true;
          const image = await convertImg(file);
          if (!image) throw new Error();

          // TODO : 이미지 전송
          //   axios({
          //     url: "chats/uploadChatImg/getPUrl",
          //     method: "post",
          //     data: { roomId, type: image.type },
          //     onSuccess: ({ url, fields, id }) => {

          //     },
          //   });
          return true;
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
