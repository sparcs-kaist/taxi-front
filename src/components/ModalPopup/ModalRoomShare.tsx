import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";

import DottedLine from "components/DottedLine";
import LinkCopy from "components/Link/LinkCopy";
import LinkKakaotalkShare from "components/Link/LinkKakaotalkShare";
import Modal from "components/Modal";

import { date2str } from "tools/moment";
import theme from "tools/theme";
import { getLocationName } from "tools/trans";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { ReactComponent as KakaoTalkLogo } from "static/assets/KakaoTalkLogo.svg";

type ButtonShareProps = {
  text: string;
  icon: React.ReactNode;
  background: string;
  onClick?: () => void;
};
type BodyRoomShareProps = {
  roomInfo: any; // fixme
};
type ModalRoomShareProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  roomInfo: BodyRoomShareProps["roomInfo"];
};

const ButtonShare = ({ text, icon, background, onClick }: ButtonShareProps) => {
  return (
    <div
      css={{
        width: "45px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        css={{
          width: "45px",
          height: "45px",
          borderRadius: "6px",
          backgroundColor: background,
          boxShadow: theme.shadow_gray_button_inset,
          color: theme.gray_text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div
        css={{
          ...theme.font10,
          color: theme.gray_text,
          textAlign: "center",
          paddingTop: "4px",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const BodyRoomShare = ({ roomInfo }: BodyRoomShareProps) => {
  const { i18n } = useTranslation();
  const { host } = window.location;
  const pathForShare = `/invite/${roomInfo?._id}`;

  const [isCopied, setIsCopied] = useState(false);
  const onCopy = useCallback(() => setIsCopied(true), [setIsCopied]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "12px 8px",
  };
  const styleQRSection = {
    marginTop: "12px",
    position: "relative" as any,
    overflow: "hidden",
    textAlign: "center" as any,
  };
  const styleButtonSection = {
    display: "flex",
    // justifyContent: "center",
    gap: "10px",
    margin: "12px 0px 0",
  };

  return (
    <>
      <div css={styleGuide}>방을 여러 사람들에게 공유할 수 있습니다.</div>
      <DottedLine />
      <div css={styleQRSection}>
        <QRCode value={host + pathForShare} size={120} bgColor="none" />
      </div>
      <div css={styleButtonSection}>
        <LinkKakaotalkShare
          title={roomInfo.name}
          description={`${getLocationName(
            roomInfo.from,
            i18n.language
          )} → ${getLocationName(roomInfo.to, i18n.language)}, ${date2str(
            roomInfo.time
          )}`}
          buttonText="확인하기"
          buttonTo={pathForShare}
          partNum={roomInfo.part.length}
        >
          <ButtonShare
            text="카카오톡"
            icon={<KakaoTalkLogo css={{ width: "22px" }} />}
            background="#FFE812"
          />
        </LinkKakaotalkShare>
        <LinkCopy value={host + pathForShare} onCopy={onCopy}>
          <ButtonShare
            text="링크복사"
            icon={
              isCopied ? (
                <CheckIcon style={{ fontSize: "16px" }} />
              ) : (
                <ContentCopyIcon style={{ fontSize: "16px" }} />
              )
            }
            background={theme.gray_background}
          />
        </LinkCopy>
      </div>
    </>
  );
};

const ModalRoomShare = ({
  isOpen,
  onChangeIsOpen,
  roomInfo,
}: ModalRoomShareProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };

  return (
    <Modal
      width={theme.modal_width}
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      padding="16px 12px 12px"
    >
      <div css={styleTitle}>
        <ShareIcon style={styleIcon} />방 공유하기
      </div>
      <BodyRoomShare roomInfo={roomInfo} />
    </Modal>
  );
};

export default ModalRoomShare;
export { BodyRoomShare };
