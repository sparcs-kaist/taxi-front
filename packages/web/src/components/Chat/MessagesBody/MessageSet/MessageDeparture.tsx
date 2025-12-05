import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ModalCallTaxi } from "@/components/ModalPopup";

import Button from "./Button";

import { getEmoji } from "@/tools/emoji";
import { getToday } from "@/tools/moment";
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
  // 2025 fall event 관련 내용입니다. 이벤트 중이라면 뱃지 이벤트 내용을 출력!
  // 현재 날짜와 시간을 가져옵니다.

  const today = getToday();
  const startDate = moment("2025-02-20", "YYYY-MM-DD");
  const endDate = moment("2025-10-29", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate) && today.isAfter(startDate, "day");

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
          <div style={{ fontSize: "24px", lineHeight: "1.2" }}>
            {getEmoji(roomInfo.emojiIdentifier)}
          </div>
          <div css={{ ...theme.font12 }}>탑승 시 방 식별자를 확인해주세요!</div>
        </div>
      )}
      <Button onClick={() => setIsOpenCallTaxi(true)}>택시 호출하기</Button>
      <div style={{ marginTop: "17px" }}></div>
      <div css={styleText}>
        {isEventDay && (
          <span>
            {" "}
            <b>뱃지 이벤트 진행 중!</b> <br></br>
            모든 동승자들이 전화번호 인증 뱃지를 가지고 있다면 정산 완료 시
            응모권 3개를 받을 수 있어요.{" "}
          </span>
        )}
      </div>
      <Link to="/event/2025fall" css={{ textDecoration: "none" }}>
        <Button>이벤트 바로가기</Button>
      </Link>
      <ModalCallTaxi
        roomInfo={roomInfo}
        isOpen={isOpenCallTaxi}
        onChangeIsOpen={setIsOpenCallTaxi}
      />
    </div>
  );
};

export default MessageDeparture;
