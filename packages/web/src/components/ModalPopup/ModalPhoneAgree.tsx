import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";

import BadgeImage from "../User/BadgeImage";

import theme from "@/tools/theme";

type ConfirmPhoneModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmPhoneModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmPhoneModalProps) {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
    letterSpacing: "0.5px",
  };

  const styleText = {
    ...theme.font14,
    color: theme.black,
    margin: "10px 10px 10px",
  };

  const styleButton = {
    display: "flex",
    justifyContent: "space-between",
  };

  const styleIcon = {
    fontSize: "22px",
    margin: "0 7px 2px 0",
  };

  return (
    <Modal
      isOpen={isOpen}
      padding="16px 10px 10px"
      onEnter={onConfirm}
      onChangeIsOpen={(open) => {
        if (!open) onCancel();
      }}
    >
      <div css={styleTitle}>
        <div css={styleIcon}>
          <BadgeImage badge_live={true} />
        </div>
        전화번호 사용 동의
      </div>
      <DottedLine direction="row" />
      <div css={styleText}>
        {" "}
        <p css={{ padding: "10px 0" }}>
          전화번호를 등록하시겠습니까?{" "}
          <b css={{ color: theme.black }}>
            전화번호 등록 시, Taxi만의 멋진 배지를 드립니다!{" "}
          </b>
          배지는 사용자 정보 설정에서 비활성화 하실 수 있습니다.
        </p>{" "}
        <p css={{ color: theme.red_text }}>
          전화번호는 스팍스 측에서 향후 서비스 신고 대응 및 본인 확인을 위해
          연락드릴 때 사용될 수 있습니다. 또한, 입력하신 연락처는 이후 수정이
          불가능하니 정확히 작성해주시기 바랍니다.
        </p>
      </div>
      <div css={styleButton}>
        <Button
          type="gray"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={onCancel}
        >
          아니오
        </Button>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={onConfirm}
        >
          네
        </Button>
      </div>
    </Modal>
  );
}
