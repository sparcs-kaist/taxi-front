import { useState } from "react";

import { ModalCallTaxi } from "@/components/ModalPopup";

import Button from "./Button";

import { getEmoji } from "@/tools/emoji";
import theme from "@/tools/theme";

type MessageDepartureProps = {
  roomInfo: Room;
  minutes: string;
  color: CSS["color"];
};

const MessageDeparture = ({
  roomInfo,
  minutes,
  color,
}: MessageDepartureProps) => {
  const [isOpenCallTaxi, setIsOpenCallTaxi] = useState<boolean>(false);
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
      <div css={styleText}>
        택시 출발 {minutes}분 전 입니다. 동승자들이 모두 모였다면 택시를 호출한
        후 출발하세요.
      </div>
      {roomInfo.emojiIdentifier && (
        <div
          css={{
            marginTop: "10px",
            marginBottom: "10px",
            padding: "12px 10px",
            backgroundColor: theme.gray_background,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div css={{ ...theme.font14_bold }}>방 식별자</div>
          <span
            style={{
              fontSize: "28px",
              lineHeight: "1.2",
              fontFamily: '"TossFace", "NanumSquare"',
            }}
          >
            {getEmoji(roomInfo.emojiIdentifier)}
          </span>
          <div css={{ ...theme.font12 }}>탑승 시 방 식별자를 확인해주세요!</div>
        </div>
      )}
      <Button onClick={() => setIsOpenCallTaxi(true)}>택시 호출하기</Button>
      <ModalCallTaxi
        roomInfo={roomInfo}
        isOpen={isOpenCallTaxi}
        onChangeIsOpen={setIsOpenCallTaxi}
      />
    </div>
  );
};

export default MessageDeparture;
