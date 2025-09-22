import Modal from "@/components/Modal";

import BodyEvent2025SpringShare, {
  BodyEvent2025SpringShareProps,
} from "./Body/BodyEvent2025SpringShare";

import theme from "@/tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

type ModalEvent2025SpringShareProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  inviteUrl: BodyEvent2025SpringShareProps["inviteUrl"];
};

const ModalEvent2025SpringShare = ({
  isOpen,
  onChangeIsOpen,
  inviteUrl,
}: ModalEvent2025SpringShareProps) => {
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
      <BodyEvent2025SpringShare inviteUrl={inviteUrl} />
    </Modal>
  );
};

export default ModalEvent2025SpringShare;
export { BodyEvent2025SpringShare };
