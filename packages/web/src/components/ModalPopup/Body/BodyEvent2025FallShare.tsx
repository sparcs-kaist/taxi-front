import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";

import ButtonShare from "@/components/Button/ButtonShare";
import DottedLine from "@/components/DottedLine";
import LinkCopy from "@/components/Link/LinkCopy";
import LinkKakaotalkShare from "@/components/Link/LinkKakaotalkShare";

import { ogServer } from "@/tools/loadenv";
import theme from "@/tools/theme";

import { ReactComponent as KakaoTalkLogo } from "@/static/assets/serviceLogos/KakaoTalkLogo.svg";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export type BodyEvent2025FallShareProps = {
  inviteUrl: string;
  height?: number;
};

const BodyEvent2025FallShare = ({
  height,
  inviteUrl,
}: BodyEvent2025FallShareProps) => {
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
      <div css={styleGuide}>
        이벤트를 다른 사람들에게 공유할 수 있습니다. 이 링크를 통해 다른
        사용자가 이벤트에 참여하고 전화번호를 인증하면, 회원님과 새 참여자 모두{" "}
        <b>응모권 3개</b>를 획득합니다.
      </div>
      <DottedLine />
      <div css={{ flexGrow: 1 }} />
      <div css={styleQRSection}>
        <QRCode value={inviteUrl} size={120} bgColor="none" />
      </div>
      <div css={{ flexGrow: 1 }} />
      <div css={styleButtonSection}>
        <LinkKakaotalkShare
          title={"Taxi 새학기 이벤트"}
          description={`Taxi 새학기 이벤트에 참여해 보세요! 이 링크로 참여하면 응모권 3개를 획득할 수 있어요!`}
          imageUrl={
            ogServer
              ? `${ogServer}/eventInvite/${inviteUrl.split("/").pop()}`
              : undefined
          }
          buttonText="확인하기"
          buttonTo={new URL(inviteUrl).pathname}
          partNum={1}
        >
          <ButtonShare
            text="카카오톡"
            icon={<KakaoTalkLogo css={{ width: "22px" }} />}
            background="#FFE812"
          />
        </LinkKakaotalkShare>
        <LinkCopy
          value={`🚕 Taxi 새학기 이벤트에 참여해 보세요!\n🚕 참여 링크: ${inviteUrl}`}
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

export default BodyEvent2025FallShare;
