import Modal from "@/components/Modal";

import BodyEvent2024FallShare, {
  BodyEvent2024FallShareProps,
} from "./Body/BodyEvent2024FallShare";

import theme from "@/tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

type ModalEvent2024FallShareProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  inviteUrl: BodyEvent2024FallShareProps["inviteUrl"];
};

const ModalEvent2024FallShare = ({
  isOpen,
  onChangeIsOpen,
  inviteUrl,
}: ModalEvent2024FallShareProps) => {
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
      <BodyEvent2024FallShare inviteUrl={inviteUrl} />
    </Modal>
  );
};

export default ModalEvent2024FallShare;
export { BodyEvent2024FallShare };
