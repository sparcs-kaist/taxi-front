import { useEvent2024SpringQuestComplete } from "@/hooks/event/useEvent2024SpringQuestComplete";

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
  //#region event2024Spring
  const event2024SpringQuestComplete = useEvent2024SpringQuestComplete();
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
  //#region event2024Spring
  const onChangeIsOpenWithEvent2023Fall = (isOpen: boolean) => {
    onChangeIsOpen?.(isOpen);
    !isOpen && event2024SpringQuestComplete("roomSharing");
  };
  //#endregion

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpenWithEvent2023Fall}
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
