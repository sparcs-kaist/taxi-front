import { RefObject, memo, useState } from "react";

import type { Chats, LayoutType } from "@/types/chat";

import useAccountFromChats from "@/hooks/chat/useAccountFromChats";
import useSendMessage from "@/hooks/chat/useSendMessage";
import useSettlementFromChats from "@/hooks/chat/useSettlementFromChats";

import InputText from "./InputText";
import NewMessage from "./NewMessage";
import ReplyPreview from "./ReplyPreview";
import ToolSheet from "./ToolSheet";
import ToolSheetOpenButton from "./ToolSheetOpenButton";
import "./index.css";

import isVirtualKeyboardDetectedAtom from "@/atoms/isVirtualKeyboardDetected";
import { useRecoilValue } from "recoil";

import { scrollToBottom } from "@/tools/chat/scroll";
import theme from "@/tools/theme";

type ReplyTarget = {
  chatId: string;
  authorName: string;
  content: string;
} | null;

type MessageFormProps = {
  layoutType: LayoutType;
  roomInfo: Nullable<Room>;
  chats: Chats;
  isDisplayNewMessage: boolean;
  isOpenToolSheet: boolean;
  onChangeIsOpenToolSheet: (x: boolean) => void;
  messageBodyRef: RefObject<HTMLDivElement>;
  sendMessage: ReturnType<typeof useSendMessage>;
  replyTarget?: ReplyTarget;
  onClearReplyTarget?: () => void;
};

const MessageForm = ({
  layoutType,
  roomInfo,
  chats,
  isDisplayNewMessage,
  isOpenToolSheet,
  onChangeIsOpenToolSheet,
  messageBodyRef,
  sendMessage,
  replyTarget,
  onClearReplyTarget,
}: MessageFormProps) => {
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);
  const [uploadedImage, setUploadedImage] = useState<Nullable<File>>(null); // 업로드된 이미지 파일
  const account = useAccountFromChats(chats);
  const settlement = useSettlementFromChats(chats);

  const onClickNewMessage = () => {
    if (!messageBodyRef.current) return;
    scrollToBottom(messageBodyRef.current, true);
  };

  const styleHead = {
    position: "relative" as any,
    zIndex: theme.zIndex_nav - 1,
  };
  const styleBody = {
    position: "relative" as any,
    zIndex: theme.zIndex_nav,
    padding: `8px 12px calc(8px + ${
      layoutType === "sidechat" || isVKDetected
        ? "0px"
        : "env(safe-area-inset-bottom)"
    })`,
    display: "flex",
    flexDirection: "column" as any,
    gap: "8px",
    boxShadow: theme.shadow_clicked,
    background: theme.white,
  };
  const styleInputRow = {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
  };

  return (
    <>
      <div css={styleHead}>
        <NewMessage
          isDisplay={isDisplayNewMessage}
          onClick={onClickNewMessage}
        />
        <ToolSheet
          roomInfo={roomInfo}
          isOpen={isOpenToolSheet}
          onChangeIsOpen={onChangeIsOpenToolSheet}
          onChangeUploadedImage={setUploadedImage}
          account={account}
          settlement={settlement}
          sendMessage={sendMessage}
        />
      </div>
      <div css={styleBody}>
        {replyTarget && onClearReplyTarget && (
          <ReplyPreview
            authorName={replyTarget.authorName}
            content={replyTarget.content}
            onCancel={onClearReplyTarget}
          />
        )}
        <div css={styleInputRow}>
          <ToolSheetOpenButton
            isOpen={isOpenToolSheet}
            onChangeIsOpen={onChangeIsOpenToolSheet}
          />
          <div
            css={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              minWidth: 0,
            }}
          >
            <InputText
              uploadedImage={uploadedImage}
              onChangeUploadedImage={setUploadedImage}
              sendMessage={sendMessage}
              replyTarget={replyTarget}
              onClearReplyTarget={onClearReplyTarget}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MessageForm);
