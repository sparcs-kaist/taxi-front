import Modal from "@/components/Modal";

import BodyEvent2025FallShare, {
  BodyEvent2025FallShareProps,
} from "./Body/BodyEvent2025FallShare";

import theme from "@/tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

type ModalEvent2025FallShareProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  inviteUrl: BodyEvent2025FallShareProps["inviteUrl"];
};

const ModalEvent2025FallShare = ({
  isOpen,
  onChangeIsOpen,
  inviteUrl,
}: ModalEvent2025FallShareProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      padding="16px 12px 12px"
    >
      <div css={styleTitle}>
        <ShareRoundedIcon style={styleIcon} />
        이벤트 공유하기
      </div>
      <BodyEvent2025FallShare inviteUrl={inviteUrl} />
    </Modal>
  );
};

export default ModalEvent2025FallShare;
export { BodyEvent2025FallShare };
