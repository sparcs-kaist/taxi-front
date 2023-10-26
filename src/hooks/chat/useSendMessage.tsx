import alertAtom from "@/atoms/alert";
import { useAxios } from "@/hooks/useTaxiAPI";
import regExpTest from "@/tools/regExpTest";
import axiosOri from "axios";
import { MutableRefObject, useCallback } from "react";

import { useSetRecoilState } from "recoil";

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
          if (!file) throw new Error();

          isSendingMessage.current = true;
          const { url, fields, id } = await axios({
            url: "chats/uploadChatImg/getPUrl",
            method: "post",
            data: { roomId, type: file.type },
          });
          if (!url || !fields || !id) throw new Error();

          const formData = new FormData();
          for (const key in fields) formData.append(key, fields[key]);
          formData.append("file", file);
          const { status: s3Status } = await axiosOri.post(url, formData);
          if (s3Status !== 204) throw new Error();

          const { result } = await axios({
            url: "chats/uploadChatImg/done",
            method: "post",
            data: { id },
          });
          if (result) return true;
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
