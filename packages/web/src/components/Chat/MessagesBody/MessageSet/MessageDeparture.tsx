import { useState } from "react";

import { ModalCallTaxi } from "@/components/ModalPopup";

import Button from "./Button";

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

        {/* 여기에 뱃지이벤트 관련 내용 삽입 */}
      </div>
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
