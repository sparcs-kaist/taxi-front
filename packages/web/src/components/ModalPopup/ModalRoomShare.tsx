import { useEvent2024FallQuestComplete } from "@/hooks/event/useEvent2024FallQuestComplete";

import Modal from "@/components/Modal";

import BodyRoomShare, { BodyRoomShareProps } from "./Body/BodyRoomShare";

import theme from "@/tools/theme";

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
  //#region event2024Fall
  const event2024FallQuestComplete = useEvent2024FallQuestComplete();
  //#endregion
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
  //#region event2024Fall
  const onChangeIsOpenWithEvent2024Fall = (isOpen: boolean) => {
    onChangeIsOpen?.(isOpen);
    !isOpen && event2024FallQuestComplete("roomSharing");
  };
  //#endregion

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpenWithEvent2024Fall}
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
