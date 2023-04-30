import Modal from "components/Modal";

import BodyRoomShare, { BodyRoomShareProps } from "./Body/BodyRoomShare";

import theme from "tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

type ModalRoomShareProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  roomInfo: BodyRoomShareProps["roomInfo"];
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
        <ShareRoundedIcon style={styleIcon} />방 공유하기
      </div>
      <BodyRoomShare roomInfo={roomInfo} />
    </Modal>
  );
};

export default ModalRoomShare;
export { BodyRoomShare };
