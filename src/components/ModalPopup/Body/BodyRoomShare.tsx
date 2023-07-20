import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";

import DottedLine from "components/DottedLine";
import LinkCopy from "components/Link/LinkCopy";
import LinkKakaotalkShare from "components/Link/LinkKakaotalkShare";

import { date2str } from "tools/moment";
import theme from "tools/theme";
import { getLocationName } from "tools/trans";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ogServer } from "loadenv";
import { ReactComponent as KakaoTalkLogo } from "static/assets/KakaoTalkLogo.svg";

type ButtonShareProps = {
  text: string;
  icon: React.ReactNode;
  background: string;
  onClick?: () => void;
};
export type BodyRoomShareProps = {
  roomInfo: any; // fixme
  height?: number;
};

const ButtonShare = ({ text, icon, background, onClick }: ButtonShareProps) => (
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

const BodyRoomShare = ({ roomInfo, height }: BodyRoomShareProps) => {
  const { i18n } = useTranslation();
  const { origin: host } = window.location;
  const pathForShare = `/invite/${roomInfo?._id}`;

  const [isCopied, setIsCopied] = useState(false);
  const onCopy = useCallback(() => setIsCopied(true), [setIsCopied]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const styleWrapper = height
    ? {
        height,
        display: "flex",
        flexDirection: "column" as any,
      }
    : {};
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };
  const styleQRSection = {
    marginTop: "12px",
    position: "relative" as any,
    overflow: "hidden",
    textAlign: "center" as any,
  };
  const styleButtonSection = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "12px 0px 0",
  };

  return (
    <div css={styleWrapper}>
      <div css={styleGuide}>방을 여러 사람들에게 공유할 수 있습니다.</div>
      <DottedLine />
      <div css={{ flexGrow: 1 }} />
      <div css={styleQRSection}>
        <QRCode value={host + pathForShare} size={120} bgColor="none" />
      </div>
      <div css={{ flexGrow: 1 }} />
      <div css={styleButtonSection}>
        <LinkKakaotalkShare
          title={roomInfo.name}
          description={`${getLocationName(
            roomInfo.from,
            i18n.language
          )} → ${getLocationName(roomInfo.to, i18n.language)}, ${date2str(
            roomInfo.time
          )}`}
          imageUrl={ogServer ? `ogServer/${roomInfo._id}.png` : undefined}
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
        <LinkCopy
          value={`🚕 ${date2str(
            roomInfo.time,
            "LLLL",
            false
          )} ${getLocationName(
            roomInfo.from,
            i18n.language
          )} → ${getLocationName(
            roomInfo.to,
            i18n.language
          )} 택시팟 구합니다!\n🚕 참여 링크: ${host + pathForShare}`}
          onCopy={onCopy}
        >
          <ButtonShare
            text="초대 복사"
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
    </div>
  );
};

export default BodyRoomShare;
