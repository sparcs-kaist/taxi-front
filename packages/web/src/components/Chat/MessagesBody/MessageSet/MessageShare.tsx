import { useState } from "react";

import { ModalRoomShare } from "@/components/ModalPopup";

import Button from "./Button";

import chatGameOverlayAtom from "@/atoms/chatGameOverlay";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

type MessageShareProps = {
  roomInfo: Room;
  text: string;
  color: CSS["color"];
};

const MessageShare = ({ roomInfo, text, color }: MessageShareProps) => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const setChatGameOverlay = useSetRecoilState(chatGameOverlayAtom);

  const style = { width: "210px", padding: "10px" };
  const styleText = {
    marginBottom: "10px",
    wordBreak: "break-all" as any,
    whiteSpace: "pre-line" as any,
    ...theme.font14,
    color,
  };

  // 게임 선택 섹션 스타일 (구분선 등)
  const styleGameSection = {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: `1px solid ${theme.gray_line}`,
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  };

  const styleGameTitle = {
    ...theme.font14_bold,
    color: theme.purple,
    textAlign: "center" as const,
    marginBottom: "2px",
  };

  const styleGameText = {
    marginBottom: "4px",
    textAlign: "center" as const,
    wordBreak: "break-all" as any,
    whiteSpace: "pre-line" as any,
    ...theme.font14,
    color,
  };

  return (
    <div css={style}>
      <div css={styleText}>{text}</div>
      <Button onClick={() => setIsOpenShare(true)}>공유하기</Button>

      {/* 게임 선택 버튼 영역 */}
      <div css={styleGameSection}>
        <div css={styleGameTitle}>🚖 함께하는 택시 게임</div>
        <div css={styleGameText}>함께 즐기고 넙죽코인을 획득하세요!</div>
        <Button onClick={() => setChatGameOverlay("wordChain")}>
          끝말잇기
        </Button>
        <Button onClick={() => setChatGameOverlay("racing")}>경마</Button>
      </div>

      <ModalRoomShare
        isOpen={isOpenShare}
        onChangeIsOpen={setIsOpenShare}
        roomInfo={roomInfo}
      />
    </div>
  );
};

export default MessageShare;
