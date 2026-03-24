import { useState } from "react";

import { ModalRoomShare } from "@/components/ModalPopup";

import Button from "./Button";

import theme from "@/tools/theme";

type MessageShareProps = {
  roomInfo: Room;
  text: string;
  color: CSS["color"];
};

const MessageShare = ({ roomInfo, text, color }: MessageShareProps) => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);

  const style = { width: "210px", padding: "10px" };
  const styleText = {
    marginBottom: "10px",
    wordBreak: "break-all" as any,
    whiteSpace: "pre-line" as any,
    ...theme.font14,
    color,
  };

  return (
    <div css={style}>
      <div css={styleText}>{text}</div>
      <Button onClick={() => setIsOpenShare(true)}>공유하기</Button>

      <ModalRoomShare
        isOpen={isOpenShare}
        onChangeIsOpen={setIsOpenShare}
        roomInfo={roomInfo}
      />
    </div>
  );
};

export default MessageShare;
