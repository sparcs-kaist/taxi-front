import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";

import BadgeImage from "../User/BadgeImage";

import theme from "@/tools/theme";

const STORAGE_KEY = "modalNoticeBadgeShown";

type ModalNoticeBadgeProps = Omit<
  Parameters<typeof Modal>[0],
  "isOpen" | "onChangeIsOpen"
> & {
  // 외부에서 상태 제어할 필요가 없으니 isOpen/onChangeIsOpen은 내부에서 처리
};

export default function ModalNoticeBadge({}: ModalNoticeBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasShown = localStorage.getItem(STORAGE_KEY);
    if (!hasShown) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };
  const mypagego = () => {
    history.push("/mypage");
    handleClose();
  };

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "22px",
    margin: "0 4px 0 0",
  };
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "10px 10px 10px",
  };

  const styleButton = {
    flex: 1,
    margin: "0 4px",
    padding: "10px 0",
    borderRadius: "8px",
    ...theme.font14_bold,
  } as const;

  return (
    <Modal
      padding="30px 10px 14px"
      isOpen={isOpen}
      onChangeIsOpen={(open) => {
        if (!open) handleClose();
      }}
    >
      <div css={styleTitle}>
        <div css={styleIcon}>
          <BadgeImage badge_live={true} />
        </div>
        Taxi에 배지 기능이 추가되었습니다.
      </div>
      <DottedLine direction="row" margin="4px 2px" />
      <div css={styleText}>
        • Taxi에 배지 기능이 추가되었습니다!{" "}
        <b css={{ color: theme.black }}>
          내정보 - 수정하기에서 전화번호 입력 시{" "}
        </b>
        배지를 이름 옆에 켜실 수 있습니다.
      </div>
      <div css={styleText}>
        • Taxi에 전화번호를 입력하고 배지를 받으시면,{" "}
        <b css={{ color: theme.black }}>
          나중에 Taxi 서비스 이용 중 문제가 생겼을 때 Taxi 팀에서 더욱 빠르게
          처리해드릴 수 있습니다!{" "}
        </b>
      </div>
      <Button type="purple_inset" onClick={mypagego} css={styleButton}>
        마이페이지로 이동하기
      </Button>
    </Modal>
  );
}
