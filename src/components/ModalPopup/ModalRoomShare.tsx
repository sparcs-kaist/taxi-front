import { useCallback, useEffect, useState } from "react";

import DottedLine from "components/DottedLine";
import LinkKakaotalkShare from "components/Link/LinkKakaotalkShare";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

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
type ModalRoomShareProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  roomId: string;
};

const ButtonShare = ({ text, icon, background, onClick }: ButtonShareProps) => {
  return (
    <div
      css={{
        width: "40px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        css={{
          width: "40px",
          height: "40px",
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

const ModalRoomShare = ({
  isOpen,
  onChangeIsOpen,
  roomId,
}: ModalRoomShareProps) => {
  const { host } = window.location;
  const pathForShare = `/invite/${roomId}`;

  const setAlert = useSetRecoilState(alertAtom);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = useCallback(() => {
    if (!navigator.clipboard) {
      setAlert("복사를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.clipboard.writeText(host + pathForShare);
    setIsCopied(true);
  }, [pathForShare]);

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
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "12px 8px",
  };
  const styleBody = {
    display: "flex",
    gap: "8px",
    margin: "12px 8px 0",
  };

  return (
    <Modal isOpen={isOpen} onChangeIsOpen={onChangeIsOpen} padding="16px 12px">
      <div css={styleTitle}>
        <ShareIcon style={styleIcon} />방 공유하기
      </div>
      <div css={styleGuide}>방을 여러 사람들에게 공유할 수 있습니다.</div>
      <DottedLine />
      <div css={styleBody}>
        <LinkKakaotalkShare>
          <ButtonShare
            text="카카오톡"
            icon={<KakaoTalkLogo css={{ width: "22px" }} />}
            background="#FFE812"
          />
        </LinkKakaotalkShare>
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
          onClick={handleCopy}
        />
      </div>
    </Modal>
  );
};

export default ModalRoomShare;
